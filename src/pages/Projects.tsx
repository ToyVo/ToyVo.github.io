import React from 'react';
import {Resume} from '../JsonResume';
import {Layout} from '../components/Layout';
import {Chip, styled} from '@mui/material';

const ProjectItem = styled('li')(() => ({
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid white',
}));

const ProjectTitle = styled('h4')(() => ({
  fontWeight: 'bold',
}));

const ChipWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'left',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(0.5),
  },
}));

const SectionTitle = styled('h3')(() => ({
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
}));

export const Projects = ({resume}: { resume: Resume }): JSX.Element =>
  <Layout resume={resume}>
    <div>
      <SectionTitle>Projects</SectionTitle>
      <ul>
        {resume.projects?.map((project, i) => (
          <ProjectItem key={i}>
            <ProjectTitle>{project.name}</ProjectTitle>
            <p>{project.description}</p>
            <ChipWrapper>
              {[...project.languages || [], ...project.libraries || []].map((item) => (
                <Chip key={item} label={item}/>
              ))}
            </ChipWrapper>
          </ProjectItem>
        ))}
      </ul>
    </div>
  </Layout>;
