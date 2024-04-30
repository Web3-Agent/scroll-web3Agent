'use client'

import Image from 'next/image'
import { type Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { IconGitHub, IconMessage, IconUser } from './ui/icons'

export interface UserMenuProps {
  user: Session['user']
}


export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="">
            <IconUser></IconUser>
            <span className="ml-2">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="start"
          className="w-[180px] mr-4"
        >
          <DropdownMenuItem className="flex-col items-start">

            <div style={{ display: "flex", flexDirection: "row" }} className="text-xs cursor-pointer text-emerald-700">
              {user?.email}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
            className="text-xs cursor-pointer font-medium hover:text-secondary"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
