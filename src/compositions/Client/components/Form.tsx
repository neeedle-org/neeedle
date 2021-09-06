import { forwardRef, InputHTMLAttributes, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { unitLabel, UNITS } from 'src/constants/misc'
import { useSettingsStore } from 'src/stores/settings'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { FieldType, Method, MethodDoc } from 'src/types/abi'
import { convertOutput } from 'src/utils/converter'
import styled from 'styled-components'
import { ctaStyle, ErrorMessage, Output, Unit } from './styles'

export const Form: VFC<{
  method: Method
  doc?: MethodDoc
  active?: boolean
  call?: (...args: any[]) => Promise<any>
}> = ({ method, doc, active, call }) => {
  const { settings } = useSettingsStore()
  const methods = useForm()
  const { handleSubmit, register } = methods
  const [output, setOutput] = useState<any>()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <FormProvider key={method.name} {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          if (!call) return
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
                    {...register(`args[${idx}]`, { required: true })}
                  />
                )
              })}
              <button disabled={!active}>Call</button>
            </Inputs>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
} & InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldType, doc, unit, ...props }, ref) => (
    <label>
      <div>
        {label}: <Type>{fieldType}</Type>
        <Doc>{doc}</Doc>
      </div>
      <div>
        <input {...props} ref={ref} />
        {unit && <Unit>{unitLabel(unit)}</Unit>}
      </div>
    </label>
  ),
)

const Doc = styled.p`
  display: block;
  font-size: 18px;
  font-weight: ${fontWeightRegular};
  line-height: 1;
`

const Type = styled.span`
  font-size: 18px;
  font-style: italic;
`

const Section = styled.details`
  margin-top: 20px;
  font-size: 24px;
  border: 1px solid;
`
const CollapsableDiv = styled.div`
  border-top: 1px solid;
`
const Caption = styled.summary`
  display: block;
  cursor: pointer;
  h4 {
    font-size: 24px;
    font-weight: ${fontWeightSemiBold};
    padding: 4px 8px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${Doc} {
    margin: 4px 16px;
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
const Inputs = styled.div`
  display: flex;
  padding: 12px 56px 24px;
  flex-direction: column;
  label {
    width: 100%;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    input {
      border: 1px solid;
      padding: 4px 8px;
    }
    > * {
      width: 100%;
      max-width: 360px;
    }
  }
  ${Doc} {
    margin: 0 8px;
  }
  button {
    margin-top: 20px;
    margin-left: auto;
    ${ctaStyle};
  }
`
const NoParams = styled.label`
  opacity: 0.75;
  font-style: italic;
`
