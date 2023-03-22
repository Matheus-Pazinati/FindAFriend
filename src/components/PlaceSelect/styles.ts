import styled from 'styled-components'

interface SelectProps {
  type: 'state' | 'city'
}

export const Select = styled.select<SelectProps>`
  border-radius: 15px;
  border: 1px solid #f15156;
  padding: 1rem;
  background: #f75f64;
  border: none;
  position: relative;
  color: #ffffff;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  flex: ${(props) => (props.type === 'city' ? 2 : 0)};
  max-width: 13rem;
  text-overflow: ellipsis;
`
