import { ButtonHTMLAttributes, FC } from 'react'
import { fontWeightMedium } from 'src/styles/font'
import styled, { css } from 'styled-components'

type HeaderButtonProps = {
  label: string
} & ButtonStyleProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export const HeaderButton: FC<HeaderButtonProps> = ({
  label,
  hasAccount,
  ...props
}) => (
  <HeaderButtonElement hasAccount={hasAccount} {...props}>
    {label}
  </HeaderButtonElement>
)

type ButtonStyleProps = {
  hasAccount?: boolean
}
const HeaderButtonElement = styled.button<ButtonStyleProps>`
  width: 152px;
  height: 34px;
  border-radius: 17px;
  border: 1px solid ${({ theme: { primary } }) => primary};
  font-size: 14px;
  font-weight: ${fontWeightMedium};
  text-align: center;
  :focus,
  :hover {
    background-color: ${({ theme: { primary } }) => primary};
    color: ${({ theme: { bgPrimary } }) => bgPrimary};
  }
  ${({ hasAccount }) =>
    hasAccount &&
    css`
      background-color: ${({ theme: { primary } }) => primary};
      color: ${({ theme: { bgPrimary } }) => bgPrimary};
      border: unset;
      :focus,
      :hover {
        background-color: ${({ theme: { primary } }) => primary}b0;
      }
    `}
`
