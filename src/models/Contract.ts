import { Provider } from '@ethersproject/providers'
import { Contract, ContractTransaction, Signer } from 'ethers'
import { DEFAULT_GAS_LIMIT } from 'src/constants/misc'
import { ABI, Method } from 'src/types/abi'
import { convert, toOption } from 'src/utils/converter'

export class ContractModel {
  readonly contract: Contract

  constructor(props: {
    address: string
    abi: ABI
    signerOrProvider: Signer | Provider | undefined
  }) {
    this.contract = new Contract(
      props.address,
      props.abi,
      props.signerOrProvider,
    )
  }

  readonly encodeToBytes = (method: Method, data: { [x: string]: string }) => {
    const args = method.inputs.map(({ type }, idx) => {
      const input = data.args[idx]
      return convert(type, input)
    })
    return this.contract.interface.encodeFunctionData(method.name, args)
  }

  readonly call = async (
    method: Method,
    data: { [x: string]: string },
    gasLimit?: string,
    unit?: string,
  ): Promise<ContractTransaction | any> => {
    const func =
      this.contract[
        `${method.name}(${method.inputs.map(({ type }) => type).join(',')})`
      ]
    if (!func) throw new Error(`Function not found: ${method.name}`)
    const args = method.inputs.map(({ type }, idx) => {
      const input = data.args[idx]
      return convert(type, input)
    })
    const option = toOption(
      method.stateMutability,
      gasLimit || DEFAULT_GAS_LIMIT,
      data.value,
      unit || 'wei',
    )
    return func(...args, option)
  }
}
