import styled from 'styled-components'
import { ctaStyle } from '../components'

export const Control = styled.div`
  display: flex;
  align-items: center;
  margin: 12px -8px 0;
  > * {
    margin: 0 8px;
  }
  input {
    flex: 1;
  }
  label,
  button {
    ${ctaStyle};
  }
`
