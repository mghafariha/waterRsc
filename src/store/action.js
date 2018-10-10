import {ADD_ITEM,SET_ALL_ITEMS,SET_FIELD_VALUE,SET_ITEM,DELETE_ITEM,UPDATE_ITEM,SET_INFRACTION_FIELD_VALUE,SET_INFRACTION_ITEM,SET_COLUMNS,CHECKED_COLUMN, SET_DETAILS_ITEM,CHANGE_DETAIL_FIELD_VALUE} from './constant';

export const addItem=(item,index)=>({

    type:ADD_ITEM,
    item,
    index
})
export const setAllItems=(index,data)=>({

    type:SET_ALL_ITEMS,
    index,data
})
export const setFieldValue=(internalName,value,index)=>({
    type:SET_FIELD_VALUE,
    field:{internalName,value},
    index:index
})
export const setInfractionFieldValue=(internalName,value)=>({
type:SET_INFRACTION_FIELD_VALUE,
field:{internalName,value}

})
export const setInfractionItem=(item)=>({
    type:SET_INFRACTION_ITEM,
    item:item
})
export const setItem=(item,index)=>({
    type:SET_ITEM,
    item:item,
    index:index
})
export const deleteItem=(item,index)=>({
    type:DELETE_ITEM,
    item,index
})
export const changeItem=(item,index)=>({
    type:UPDATE_ITEM,
    item:item,
    index:index
})
export const setColumns=(index,columns)=>({
    type:SET_COLUMNS,
     index,columns
})
export const checkedColumn=(index,isChecked,internalName)=>({

    type:CHECKED_COLUMN,
    index,
    isChecked,
    internalName
})
export const setDetailsItem=(items,index)=>({
    type:SET_DETAILS_ITEM,
    items,
    index
})
export const changeDetailFieldValue=(internalName,value,rowID,index)=>({
    type:CHANGE_DETAIL_FIELD_VALUE,
    internalName,
    value,
    rowID,
    index
})