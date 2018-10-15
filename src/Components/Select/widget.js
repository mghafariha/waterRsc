import React from 'react';

const SelectWid=({value,internalName,multiple,options,onChange})=>(
    <select id={internalName}
           onChange={onChange}
           multiple={multiple}
           name={internalName}
          
    >
    <option value={null}>----</option>
    {options.map((opt,index)=>(<option key={index} value={opt} selected={opt==value?'selected':''} >{opt}</option>))}

    </select>
)
export default SelectWid



