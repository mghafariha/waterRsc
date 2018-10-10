import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment-jalaali';
import VisitForm from '../VisitForm';
import InfractionForm from '../InfractionForm';
import {addItem, setFieldValue,setItem,changeItem} from '../../store/action';
import Field from '../Field';
import {saveItem,getItem,updateItem} from '../../api';
import {getUrlVars} from '../../Constants/functions'
import Modal from 'react-modal';


class ItemForm extends React.Component{
        constructor(props){
            super(props);
           
        }    
        componentDidMount=(e)=>{
           // let itmId=getUrlVars()['ID'];
            this.props.dispatch(setItem(this.props.selectedItem,this.props.storeIndex));
            
        }
        handleSubmit=(e)=>{
            e.preventDefault();
           console.log('itemsave',this.props.item);
            if(!this.props.item['ID'])
            {
              saveItem(this.props.item,this.props.storeIndex).then((response)=>{
                alert('آیتم جدید با موفقیت ذخیره شد');
        
                this.props.dispatch(addItem(this.props.item,this.props.storeIndex));
                console.log('itemssssss',this.props.items)
                //this.getTitle.value='';
              //  this.getDescription.value='';
               this.props.dispatch(setItem({},this.props.storeIndex));
        
              }).catch((error)=>console.log(error));
            }
        else{
          
            updateItem(this.props.item,this.props.storeIndex).then((response)=>{
               
        
                this.props.dispatch(changeItem(this.props.item,this.props.storeIndex));
                //this.getTitle.value='';
              //  this.getDescription.value='';
               this.props.dispatch(setItem({},this.props.storeIndex));
        
            }).catch((error)=>console.log(error));
        }
         
        }

    render(){
    
        return (
            <form onSubmit={this.handleSubmit}>
                <h1></h1>
               { this.props.fields.map((field,index)=> <Field 
                        key={field.accessor}
                        internalName={field.accessor}
                        storeIndex={this.props.storeIndex}
                        formName={this.props.formName}
                      
                    />)}
                    
                    {this.props.formName!='Display'?  <button  type="submit">ذخیره</button>:null}
            </form>

        )
    }
}
const mapStateToProps=(state,props)=>({
    fields:state.columns[props.storeIndex],
    item:state.item[props.storeIndex],
    items:state.items[props.storeIndex]
})
export default connect(mapStateToProps)(ItemForm)