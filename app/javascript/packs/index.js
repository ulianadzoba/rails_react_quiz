import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {BrowserRouter, Route} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'; 

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
    ,
    document.body.appendChild(document.createElement('div')),
  )
})
