// see: https://docs.soliditylang.org/en/v0.5.3/abi-spec.html

export type ABISpec = {
  abi: ABI
  address?: string
  devdoc?: ABIDoc
  userdoc?: ABIDoc
}
export type ABIDoc = {
  author: string
  kind: string
  methods: {
    [key in string]: MethodDoc
  }
}

export type MethodDoc = {
  details?: string
  params?: {
    [key in string]: string
  }
}
export type ABI = Method[]

export type Method = {
  name: string
  type: 'constructor' | 'function'
  stateMutability: 'view' | 'nonpayable' | 'payable' | 'pure'
  inputs: Field[]
  outputs: Field[]
}

export type Field = {
  name: string
  type: 'address' | 'uint256' | 'string' | 'bool'
  internalType: 'address' | 'uint256' | 'string' | 'bool'
}

export type FieldType =
  | FieldTypes
  | `${FieldTypes}[]`
  | `${FieldTypes}[${number}]`

type FieldTypes =
  | 'address'
  | 'string'
  | 'bool'
  | `fixed`
  | `ufixed`
  | `fixed${number}x${number}`
  | `ufixed${number}x${number}`
  | `bytes${number}`
  | `function`
  | NumberField

type NumberField = `int` | `uint` | `int${number}` | `uint${number}`
