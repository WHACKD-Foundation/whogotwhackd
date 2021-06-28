import WhackdAbiJson from '../../abi/Whackd.json'

import { Contract } from '@ethersproject/contracts'
import { BigNumber, providers } from 'ethers'

const WHACKD_CONTRACT = '0xCF8335727B776d190f9D15a54E6B9B9348439eEE'
const ETHERSCAN_APIKEY = 'P5YRK927CQTPU1H1Q2S1FDS117JQR3CEKP'
const BURN_ADDRESS = '0x0000000000000000000000000000000000000000'
let provider = new providers.EtherscanProvider(undefined, ETHERSCAN_APIKEY)

export const whackdContract = new Contract(WHACKD_CONTRACT, WhackdAbiJson, provider)

export function getWhackdCounter(callback: Function) {
  var storagePromise = provider.getStorageAt(WHACKD_CONTRACT, 6)
  storagePromise
    .then(function (result) {
      let whackdCounter = BigNumber.from(result)
      callback(whackdCounter.toString())
    })
    .catch(function (error) {
      // TODO: We should do something here, I'm not sure how often this happens
      console.log('Error when updating counter')
    })
}
