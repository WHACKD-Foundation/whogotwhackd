import { useEffect, useState } from 'react'
import { useInterval } from '@usedapp/core'
import { getWhackdCounter } from '@/components/providers/etherscan'
import { NomicsWidget } from '@/components/NomicsWidget'
import { motion } from 'framer-motion'
import IconUniswap from '@/components/IconUniswap'
import ctl from '@netlify/classnames-template-literals'
import { SiEthereum as IconEthereum } from 'react-icons/si'
import Tippy from '@tippyjs/react'
import { useCopyToClipboard } from 'react-use'

const uniswap = ctl(`
  flex
  items-center
  rounded-full
  text-lg
  px-4
  py-2
  font-medium
  shadow
  transition
  hover:shadow-xl
  text-white
  bg-pink-600
`)

const ethereum = ctl(`
  flex
  items-center
  rounded-full
  text-lg
  px-4
  py-2
  font-medium
  shadow
  transition
  hover:shadow-xl
  text-white
  bg-blue-600
`)

const CONTRACT = '0xCF8335727B776d190f9D15a54E6B9B9348439eEE'

export default function HomePage() {
  let [whackdCounter, setCounter] = useState('0')

  const handleChange = w => {
    setCounter(w)
  }
  useInterval(() => {
    getWhackdCounter(handleChange)
  }, 10000)

  useEffect(() => {
    getWhackdCounter(handleChange)
  }, [])

  const copyToClipboard = useCopyToClipboard()[1]

  return (
    <div className="flex flex-col items-center space-y-5 p-5">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        alt="Whackd logo"
        src="/logo.png"
        className="w-64 h-64"
      />
      <div className="mt-5 text-7xl font-extrabold tracking-tight text-gray-100 leading-none">
        $WHACKD
      </div>

      <Tippy content="Click to copy" placement="right">
        <div
          className="text-white font-medium cursor-pointer"
          onClick={() => copyToClipboard(CONTRACT)}
        >
          {CONTRACT}
        </div>
      </Tippy>

      <div className="flex items-center space-x-4">
        <a
          href="https://app.uniswap.org/#/swap?outputCurrency=0xcf8335727b776d190f9d15a54e6b9b9348439eee&use=V2"
          target="_blank"
          rel="noopener noreferrer"
          className={uniswap}
        >
          <IconUniswap className="w-7 h-7 mr-2" />
          Buy on Uniswap V2
        </a>
        <a
          href="https://etherscan.io/token/0xcf8335727b776d190f9d15a54e6b9b9348439eee"
          target="_blank"
          rel="noopener noreferrer"
          className={ethereum}
        >
          <IconEthereum className="w-7 h-7 mr-2" />
          View on Etherscan
        </a>
      </div>

      <div className="text-lg font-semibold text-gray-100">
        Transactions until next WHACK: {1000 - whackdCounter}
      </div>

      <div className="w-full max-w-screen-sm">
        <NomicsWidget />
      </div>

      <div className="py-5">
        <img
          className="w-96"
          src="/whackd.png"
          alt="10% of transactions burned + 1 out of 1000 transactions burned"
        />
      </div>
    </div>
  )
}
