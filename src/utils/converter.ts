import { BigNumber, utils } from 'ethers'
import { FieldType, Method } from 'src/types/abi'

const IS_NUMBER = /^u?int/
export const convert = (type: FieldType, input: string) => {
  if (IS_NUMBER.test(type)) return BigNumber.from(input)
  return input
}

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
