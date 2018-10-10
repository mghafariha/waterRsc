import React from 'react';

const LookupWid=({value,internalName,multiple,options,onChange})=>(
    <select  onChange={onChange} multiple={multiple}>
    {options.map((option, index) => (
        <option key={index} value={option.ID}  selected={value==option.ID?'selected':''} >{option.Title}</option>
    ))}

    </select>

)
export default LookupWid


