import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Resume} from '../JsonResume';
import {Me} from './Me';
import {Projects} from './Projects';
import {Work} from './Work';
import {Education} from './Education';

export const Pages = ({resume}: { resume: Resume }): JSX.Element =>
  <HashRouter>
    <Routes>
      <Route path="/" element={<Me resume={resume}/>}/>
      <Route path="/projects" element={<Projects resume={resume}/>}/>
      <Route path="/work" element={<Work resume={resume}/>}/>
      <Route path="/education" element={<Education resume={resume}/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  </HashRouter>;
