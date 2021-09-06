import styled, { css } from 'styled-components'

export const Output = styled.div`
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  min-height: 40px;
  background-color: ${({ theme: { bgCodeBlock } }) => bgCodeBlock};
  word-break: break-all;
  white-space: pre-wrap;
  a {
    :hover {
      text-decoration: underline;
    }
  }
`
export const OutputMini = styled(Output)`
  width: fit-content;
`

export const ErrorMessage = styled(Output)`
  color: ${({ theme: { error } }) => error};
`

export const ctaStyle = css`
  background-color: ${({ theme: { bgButtonPrimary } }) => bgButtonPrimary};
  color: ${({ theme: { buttonPrimary } }) => buttonPrimary};
  border-radius: 17px;
  width: 152px;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
export const Unit = styled.span`
  font-size: 14px;
  margin-left: 4px;
`
