import React from 'react'
import { Contract } from '@ethersproject/contracts'
import { BigNumber, providers } from 'ethers'
import {
  Container,
  ContentBlock,
  ContentRow,
  MainContent,
  Section,
  SectionRow
} from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'
import { NomicsWidget } from '../components/NomicsWidget'

import WhackdAbiJson from '../abi/Whackd.json'

const WHACKD_CONTRACT = '0xCF8335727B776d190f9D15a54E6B9B9348439eEE'
const ETHERSCAN_APIKEY = 'P5YRK927CQTPU1H1Q2S1FDS117JQR3CEKP';
let provider = new providers.EtherscanProvider(undefined, ETHERSCAN_APIKEY)
const whackd = new Contract(WHACKD_CONTRACT, WhackdAbiJson, provider)

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

export function HomePage() {
  const [whackdCounter, setCounter] = React.useState('0')
  const handleChange = (w: string) => setCounter(w)
  getWhackdCounter(handleChange);

  whackd.on('Transfer', (from, to, amount, event) => {
    getWhackdCounter(handleChange);
  })

  return (
    <MainContent>
      <Container>
        {whackdCounter && (
            <ContentBlock>
              <ContentRow>
                <Label>Counter is at:</Label>{' '}
                <Title>{whackdCounter}</Title>
              </ContentRow>
            </ContentBlock>
            )}
        <Section>
          <ContentBlock>
            <p>WHACKED Contract: 0xCF8335727B776d190f9D15a54E6B9B9348439eEE</p>
            <p>
              Check out the recent transactions on: 
              <a href="https://etherscan.io/token/0xcf8335727b776d190f9d15a54e6b9b9348439eee">Etherscan</a>
            </p>
            <NomicsWidget></NomicsWidget>
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
