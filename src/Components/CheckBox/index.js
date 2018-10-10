import React from 'react';
import {connect} from 'react-redux';


class CheckBox extends React.Component{

    constructor(props){
        super(props);
    }

render(){
    let value=this.props.item[this.props.internalName];
    return this.props.render({value,internalName:this.props.internalName,onChange:this.handleChange})
}

}
export default CheckBox
