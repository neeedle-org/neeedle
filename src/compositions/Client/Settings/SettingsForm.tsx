import { ethers } from 'ethers'
import { FC, ReactNode } from 'react'
import { getExplorer } from 'src/constants/chains'
import { Link } from 'src/elements/Link'
import { useWalletStore } from 'src/stores'
import { ErrorMessage, OutputMini } from '../components'

type SettingsFormItemProps = {
  title: string
  output: string
  errorMessage: string
  children: ReactNode
  className?: string
}
export const SettingsFormItem: FC<SettingsFormItemProps> = ({
  title,
  output,
  errorMessage,
  children,
  className,
}) => {
  const { chainId } = useWalletStore()
  const explorer = getExplorer(chainId)
  return (
    <div className={className}>
      <h3>{title}</h3>
      {output && (
        <OutputMini>
          {output.startsWith('http') ? (
            <Link href={output}>{output}</Link>
          ) : ethers.utils.isAddress(output) && explorer ? (
            <Link href={explorer.address(output)}>{output}</Link>
          ) : (
            output
          )}
        </OutputMini>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {children}
    </div>
  )
}
