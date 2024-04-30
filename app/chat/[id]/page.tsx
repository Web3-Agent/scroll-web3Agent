import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
// import { auth } from '@/auth'
import { getChat } from '@/app/actions'
import { Chat } from '@/app/_components/chat'
// import { options } from '@/app/api/auth/[...nextauth]/options'
// import { getServerSession } from 'next-auth'

// export const runtime = 'edge'
export const preferredRegion = 'home'

export interface ChatPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({
    params
}: ChatPageProps): Promise<Metadata> {
    // const session = await auth()
    const session: any = {} //await getServerSession(options)
    if (!session?.user) {
        return {}
    }

    const chat = await getChat(params.id, session.user.email)
    return {
        title: chat?.title.toString().slice(0, 50) ?? 'Chat'
    }
}

export default async function ChatPage({ params }: ChatPageProps) {
    const session: any = {} // await getServerSession(options)

    if (!session?.user) {
        redirect(`/sign-in?next=/chat/${params.id}`)
    }

    const chat = await getChat(params.id, session.user.email)

    if (!chat) {
        notFound()
    }

    if (chat?.userId !== session?.user?.email) {
        notFound()
    }

    return <Chat id={chat.id} initialMessages={chat.messages} />
}
