import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment-jalaali';
import VisitForm from '../VisitForm';
import InfractionForm from '../InfractionForm';
import {addItem, setFieldValue,setItem,changeItem,setColumns} from '../../store/action';
import Field from '../Field';
import {saveItem,getItem,updateItem} from '../../api';
import {getUrlVars} from '../../Constants/functions'
import Modal from 'react-modal';
import '../../styles/style.css'


class ItemForm extends React.Component{
        constructor(props){
            super(props);
           this.state={ columns: {}}
           
        }    
        hasError=(fields)=>{
            let requiredFiels = Object.values(fields).filter((item) => (item.errorMessge))
            return requiredFiels.length != 0
        }
        checkRequired = () =>{
            let requiredFields = this.props.fields.
            filter((itm)=>
             itm.required && !this.props.item[itm.accessor]).
             map((item)=>
              ({...item, errorMessge: 'این فیلد الزامی است'}))
             
            let newFields = this.props.fields.map(col=>requiredFields.find(itm=>itm.accessor==col.accessor)?requiredFields.find(itm=>itm.accessor==col.accessor):{...col,errorMessge:''}) ;
            this.props.dispatch(setColumns(this.props.storeIndex,newFields))
            return newFields
        }
        componentDidMount=(e)=>{
           // let itmId=getUrlVars()['ID'];
            this.props.dispatch(setItem(this.props.selectedItem,this.props.storeIndex));
            
        }
        handleSubmit=(e)=>{
            e.preventDefault();
            let fields = this.checkRequired()
           
            if (this.hasError(fields)) {
            alert('در  اطلاعات وارد شده خطا وجود دارد.')

            } else {
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
                alert('آیتم جدید با موفقیت ذخیره شد');
        
                this.props.dispatch(changeItem(this.props.item,this.props.storeIndex));
                //this.getTitle.value='';
              //  this.getDescription.value='';
               this.props.dispatch(setItem({},this.props.storeIndex));
        
            }).catch((error)=>console.log(error));
        }
         
        }
    }

    render(){
    
        return (
            <form onSubmit={this.handleSubmit}>
                <h1></h1>
                <div className='form-contents'  >
               { this.props.fields.map((field,index)=>field.accessor!='ID'? <Field 
                        key={field.accessor}
                        internalName={field.accessor}
                        storeIndex={this.props.storeIndex}
                        formName={this.props.formName}
                      
                    />:null)}
                      </div>
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