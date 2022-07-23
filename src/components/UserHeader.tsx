import React from 'react';
import {Resume} from '../JsonResume';
import {Button, styled} from '@mui/material';
import {ArrowRightAlt} from '@mui/icons-material';

const ResumeImage = styled('img')(() => ({
  width: '200px',
  height: '200px',
  marginRight: '1rem',
  borderRadius: '2px',
}));

const Header = styled('div')(({theme}) => ({
  display: 'flex',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const HeaderContainer = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    '&.isNotHome': {
      display: 'none',
    },
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    flexWrap: 'wrap',
  },
}));

export const UserHeader = ({resume}: { resume: Resume }): JSX.Element =>
  <HeaderContainer>
    <Header>
      <ResumeImage src={resume.basics?.image} alt="resume"/>
      <div>
        <h2>{resume.basics?.name}</h2>
        <h4>
          <a
            href={`https://gitconnected.com/${resume.basics?.username}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            @{resume.basics?.username}
          </a>
        </h4>
        <p>{resume.basics?.label}</p>
        <p>Coding in {resume.basics?.location?.region}</p>
        <p>{resume.basics?.yearsOfExperience} years of experience as a developer</p>
        <p>{resume.basics?.headline}</p>
      </div>
    </Header>
    <div>
      <Button
        href={`https://gitconnected.com/${resume.basics?.username}/resume`}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="primary">
        View Résumé <ArrowRightAlt/>
      </Button>
    </div>
  </HeaderContainer>;
