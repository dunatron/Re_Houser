import styled from "styled-components"

const NavStyles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
  }
`

export default NavStyles
