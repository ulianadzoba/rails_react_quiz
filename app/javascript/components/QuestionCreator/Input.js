import React from 'react';
import './Input.css';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text';

  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className='input-field'>
      <div className='input-label'> 
          <label htmlFor={htmlFor}>{props.label}</label>
      </div>
      <div className='input'>
          <input
            type={inputType}
            id={htmlFor}
            value={props.value}
            onChange={props.onChange}
         />
      </div>

      {
        isInvalid(props)
          ? <div className='error-message'>{props.errorMessage || 'Input correct value'}</div>
          : null
      }
    </div>
  )
}

export default Input;