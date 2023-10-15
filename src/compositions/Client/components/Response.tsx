import { FC } from 'react'
import { Method } from 'src/types/abi'
import { convertOutput } from 'src/utils/converter'
import styled from 'styled-components'
import { Output } from './styles'

export type ResponseProps = {
  method: Method
  response?: any
}

export const Response: FC<ResponseProps> = ({ method, response }) => {
  if (response === undefined)
    return (
      <Output>
        {'Response Type:\n\n'}
        {JSON.stringify(method.outputs, null, 4)}
      </Output>
    )
  return (
    <>
      <Output>
        {JSON.stringify(convertOutput(method.outputs, response), null, 4)}
      </Output>
      <RawResponse>
        <summary>Raw</summary>
        <Output>{JSON.stringify(response, null, 4)}</Output>
      </RawResponse>
    </>
  )
}

const RawResponse = styled.details`
  margin-top: 12px;
  summary {
    cursor: pointer;
    margin: 0 4px;
    font-size: 18px;
  }
  ${Output} {
    margin-top: 0;
  }
`
