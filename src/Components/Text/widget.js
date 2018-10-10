import React from 'react';
const TextWid = ({ value, internalName, onChange }) => (
    <input id={internalName}
        name={internalName}
        type='text'
       
        // disabled={Disable && (Disable.indexOf('New') != -1) ? "disabled" : null}
        onChange={onChange}
        value={value || ''}
        
    />
)
export default TextWid;