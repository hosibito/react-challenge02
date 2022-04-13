import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { Reset } from 'styled-reset';
import App from './App';

ReactDOM.render(
  <React.StrictMode>   
    <RecoilRoot>    
        <Reset /> 
        <App />   
    </RecoilRoot>
  </React.StrictMode>,   
  document.getElementById('root')
);


