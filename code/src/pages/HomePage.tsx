import React, { useState } from 'react'
import {
  Container,
  ContentBlock,
  ContentRow,
  MainContent,
  Section,
} from '../components/base/base'
import { Label } from '../typography/Label'
import { Title } from '../typography/Title'
import { useInterval } from '@usedapp/core'
import { getWhackdCounter } from '../components/providers/etherscan'
import { NomicsWidget } from '../components/NomicsWidget'

export function HomePage() {
  let [whackdCounter, setCounter] = useState('0');

  const handleChange = (w: string) =>  {
    setCounter(w);
  }
  useInterval(() => {
    getWhackdCounter(handleChange);
  }, 10000);

  getWhackdCounter(handleChange);

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
