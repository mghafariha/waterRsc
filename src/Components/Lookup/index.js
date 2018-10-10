import React from 'react';
import {connect} from 'react-redux';
import {setFieldValue} from '../../store/action';
import {getAllItem} from '../../api';
 class Lookup extends  React.Component{
constructor(props){
     super(props);
     this.state={
         options:[],
         value:0
     }
}
    handleChange = (e) => {
        console.log('change', e.target.value)
        console.log('sdfsdfsf', this.props.field)

        // if (this.props.multiple) {
        //     var options = e.target.options;
        //     var value = "";
        //     for (var i = 0, l = options.length; i < l; i++) {
        //         if (options[i].selected) {
        //             value += (options[i].value) + ",";
        //         }
                
        //     }
        //     value.slice(0, -1);
        //     this.props.dispatch(changeField(this.props.internalName,value))
        // }
        // else {
            this.props.dispatch(setFieldValue(this.props.internalName,e.target.value,this.props.storeIndex))
              
    }

componentDidMount(){

    let field=this.props.field;
    
    getAllItem(field.Options[0],'ID,'+this.props.field.TitleField).then((result)=>{

       this.setState({options:result.data});
        console.log('options',result);
        this.props.dispatch(setFieldValue(this.props.internalName,this.state.options[0].ID,this.props.storeIndex));

    })

  

}
render(){
    let value=this.props.item[this.props.internalName];
  return this.props.render({value,internalName:this.props.field.accessor,multiple:this.props.field.IsMulti,options:this.state.options, onChange: this.handleChange })
}

 }
 const mapStateToProps=(state,props)=>({
    item:state.item[props.storeIndex],
    field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName)
 })
 export default connect(mapStateToProps)(Lookup)

