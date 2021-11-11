import { forwardRef, InputHTMLAttributes, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useWalletModal } from 'src/components/WalletModal'
import { unitLabel, UNITS } from 'src/constants/misc'
import { useSettingsStore } from 'src/stores/settings'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { FieldType, Method, MethodDoc } from 'src/types/abi'
import { convertOutput } from 'src/utils/converter'
import styled from 'styled-components'
import { ctaStyle, ErrorMessage, Output, Unit } from './styles'

export type FormProps = {
  method: Method
  doc?: MethodDoc
  call?: (...args: any[]) => Promise<any>
  encodeToBytes: (...args: any[]) => string
}

export const Form: VFC<FormProps> = ({ method, doc, call, encodeToBytes }) => {
  const { open } = useWalletModal()
  const { settings } = useSettingsStore()
  const methods = useForm()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = methods
  const [output, setOutput] = useState<any>()
  const [bytesEncoded, setBytesEncoded] = useState<string>()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <FormProvider key={method.name} {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          if (!call) return
          setBytesEncoded(undefined)
          setOutput(undefined)
          setErrorMessage('')
          return call(method, data, settings.gasLimit, settings.unit)
            .then(setOutput)
            .catch((e) => setErrorMessage(JSON.stringify(e, null, 4)))
        })}
      >
        <Section>
          <Caption>
            <h4>{method.name}</h4>
            <Doc>{doc?.details || ''}</Doc>
          </Caption>
          <CollapsableDiv>
            <Inputs>
              {!method.inputs.length && method.stateMutability !== 'payable' && (
                <NoParams>
                  <p>No Params</p>
                </NoParams>
              )}
              {method.stateMutability === 'payable' && (
                <Input
                  label="value"
                  fieldType="uint256"
                  doc="transferring amount"
                  unit={settings.unit}
                  hasError={!isSubmitSuccessful && !!errors['value']}
                  {...register(`value`, { required: true })}
                />
              )}
              {method.inputs.map((each, idx, arr) => {
                const name =
                  each.name || (arr.length > 1 ? `key${idx + 1}` : 'key')
                return (
                  <Input
                    key={name}
                    label={name}
                    fieldType={each.type}
                    doc={doc?.params?.[name]}
                    hasError={
                      !isSubmitSuccessful &&
                      !!(errors[`args`] && errors[`args`][idx])
                    }
                    {...register(`args[${idx}]`, { required: true })}
                  />
                )
              })}
              <Buttons>
                <button
                  type="button"
                  onClick={() =>
                    encodeToBytes &&
                    setBytesEncoded(encodeToBytes(method, getValues()))
                  }
                >
                  Encode
                </button>
                <button
                  type={call ? 'submit' : 'button'}
                  onClick={call ? undefined : open}
                >
                  Call
                </button>
              </Buttons>
            </Inputs>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {bytesEncoded && (
              <Output>{`Bytes Encoded\n\n${bytesEncoded}`}</Output>
            )}
            {output != null ? (
              <>
                <Output>
                  {JSON.stringify(
                    convertOutput(method.outputs, output),
                    null,
                    4,
                  )}
                </Output>
                <RawResponse>
                  <summary>Raw response</summary>
                  <Output>{JSON.stringify(output, null, 4)}</Output>
                </RawResponse>
              </>
            ) : (
              <Output>
                {'Response Type:\n\n'}
                {JSON.stringify(method.outputs, null, 4)}
              </Output>
            )}
          </CollapsableDiv>
        </Section>
      </form>
    </FormProvider>
  )
}

type InputProps = {
  label: string
  fieldType: FieldType
  doc?: string
  unit?: typeof UNITS[number]['value']
  hasError?: boolean
} & InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldType, doc, unit, hasError, ...props }, ref) => (
    <InputLabel hasError={hasError}>
      <div>
        {label}: <Type>{fieldType}</Type>
        <Doc>{doc}</Doc>
      </div>
      <div>
        <input {...props} ref={ref} placeholder={hasError ? 'Required' : ''} />
        {unit && <Unit>{unitLabel(unit)}</Unit>}
      </div>
    </InputLabel>
  ),
)

const Doc = styled.p`
  display: block;
  font-size: 16px;
  font-weight: ${fontWeightRegular};
  line-height: 1.33;
`

const Type = styled.span`
  font-size: 18px;
  font-style: italic;
`
const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  > button {
    margin-left: 24px;
    ${ctaStyle};
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
  ${Output} {
    border-radius: 0px;
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
const InputLabel = styled.label<{ hasError?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  color: ${({ hasError, theme: { primary, error } }) =>
    hasError ? error : primary};
  input {
    color: ${({ theme: { primary } }) => primary};
    border: 1px solid;
    border-radius: 8px;
    padding: 4px 8px;
  }
  > * {
    width: 100%;
    max-width: 360px;
  }
`

const Inputs = styled.div`
  display: flex;
  padding: 12px 56px 24px;
  flex-direction: column;
  ${InputLabel} {
    margin-top: 8px;
  }
  ${Doc} {
    margin: 0 8px;
  }
`

const NoParams = styled.label`
  opacity: 0.75;
  font-style: italic;
`
