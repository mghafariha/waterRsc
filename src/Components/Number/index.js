import React from 'react';
import {connect} from 'react-redux';
import { setFieldValue } from '../../store/action';

class Number extends React.Component {

    constructor(props) {
        super(props);
        this.state={value:''}
    }
    // if not arrow function you should bind handleChange in constructor => this.handleChange =  this.handleChange.bind(this)
    handleChange=(e)=>{
       this.props.dispatch(setFieldValue(this.props.internalName,e.target.value,this.props.storeIndex));
    }
   
        render() {
            let value=this.props.item[this.props.internalName];
            return this.props.render({value,internalName:this.props.internalName,onChange:this.handleChange})
        } 
}
const mapStateToProps=(state,props)=>(console.log('itemmmm',state.item[props.storeIndex]), {
    item:state.item[props.storeIndex],
    field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName)
})
export default connect(mapStateToProps)(Number)