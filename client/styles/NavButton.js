import styled from "styled-components"
import Button from "@material-ui/core/Button"

const NavButton = styled(Button)`
  && {
    border-radius: 0;
    /* font-size: 1.5rem; */
    font-size: 1.0rem;
    /* padding: 1rem 3rem; */
    padding: 0.5rem 1.5rem;
    text-transform: uppercase;
    font-family: "GustanBold";

    /* color: ${props => props.theme.palette.common.grey}; */
    color: ${props => props.theme.palette.primary.light};
    @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
      font-size: 1.3rem;
    }
  }

  &:after {
    height: 2px;
    background: ${props => props.theme.palette.secondary.main};
    content: "";
    width: 0;
    position: absolute;
    transform: translateX(-50%);
    transition: width 0.4s;
    transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
    left: 50%;
    margin-top: 2rem;
    @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
      margin-top: 1.5rem;
    }
  }
  &:hover,
  &:focus {
    outline: none;
    bac: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.main};
    &:after {
      width: calc(100% - 60px);
    }
  }
`

export default NavButton
