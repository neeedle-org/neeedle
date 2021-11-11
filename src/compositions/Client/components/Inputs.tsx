import { forwardRef, InputHTMLAttributes, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { unitLabel, UNITS } from 'src/constants/misc'
import { useSettingsStore } from 'src/stores/settings'
import { FieldType, Method, MethodDoc } from 'src/types/abi'
import styled from 'styled-components'
import { Doc, Unit } from './styles'

type InputsProps = {
  method: Method
  doc?: MethodDoc
}

export const Inputs: VFC<InputsProps & { className?: string }> = ({
  method,
  doc,
}) => {
  const { settings } = useSettingsStore()
  const methods = useForm()
  const {
    register,
    formState: { errors, isSubmitSuccessful },
  } = methods
  return (
    <>
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
        const name = each.name || (arr.length > 1 ? `key${idx + 1}` : 'key')
        return (
          <Input
            key={name}
            label={name}
            fieldType={each.type}
            doc={doc?.params?.[name]}
            hasError={
              !isSubmitSuccessful && !!(errors[`args`] && errors[`args`][idx])
            }
            {...register(`args[${idx}]`, { required: true })}
          />
        )
      })}
    </>
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

const Type = styled.span`
  font-size: 18px;
  font-style: italic;
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

const NoParams = styled.label`
  opacity: 0.75;
  font-style: italic;
`
