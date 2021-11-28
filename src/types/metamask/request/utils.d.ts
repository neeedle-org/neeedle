type MetamaskRequest = <M extends MetamaskMethods>(
  arg: MetamaskRequestTypeMapper<M, 'arg'>,
) => Promise<MetamaskRequestTypeMapper<M, 'return'>>

type MetamaskRequestType<M extends MetamaskMethods, P, R> = {
  method: M
  arg: MetamaskRequestArg<M, P>
  return: R
}

type MetamaskRequestArg<M, P> = P extends void
  ? {
      method: M
    }
  : {
      method: M
      params: [P]
    }
