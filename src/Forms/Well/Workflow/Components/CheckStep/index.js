import React from 'react'
class CheckStep extends React.Component{

    constructor(props){
         super(props);
    }
    handleChange=(e)=>{
        let value=e.target.value;
        if(value==true)
    }
    render(){
        return (<input type='checkbox'
        internalName={this.props.internalName}
       
        checked={this.props.isChecked}

        />)
    }

}
export default CheckStep