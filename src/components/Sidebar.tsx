import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {List, ListItemButton, ListItemText, styled} from '@mui/material';

const items = [
  {name: 'Me', path: '/'},
  {name: 'Projects', path: '/projects'},
  {name: 'Work', path: '/work'},
  {name: 'Education', path: '/education'},
];

const SideNav = styled(List)(({theme}) => ({
  flex: '0 0 16rem',
  width: '16rem',
  height: '100%',
  display: 'flex',
  padding: 0,
  margin: 0,
  backgroundColor: '#EEFFFF',
  flexDirection: 'column',
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}));

export const Sidebar = (): JSX.Element => {
  const location = useLocation();

  return (
    <SideNav>
      {items.map(i => (
        <ListItemButton component={RouterLink} to={i.path}
                        selected={location.pathname === '/' && i.path === '/' ? true : location.pathname === i.path}>
          <ListItemText primary={i.name}/>
        </ListItemButton>
      ))}
    </SideNav>
  );
};
