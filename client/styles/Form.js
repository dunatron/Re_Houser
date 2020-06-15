import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  // padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
  .form-name {
    font-size: 22px;
    padding: 8px;
  }
  .main-fieldset {
    padding: 16px;
    margin: 0;
    border: 0;
  }
`;

export default Form;
