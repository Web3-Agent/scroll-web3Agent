'use client'

import * as React from 'react'

import { Button } from '@/app/_components/ui/button'
import { IconSidebar, IconArrowElbow, MenuIcon } from './ui/icons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/app/_components/ui/sheet'
import Link from 'next/link'

export interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          style={{ cursor: 'pointer' }}
          width={'20px'}
          src="https://i.imgur.com/9wk3mGf.png"
        ></img>
      </SheetTrigger>
      <Link href="/">
        <img
          width={'120px'}
          style={{ cursor: 'pointer' }}
          src="https://i.imgur.com/VfXLfud.png"
        />
      </Link>
      <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-sm">Chat History</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
