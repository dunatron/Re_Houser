import styled from "styled-components"

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-self: end;
  font-size: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    border-top: 1px solid ${props => props.theme.palette.common.lightGrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`

export default NavStyles
