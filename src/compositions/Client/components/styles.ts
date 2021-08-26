import styled, { css } from 'styled-components'

export const Output = styled.div`
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  min-height: 40px;
  background-color: lightgray;
  word-break: break-all;
  white-space: pre-wrap;
  a {
    :hover {
      text-decoration: underline;
    }
  }
`

export const ErrorMessage = styled(Output)`
  color: darkred;
`

export const ctaStyle = css`
  background-color: darkslategray;
  border-radius: 17px;
  width: 152px;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
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
