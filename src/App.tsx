import React, {useEffect, useState} from 'react';
import {Pages} from './pages';
import {Resume} from './JsonResume';

export const App = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  useEffect(() => {
    fetch('https://gitconnected.com/v1/portfolio/ToyVo')
      .then(res => res.json())
      .then((resume: Resume) => setResume(resume));
  }, []);

  if (!resume) {
    return <div/>;
  }

  return <Pages resume={resume}/>;
};
