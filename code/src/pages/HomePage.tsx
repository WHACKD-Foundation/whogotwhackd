import React from 'react'
import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { BigNumber, providers } from 'ethers'
import { useEthers, useTokenBalance } from '@usedapp/core'
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
import { AccountButton } from '../components/account/AccountButton'

import WhackdAbiJson from '../abi/Whackd.json'

const WHACKD_CONTRACT = '0xCF8335727B776d190f9D15a54E6B9B9348439eEE'

export function HomePage() {
  const { account } = useEthers()
  const userBalance = useTokenBalance(WHACKD_CONTRACT, account)
  const [whackdCounter, setCounter] = React.useState('0')
  const handleChange = (w: string) => setCounter(w)

  let provider = new providers.EtherscanProvider()
  const whackd = new Contract(WHACKD_CONTRACT, WhackdAbiJson, provider)
  whackd.on('Transfer', (from, to, amount, event) => {
    console.log('Transfer happened')
    var storagePromise = provider.getStorageAt(WHACKD_CONTRACT, 6)
    storagePromise
      .then(function (result) {
        let whackdCounter = BigNumber.from(result)
        handleChange(whackdCounter.toString())
      })
      .catch(function (error) {
        // TODO: We should do something here, I'm not sure how often this happens
        console.log('Error when updating counter')
      })
  })

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Balanced</Title>
            <AccountButton />
          </SectionRow>
          <ContentBlock>
            {whackdCounter && (
              <ContentRow>
                <Label>Counter is at:</Label>{' '}
                <TextInline>{whackdCounter}</TextInline>
              </ContentRow>
            )}
            {account && (
              <ContentRow>
                <Label>Account:</Label> <TextInline>{account}</TextInline>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Label>WHACKD balance:</Label>{' '}
                <TextInline>{formatEther(userBalance)}</TextInline>{' '}
                <Label>WHACKD</Label>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
