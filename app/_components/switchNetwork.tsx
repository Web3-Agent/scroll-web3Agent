import { Fragment, useState } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const NetworkSwitcher = () => {
  const { chain } = useNetwork()
  const { chains, error, pendingChainId, switchNetwork, status } =
    useSwitchNetwork()

  const [selectedNetwork, setSelectedNetwork] = useState(chain?.id || '')

  const handleNetworkChange = (e) => {
    const selectedNetworkId = e.target.value;
    setSelectedNetwork(selectedNetworkId);
    switchNetwork(selectedNetworkId);
  };

  return (
    <div class="relative inline-flex">
      {/* {chain && <div>Using {chain.name}</div>} */}
    <svg class="w-2 h-2 absolute top-0 right-0 m-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#ffff" fill-rule="nonzero"/></svg>
      {/* <select onChange={ handleNetworkChange } value={ selectedNetwork }> */}
        <select onChange={ handleNetworkChange } value={ selectedNetwork } class="border w-auto border-green-300 rounded-md text-white h-8 pl-6 pr-7 bg-green-700 hover:border-green-400 focus:outline-none appearance-none">
        {chains.map((x) => (
          <option key={x.id} value={x.id} disabled={!switchNetwork || x.id === chain?.id}>
            {x.id === chain?.id ? `${x.name}` : x.name}
            {status === 'loading' && x.id === pendingChainId && '…'}
          </option>
        ))}
      </select>

      <div>{error && (error?.message ?? 'Failed to switch')}</div>
    </div>
  )
}
