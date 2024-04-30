'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

// import { auth } from '@/auth'
// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
import { type Chat } from '@/app/lib/types'

// Store a new user's details
export async function storeUser(user: { id: string } & Record<string, any>) {
  // Assuming user has an 'id' field
  const userKey = `user:details:${user.email}`;

  // Save user details
  await kv.hmset(userKey, user);

  // Add user's ID to the list of all users
  await kv.sadd('users:list', user.email);

}
//NOTE: USER ID will be email
export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session: any = {}//await getServerSession(options)

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  // const uid = await kv.hget<string>(`chat:${id}`, 'userId')
  const uid = await kv.hget<string>(`chat:${id}`, 'userId')
  if (uid !== session?.user?.email) {
    return {
      error: 'Unauthorized'
    }
  }

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${session.user.email}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session: any = {} //await getServerSession(options)

  if (!session?.user?.email) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await kv.zrange(`user:chat:${session.user.email}`, 0, -1)
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.email}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(chat: Chat) {
  const session: any = {}// await getServerSession(options)

  if (!session?.user?.email || session.user.email !== chat.userId) {
    return {
      error: 'Unauthorized'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}
