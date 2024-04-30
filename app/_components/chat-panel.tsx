import { Button } from '@/app/_components/ui/button'
import { PromptForm } from '@/app/_components/prompt-form'
import { ButtonScrollToBottom } from '@/app/_components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/app/_components/ui/icons'
import { UseChatHelpers } from "ai/react";
import { functionSchemas } from '@/app/lib/functions/schemas'
import { Tabs } from '@radix-ui/react-tabs';

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
    | 'backupChat'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  backupChat,
}: ChatPanelProps) {
  return (
    <div className="fixed w-full bottom-0 bg-gradient-to-b from-mw-fulluted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto w-full sm:max-w-4xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (


              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 w-full border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              },
                { functions: functionSchemas })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            backupChat={backupChat}
          />
        </div>
      </div>
    </div>
  )
}