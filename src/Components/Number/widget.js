import React from 'react';
 const NumberWid=({value,internalName,onChange})=>(

    <input id={internalName}
    name={internalName}
    type='number'
    
    onChange={onChange}
    value={value || ''}
   
/>
 )
 export default NumberWid