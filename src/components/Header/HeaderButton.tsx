import { ButtonHTMLAttributes, VFC } from 'react'
import { primaryColor, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import styled, { css } from 'styled-components'

type HeaderButtonProps = {
  label: string
} & ButtonStyleProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export const HeaderButton: VFC<HeaderButtonProps> = ({
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
  border: 1px solid ${primaryColor};
  font-size: 14px;
  font-weight: ${fontWeightMedium};
  text-align: center;
  :focus,
  :hover {
    background-color: ${primaryColor};
    color: ${white};
  }
  ${({ hasAccount }) =>
    hasAccount &&
    css`
      background-color: ${primaryColor};
      color: ${white};
      border: unset;
      :focus,
      :hover {
        background-color: ${primaryColor}b0;
      }
    `}
`
