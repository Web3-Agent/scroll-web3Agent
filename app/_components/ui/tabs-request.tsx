import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Button } from '@/app/_components/ui/button'


interface TemplateProps {
  text: string;
  use: (message: string) => void;
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example() {
  let [categories] = useState({
    Request: [
      {
        id: 1,
        title: 'Swap 100 USDT to ETH and create portfolio with 0.001 WETH and trigger stop loss on -5% and take profit on 10%.',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "Create portfolio with 0.1 WETH and trigger stop loss on -5% and take profit on 10%.",

      },
      {
        id: 2,
        title: "Create portfolio with 0.1 WETH and trigger stop loss on -5% and take profit on 10%.",

      },
      {
        id: 2,
        title: "Create portfolio with 0.1 WETH and trigger stop loss on -5% and take profit on 10%.",

      },

    ], Templetes: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',

      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",

      },
    ],

  })

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className=" w-1080px flex space-x-1 rounded-xl bg-green-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-green-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-green-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>

          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">

          <Tab.Panel
            key={3}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'
            )}
          >
            {/* <label>Just describe your request and I'll do the magic.

              </label> */}
            <textarea placeholder='Just describe your request and I will do the magic.' className='w-full p-5 h-52 mt-7 border-green-800 focus:border-green-700 border-input bg-white text-primary border-emerald-600 shadow-md' ></textarea>
            <Button variant="default" className='w-full mt-5 h-12'> Send Request</Button>

          </Tab.Panel>


          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="border-2 mb-2 relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    {/* <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{ post.shareCount } shares</li>
                     
                    </ul> */}

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-green-700 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />

                    <Button onClick={() => use(post.title)} variant="default" className='mt-2'> Use</Button>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
