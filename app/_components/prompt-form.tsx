import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'

import { BsBookmarkStarFill } from 'react-icons/bs'

import { useEnterSubmit } from '@/app/lib/hooks/use-enter-submit'
import { cn } from '@/app/lib/utils'
import { Button, buttonVariants } from '@/app/_components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/app/_components/ui/tooltip'
import { IconArrowElbow, IconPlus, IconBookmark } from '@/app/_components/ui/icons'
import { UseChatHelpers } from 'ai/react'
import ChatOptionsSlider from './ChatOptionsSlider'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  backupChat: (payload: any) => void
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  backupChat
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [openChatPane, setOpenChatPane] = React.useState(false)
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (input === '') {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <ChatOptionsSlider open={openChatPane} setOpen={setOpenChatPane} setInput={setInput} />
        <div className="absolute h-full flex justify-center items-center left-0  sm:left-4">

          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'h-8 w-8 rounded-full bg-background p-0 sm:left-4'
              )}>
                {/* <Link
              href="/"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
              )}
            > */}
                <IconPlus onClick={() => setOpenChatPane(true)} />
                <span className="sr-only">New Chat</span>
              </div>
              {/* </Link> */}
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] max-h-[120px] overflow-auto w-full resize-none bg-transparent px-8 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute h-full flex justify-center items-center right-0  sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                // disabled={isLoading || input === ''}
                onClick={backupChat}
              >
                <BsBookmarkStarFill />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Backup message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}