
import { ReactNode, VFC } from "react"
import { Link } from "src/elements/Link"
import { ErrorMessage, Output } from "./styles"

type SettingsFormItemProps = {
  title: string
  output: string
  errorMessage: string
  children: ReactNode
  className?: string
}
export const SettingsFormItem: VFC<SettingsFormItemProps> = ({
  title,
  output,
  errorMessage,
  children,
  className,
}) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <Output>
        {output.startsWith('http') ? (
          <Link href={output}>{output}</Link>
        ) : (
          output
        )}
      </Output>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {children}
    </div>
  )
}
