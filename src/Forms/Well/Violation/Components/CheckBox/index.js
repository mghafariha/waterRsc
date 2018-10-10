import React from 'react';
import {connect} from 'react-redux';
import {changeDetailFieldValue} from '../../../../../store/action'


class CheckBox extends React.Component{

    constructor(props){
        super(props);
    }
    handleChange=(e)=>{
   this.props.dispatch(changeDetailFieldValue(this.props.internalName,e.target.checked,this.props.rowID,this.props.storeIndex))

    }
    render(){
    let value=this.props.infractionItem[this.props.internalName];
    return this.props.render({value,internalName:this.props.internalName,onChange:this.handleChange})
    }

}
const mapStateToProps=(state,props)=>(console.log('violation',state.item[props.storeIndex]),{
    
    infractionItem:state.item[props.storeIndex].rows[props.rowID]
})
export default connect(mapStateToProps)(CheckBox)

