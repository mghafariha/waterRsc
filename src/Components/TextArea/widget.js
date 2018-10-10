import React from 'react'
const TextAreaWid=({value,internalName,onChange})=>(

    <textarea id={internalName}
    value={value}
    onChange={onChange}/>
)
export default TextAreaWid