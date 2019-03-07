import styled, { keyframes } from "styled-components"

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid ${props => props.theme.palette.primary.light};
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    /* margin-bottom: 1rem; */
    font-size: 1.2rem;
  }
  input,
  textarea,
  select {
    font-size: 1.5rem;
    /* margin: 24px 0 0 0; */
    /* width: 100%;
    &:focus {
    } */
  }
  button,
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: ${props => `linear-gradient(
        to right,
        ${props.theme.palette.secondary.light} 0%,
        ${props.theme.palette.secondary.main} 50%,
        ${props.theme.palette.secondary.light} 100%
      )`};
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`

export default Form
