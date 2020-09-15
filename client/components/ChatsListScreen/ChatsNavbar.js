import React from 'react';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import { SITE_NAME } from '@/Lib/const';

const Container = styled(Toolbar)`
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
`;

const ChatsNavbar = () => <Container>{SITE_NAME} Chat Board</Container>;

export default ChatsNavbar;
