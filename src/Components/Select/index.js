import React from 'react';
import {connect} from 'react-redux';
import {setFieldValue} from '../../store/action'

class Select extends React.Component{

    constructor(props)
    {
        super(props);
        
    }
    handleChange=(e)=>{

        if (this.props.IsMulti) {
            var options = e.target.options;
            var value = "";
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value += (options[i].value) + ",";
                }
            }
            value.slice(0, -1);
            this.props.dispatch(setFieldValue(this.props.internalName,value))
        }
        else {
            this.props.dispatch(setFieldValue(this.props.internalName,e.target.value,this.props.storeIndex))
        }
    }
    componentDidMount(){

            this.props.dispatch(setFieldValue(this.props.internalName,this.props.field.Options[0],this.props.storeIndex));
            
            
    }
    render(){

        let value=this.props.item[this.props.internalName] ;
           return this.props.render({value,internalName:this.props.field.accessor,multiple:this.props.field.IsMulti,options:this.props.field.Options, onChange: this.handleChange })
    }
}
const mapStateToProps=(state,props)=>({
    item:state.item[props.storeIndex],
    field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName)
 })
 export default connect(mapStateToProps)(Select)