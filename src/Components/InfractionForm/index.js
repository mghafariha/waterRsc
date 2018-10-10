import React from 'react';
import {connect} from 'react-redux';
import {getItem, saveItem} from '../../api';
import TextArea from './Components/TextArea';
import TextAreaWid from '../TextArea/widget';
import CheckBox from './Components/CheckBox';
import CheckBoxWid from '../CheckBox/widget';
import { setInfractionItem } from '../../store/action';
import {Criterions} from './Criterions';
import {setDetailsItem,changeItem,setItem} from '../../store/action';
import axios from 'axios';




class InfractionForm extends React.Component{
constructor(props){
    super(props);
    this.state={profileItem:{}
                , criterions:[] }


}
componentDidMount=(e)=>{

    getItem(this.props.selectedItem['Index'],this.props.profileIndex).then((result)=>{
       
        this.setState({profileItem:result.data});
        this.setState({criterions:Criterions})
        this.props.dispatch(setDetailsItem(Criterions.map((itm,index)=>(Object.assign({},{Criterion:itm,Description:'',isChecked:false,rowId:index}))),this.props.storeIndex));
        }).catch((error)=>console.log(error));
}
handleSubmitInfraction=(e)=>{
    e.preventDefault();
   let violations=this.props.item.rows.filter((itm)=>itm.isChecked);
   let data={NumberInFraction:violations.length,Violations:violations.reduce((acc,itm)=>acc+itm.Criterion+',','')}
   
    saveItem(data,this.props.storeIndex).then((response)=>{
      let entity=this.props.storeIndex+'Items';
      let arrayPost=[];
        violations.forEach(element => {
            let detail={ Criterion:element.Criterion,Description :element.Description,InfractionsWell:response.data.ID}
           arrayPost.push( saveItem(detail,entity));
        });
        axios.all(arrayPost).then((resp)=>
        {
            alert('آیتم جدید با موفقیت ذخیره شد');
        //  this.props.dispatch(changeItem(this.props.item,this.props.storeIndex));
        //  this.props.dispatch(setItem({},this.props.storeIndex));
        });
          
    }).catch(
        (error)=>
        console.log('error',error));
  
}
render(){
    return(<div>
       <div>
          <div>
                <span>عمق چاه</span>شناسنامه ای <span>{this.state.profileItem.WellDepth}</span>بازدید<span>{this.props.selectedItem.WellDepth}</span>اختلاف<span>{this.props.selectedItem.WellDepth}</span>
            </div>
            <div> <span> سطح آب</span>شناسنامه ای <span>{this.state.profileItem.WaterSurface}</span>بازدید<span>{this.props.selectedItem.WaterSurface}</span>اختلاف<span>{this.props.selectedItem.WaterSurface}</span>
            </div>
            <div>
            <span>DEBI</span>شناسنامه ای<span>{this.state.profileItem.DEBI}</span>بازدید<span>{this.props.selectedItem.DEBI}</span>اختلاف<span>{this.props.selectedItem.DEBI}</span>
            </div>
            <div><span>EC</span>شناسنامه ای<span>{this.state.profileItem.EC}</span>بازدید<span>{this.props.selectedItem.EC}</span>اختلاف<span>{this.props.selectedItem.EC}</span></div>
         </div>
            <br/>
        <div>
            <form onSubmit={this.handleSubmitInfraction}>
                ثبت تخلف
                {
                (this.props.item)&&this.props.item.rows ?
                  this.props.item.rows.map((crt)=><div key={crt.rowId}>
                 <span>{crt.Criterion}</span>تخلف<CheckBox render={CheckBoxWid} storeIndex={this.props.storeIndex} internalName='isChecked' rowID={crt.rowId}/> توضیحات<TextArea render={TextAreaWid} rowID={crt.rowId}  storeIndex={this.props.storeIndex} internalName='Description' />
                  </div>)
                  :null
                }
           
            <button>ثبت تخلف</button>
            </form>
        </div>
    </div>
    )
}

}
const mapStateToProps=(state,props)=>({
   
    item:state.item[props.storeIndex],
    visitItem:state.item[props.visitIndex]
})
export default connect(mapStateToProps)(InfractionForm)