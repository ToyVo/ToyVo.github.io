import React from 'react';
import {Resume} from '../JsonResume';
import {Layout} from '../components/Layout';
import {Chip, styled} from '@mui/material';

const ProfileLink = styled('li')(() => ({
  marginRight: '0.5rem',
  marginBottom: '0.5rem',
  display: 'inline-block',
  fontSize: '18px',
}));

const SectionTitle = styled('h3')(() => ({
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
}));

const Paragraph = styled('p')(() => ({
  whiteSpace: 'pre-wrap',
}));

const ChipWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(0.5),
  },
}));

export const Me = ({resume}: { resume: Resume }): JSX.Element =>
  <Layout resume={resume}>
    <div>
      <SectionTitle>About Me</SectionTitle>
      <Paragraph>{resume?.basics?.summary}</Paragraph>
    </div>
    <div>
      <SectionTitle>Skills</SectionTitle>
      <ChipWrapper>
        {resume?.skills?.map(skill => (
          <Chip key={skill.name} label={skill.name}/>
        ))}
      </ChipWrapper>
    </div>
    <div>
      <SectionTitle>Profiles</SectionTitle>
      <ul>
        {resume.basics?.profiles?.map((profile, i) => (
          <ProfileLink key={profile.network}>
            {i !== 0 && ' | '}
            <a href={profile.url?.toString()} target="_blank" rel="noreferrer noopener">
              {profile.network}
            </a>
          </ProfileLink>
        ))}
      </ul>
    </div>
  </Layout>;
