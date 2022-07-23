import React from 'react';
import {Sidebar} from './Sidebar';
import {UserHeader} from './UserHeader';
import {MobileNav} from './MobileNav';
import {Resume} from '../JsonResume';
import {styled} from '@mui/material';

const Container = styled('div')(({theme}) => ({
  height: '100%',
  width: '100%',
  borderRadius: '0.25rem',
  display: 'flex',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const Content = styled('div')(() => ({
  padding: '0.5rem',
}));

export const Layout = ({
                         children,
                         resume,
                       }: { children: JSX.Element | JSX.Element[], resume: Resume }): JSX.Element =>
  <Container>
    <MobileNav/>
    <Sidebar/>
    <Content>
      <UserHeader resume={resume}/>
      <div>{children}</div>
    </Content>
  </Container>;
