import React from 'react';
import {Layout} from '../components/Layout';
import {Resume} from '../JsonResume';
import {styled} from '@mui/material';

const WorkTitle = styled('h4')(() => ({
  fontWeight: 'bold',
}));

const JobTitle = styled('p')(() => ({
  fontWeight: 'bold',
  display: 'inline-block',
}));

const Paragraph = styled('p')(() => ({
  whiteSpace: 'pre-wrap',
}));

const WorkItem = styled('li')(() => ({
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid white',
}));

const SectionTitle = styled('h3')(() => ({
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
}));

export const Work = ({resume}: { resume: Resume }): JSX.Element =>
  <Layout resume={resume}>
    <div>
      <SectionTitle>Work</SectionTitle>
      <ul>
        {resume.work?.map((work, i) => (
          <WorkItem key={i}>
            <WorkTitle>{work.position}</WorkTitle>
            <div>
              <JobTitle>{work.name}&nbsp;</JobTitle>
              <span>{work.location}</span>
              <span> &sdot; </span>
              <span>
                  {work.endDate ? `${new Date(work.startDate || Date()).getFullYear()} to ${new Date(work.endDate || Date()).getFullYear()}` : `since ${new Date(work.startDate || Date()).getFullYear()}`}
                </span>
            </div>
            <Paragraph>{work.summary}</Paragraph>
          </WorkItem>
        ))}
      </ul>
    </div>
  </Layout>;
