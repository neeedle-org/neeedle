import merge from 'merge-deep'
import { ABI, ABIDoc, ABISpec, Method } from 'src/types/abi'

const abiFunctionsFilter = (
  abi: ABI,
  stateMutatability: Method['stateMutability'],
) =>
  abi.filter(
    (each) =>
      each.type === 'function' && each.stateMutability === stateMutatability,
  )

const toSignature = (method: Method) =>
  `${method.name}(${method.inputs.map(({ type }) => type).join(',')})`

export class ABIModel {
  readonly abi: ABI
  readonly payables: Method[]
  readonly nonpayables: Method[]
  readonly views: Method[]
  readonly purefunctions: Method[]
  readonly docs: {
    devdoc?: ABIDoc
    userdoc?: ABIDoc
  }

  constructor(abiSpec: ABISpec) {
    this.abi = abiSpec.abi
    this.payables = abiFunctionsFilter(this.abi, 'payable')
    this.nonpayables = abiFunctionsFilter(this.abi, 'nonpayable')
    this.views = abiFunctionsFilter(this.abi, 'view')
    this.purefunctions = abiFunctionsFilter(this.abi, 'pure')
    this.docs = {
      devdoc: abiSpec.devdoc,
      userdoc: abiSpec.userdoc,
    }
  }

  readonly findDoc = (
    method: Method,
    option?: {
      prefer?: 'devdoc' | 'userdoc'
      doc?: 'devdoc' | 'userdoc'
    },
  ) => {
    const { prefer = 'userdoc', doc } = option || {}
    const target = doc
      ? this.docs[doc]
      : prefer === 'userdoc'
      ? merge(this.docs.devdoc, this.docs.userdoc)
      : merge(this.docs.userdoc, this.docs.devdoc)
    return target?.methods?.[toSignature(method)]
  }
}
