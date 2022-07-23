import React from 'react';
import {Resume} from '../JsonResume';
import {Layout} from '../components/Layout';
import {styled} from '@mui/material';

const EducationItem = styled('li')(() => ({
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid white',
}));

const Institution = styled('h4')(() => ({
  fontWeight: 'bold',
}));

const Degree = styled('p')(() => ({
  fontWeight: 'bold',
  display: 'inline-block',
}));

const SectionTitle = styled('h3')(() => ({
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
}));

const Paragraph = styled('p')(() => ({
  whiteSpace: 'pre-wrap',
}));

export const Education = ({resume}: { resume: Resume }): JSX.Element =>
  <Layout resume={resume}>
    <div>
      <SectionTitle>Education</SectionTitle>
      <ul>
        {resume?.education?.map((education, i) => (
          <EducationItem key={i}>
            <Institution>{education.institution}</Institution>
            <div>
              <Degree>
                {education.studyType}, {education.area}
              </Degree>{' '}
              <span> &sdot; </span>
              <span>
                  {new Date(education.startDate || Date()).getFullYear()} to {new Date(education.endDate || Date()).getFullYear()}
                </span>
            </div>
            <Paragraph>{education.description?.replace('\n\n', '\n')}</Paragraph>
          </EducationItem>
        ))}
      </ul>
    </div>
  </Layout>;
