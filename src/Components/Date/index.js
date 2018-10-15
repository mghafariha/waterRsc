import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment-jalaali';
import { setFieldValue } from '../../store/action'
import { isMoment } from 'moment-jalaali';

// import './calender.css'

class Date extends React.Component {
    constructor(props)
    {
        super(props); 
    }
    handleChange=(e)=>{
       console.log('date',e);
        this.props.dispatch(setFieldValue(this.props.internalName,e.toDate().toISOString(),this.props.storeIndex));
        console.log('date value',e.toDate());
    }
    render() {
        let value=this.props.item[this.props.internalName]
        return this.props.render({internalName:this.props.internalName,value,onChange:this.handleChange})
    }
}
const mapStateToProps =(state,props)=> 
(console.log('itmmm555',state.item[props.storeIndex]), 
{item:state.item[props.storeIndex],
    field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName)})

export default connect(mapStateToProps)(Date)