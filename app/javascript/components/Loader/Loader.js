import React from 'react';
import './Loader.css';

const Loader = props => (
  <div className='loader'>
    <div className='lds-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  </div>
)

export default Loader;