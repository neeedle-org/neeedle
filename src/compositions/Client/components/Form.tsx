import { ContractTransaction } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useWalletModal } from 'src/components/WalletModal'
import { errorColor } from 'src/components/WalletModal/colors'
import { useSettingsStore } from 'src/stores/settings'
import { fontWeightSemiBold } from 'src/styles/font'
import { Method, MethodDoc } from 'src/types/abi'
import styled from 'styled-components'
import { Inputs } from './Inputs'
import { Response } from './Response'
import { Doc, ErrorMessage, Output, ctaStyle } from './styles'

export type FormProps = {
  method: Method
  doc?: MethodDoc
  call?: (...args: any[]) => Promise<ContractTransaction | any>
  encodeToBytes: (...args: any[]) => string
  changeChain?: VoidFunction
}

export const Form: FC<FormProps> = ({
  method,
  doc,
  call,
  encodeToBytes,
  changeChain,
}) => {
  const { open } = useWalletModal()
  const { settings } = useSettingsStore()
  const methods = useForm()
  const { handleSubmit, getValues } = methods
  const [response, setResponse] = useState<any>()
  const [receipt, setReceipt] = useState<any>(null)
  const [bytesEncoded, setBytesEncoded] = useState<string>()
  const [errorMessage, setErrorMessage] = useState('')

  const submit = (data: any) => {
    if (!call) return
    setBytesEncoded(undefined)
    setResponse(undefined)
    setReceipt(undefined)
    setErrorMessage('')
    return call(method, data, settings.gasLimit, settings.unit)
      .then((tx) => {
        setResponse(tx)
        if (typeof tx.wait !== 'function') return setReceipt(null)
        return (tx as ContractTransaction).wait(1).then(setReceipt)
      })
      .catch((e) => setErrorMessage(JSON.stringify(e, null, 4)))
  }
  const encode = () => {
    setErrorMessage('')
    setResponse(undefined)
    setBytesEncoded(encodeToBytes(method, getValues()))
  }

  useEffect(() => {
    if (!settings.fn || settings.fn !== method.name || !settings.args?.length)
      return
    methods.reset({ args: settings.args })
  }, [method, settings.fn, settings.args])

  return (
    <FormProvider key={method.name} {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <Section open={settings.fn === method.name}>
          <Caption>
            <h4>{method.name}</h4>
            <Doc>{doc?.details || ''}</Doc>
          </Caption>
          <CollapsableDiv>
            <InputsDiv>
              <Inputs method={method} doc={doc} />
            </InputsDiv>
            <ButtonsDiv>
              <button type="button" onClick={encode}>
                Encode
              </button>
              {changeChain ? (
                <AttentionButton type={'button'} onClick={changeChain}>
                  Wrong Network
                </AttentionButton>
              ) : (
                <button
                  type={call ? 'submit' : 'button'}
                  onClick={call ? undefined : open}
                >
                  Call
                </button>
              )}
            </ButtonsDiv>
            {bytesEncoded && (
              <Output>{`Bytes Encoded:\n\n${bytesEncoded}`}</Output>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {receipt !== null && (
              <Response
                method={method}
                response={receipt || 'Waiting for the receipt...'}
              />
            )}
            {!bytesEncoded && <Response method={method} response={response} />}
          </CollapsableDiv>
        </Section>
      </form>
    </FormProvider>
  )
}

const InputsDiv = styled.div`
  label {
    margin-top: 8px;
  }
  ${Doc} {
    margin: 0 8px;
  }
`

const ButtonsDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  > button {
    margin-left: 24px;
    ${ctaStyle};
  }
`
const AttentionButton = styled.button`
  && {
    background: ${errorColor};
  }
`

const CollapsableDiv = styled.div`
  border-top: 1px solid;
`
const Caption = styled.summary`
  cursor: pointer;
  padding: 8px 16px;
  h4 {
    display: inline;
    font-size: 24px;
    font-weight: ${fontWeightSemiBold};
    padding: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${Doc} {
    margin: 4px 24px;
  }
  button {
    display: block;
    :disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`
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

const Section = styled.details`
  margin-top: 20px;
  font-size: 24px;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 0 3px 2px #00000080;
  transition: all 0.25s ease-in-out;
  :hover,
  &[open] {
    box-shadow: none;
    border-color: ${({ theme: { primary } }) => primary}80;
  }
  ${InputsDiv},${ButtonsDiv} {
    padding: 12px 56px 24px;
  }
  ${Output} {
    border-radius: 0px;
  }
`
