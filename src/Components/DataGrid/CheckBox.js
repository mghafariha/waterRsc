import React from 'react'
import {connect} from 'react-redux'
import {checkedColumn} from '../../store/action';

class CheckBox extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange=(e)=>{

        const internalName= e.target.name;
        const isChecked = e.target.checked;
        this.props.dispatch(checkedColumn(this.props.storeIndex,isChecked,internalName));
       // this.setState(prevState => ({ checkedItems: prevState.checkedColumns.set(item, isChecked) }));
        
      }


    render(){
        return (<input id={this.props.internalName}
    name={this.props.internalName}
    type='checkbox'
    
    onChange={this.handleChange} 

    checked={this.props.isChecked}
     />
    
    )
    }
} 
const mapStateToProps=(state,props)=>({columns:state.columns[props.storeIndex]})
export default connect(mapStateToProps)(CheckBox)
    