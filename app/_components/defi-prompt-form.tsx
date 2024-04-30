import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'
import { Tab } from '@headlessui/react'
import { BiArrowBack } from 'react-icons/bi'
import { useEnterSubmit } from '@/app/lib/hooks/use-enter-submit'
import { cn } from '@/app/lib/utils'
import { Button, buttonVariants } from '@/app/_components/ui/button';
// import { * as ActionButton} from "@/components/Button"
import { useOperations } from '@/providers/operations';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/app/_components/ui/tooltip'
import { IconArrowElbow, IconPlus } from '@/app/_components/ui/icons'
import { UseChatHelpers } from 'ai/react'
import DefiPopoverTemplets from './defi-popover-templets'
import { templates } from '../../constants/templates'
import { useHomeViewModel } from './home.page.vm'
import OperationScreen from '@/components/base/operations-screen'
import Loader from '@/components/Loader'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function DefiPromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { setOperations, operations } = useOperations();
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { sendPromt, promtMessage, setPromtMessage, isSubmitting } = useHomeViewModel();
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  const tabs = ['REQUEST', 'TEMPLATES'];
  const setTemplate = (message: string) => {
    setPromtMessage(message);
    // setMainTab();
  };

  const onPromtSubmit = (event) => {
    event.preventDefault();
    setSelectedIndex(0)
    console.log("==-==---=====---===-==-===-===----=", { promtMessage })
    sendPromt(promtMessage, operations => {
      console.log({ operations })
      setOperations(operations);
      setIsOpen(true);
    });
    setPromtMessage('');
  };
  return (
    <>
      {/* <Loader /> */}
      {operations.length ?
        <div className='h-[calc(100vh-185px)] w-full overflow-auto'>
          <div className='flex items-center p-2 gap-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100'>
            <BiArrowBack className='cursor-pointer' size={24} onClick={() => {
              console.log({ operations })
              setOperations([])
            }} />Request Result

          </div>
          {/* {isOpen && ( */}
          <OperationScreen isOpen={isOpen} setIsOpen={setIsOpen} />
          {/* )} */}
        </div>
        :
        <>
          <div className='h-[calc(100vh-190px)] '>
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="flex space-x-1 rounded-xl bg-green-900/20 p-1">
                {tabs.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) => classNames(
                      'w-full rounded-md py-2.5 text-sm font-medium leading-5 text-green-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-600 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-green-100 hover:bg-white/[0.12] hover:text-white'
                    )}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">

                <Tab.Panel
                  key={"REQUEST"}
                  className={classNames(
                    'bg-white p-3 border rounded-md',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-600 focus:outline-none focus:ring-2'
                  )}
                >
                  <div className="h-[calc(100vh-260px)] flex flex-col justify-center items-center gap-4 ">
                    {isOpen && (
                      <OperationScreen isOpen={isOpen} setIsOpen={setIsOpen} />
                    )}
                    <div className='text-4xl font-medium text-gray-600'>👋🏻</div>
                    <div className='text-2xl font-medium text-gray-600'>Hi! I am DEFI Propmt</div><div className='text-lg font-medium text-gray-600'>"Simply tell me what you need, and I'll make it happen."</div>
                  </div>
                </Tab.Panel>

                <Tab.Panel
                  key={"TEMPLATES"}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-600 focus:outline-none focus:ring-2'
                  )}
                >
                  <div className="overflow-y-auto h-[calc(100vh-250px)]">
                    {templates?.map((template: string, index: number) => (
                      <div key={index} className='flex flex-col  px-2 py-4 m-2 rounded-md border-dashed border text-sm font-semibold'>
                        <div> {template}</div>
                        <div className='text-right px-2 py-1'>
                          <Button onClick={() => { console.log(template); setTemplate(template) }}>USE</Button>
                        </div>
                      </div>
                    ))}
                  </div>

                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="relative flex w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
            <Textarea
              // ref={inputRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              rows={1}
              value={promtMessage}
              onChange={e => setPromtMessage(e.target.value)}
              placeholder="Send a message."
              spellCheck={false}
              className="min-h-[60px] w-full resize-none bg-transparent px-1 py-[1.3rem] focus-within:outline-none sm:text-sm" />
            <div className="absolute right-0 top-4 sm:right-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || input === ''}
                    onClick={onPromtSubmit}
                  >
                    <IconArrowElbow />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </>
      }
    </>
  )
}