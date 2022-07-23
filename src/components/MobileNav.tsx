import React from 'react';
import {Link} from 'react-router-dom';
import {Button, styled} from '@mui/material';
import {Code, Person, School, Work} from '@mui/icons-material';

const Container = styled('div')(({theme}) => ({
  display: 'none',
  height: '48px',
  backgroundColor: '#EEFFFF',
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
  '& > *': {
    flex: '1 1 25%',
  },
}));

export const MobileNav = (): JSX.Element =>
  <Container>
    <Button component={Link} to="/">
      <Person/>
    </Button>
    <Button component={Link} to="/projects">
      <Code/>
    </Button>
    <Button component={Link} to="/work">
      <Work/>
    </Button>
    <Button component={Link} to="/education">
      <School/>
    </Button>
  </Container>;
