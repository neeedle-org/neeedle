import { BigNumber, utils } from 'ethers'
import { Field, FieldType, Method } from 'src/types/abi'

const IS_NUMBER = /^u?int/
const IS_ARRAY = /\[\]$/
const DELIMITER = ','
export const convert = (
  type: FieldType,
  input: string,
): string | BigNumber | boolean | string[] | BigNumber[] | boolean[] => {
  if (IS_ARRAY.test(type)) {
    const values = input.split(DELIMITER)
    return values.map((value) =>
      convert(type.replace(IS_ARRAY, '') as FieldType, value),
    ) as string[] | BigNumber[] | boolean[]
  }
  if (IS_NUMBER.test(type)) return BigNumber.from(input)
  if (type === 'bool') return input === 'true'
  return input
}

const convertValue = (value: any) => {
  if (BigNumber.isBigNumber(value)) {
    return value.toBigInt().toString()
  }
  return value
}

export const convertOutput = (types: Field[], output: any | any[]) =>
  !Array.isArray(output)
    ? convertValue(output)
    : types.map(({ name }) => name).filter(Boolean).length
    ? types.reduce(
        (prev, { name, type }, idx) => ({
          ...prev,
          [name || `${type}:${idx}`]: convertValue(output[idx]),
        }),
        {},
      )
    : output.map(convertValue)

export const toOption = (
  stateMutability: Method['stateMutability'],
  gasLimit: string,
  value?: string,
  unit?: string,
) => ({
  value:
    stateMutability === 'payable' && value
      ? utils.parseUnits(value, unit)
      : undefined,
  gasLimit: stateMutability === 'view' ? undefined : gasLimit,
})
