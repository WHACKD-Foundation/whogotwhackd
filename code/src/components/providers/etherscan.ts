import WhackdAbiJson from '@/abi/Whackd.json'

import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { BigNumber, providers } from 'ethers'

const WHACKD_CONTRACT = '0xCF8335727B776d190f9D15a54E6B9B9348439eEE'
const ETHERSCAN_APIKEY = 'P5YRK927CQTPU1H1Q2S1FDS117JQR3CEKP'
const TOTAL_SUPPLY = 1000000000
let provider = new providers.EtherscanProvider(undefined, ETHERSCAN_APIKEY)

export const whackdContract = new Contract(
  WHACKD_CONTRACT,
  WhackdAbiJson,
  provider
)

export function getWhackdCounter(callback: Function) {
  const storagePromise = provider.getStorageAt(WHACKD_CONTRACT, 6)
  storagePromise
    .then(function (result) {
      let whackdCounter = BigNumber.from(result)
      callback(whackdCounter.toString())
    })
    .catch(function () {
      // TODO: We should do something here, I'm not sure how often this happens
      console.log('Error when updating counter')
    })
}

export function getWhackdSupply(callback: Function) {
  const supplyPromise = whackdContract.totalSupply()
  supplyPromise
    .then(function (result: BigNumber) {
      var supply = Math.round(parseInt(formatEther(result)))
      var burnedPercent = (((TOTAL_SUPPLY - supply) / TOTAL_SUPPLY) * 100).toFixed(3);
      callback(supply.toLocaleString(), burnedPercent.toString())
    })
    .catch(function() {
      console.log('Error when updating supply')
    })
}