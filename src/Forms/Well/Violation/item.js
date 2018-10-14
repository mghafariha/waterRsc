import React from 'react';
import {connect} from 'react-redux';
import {getItem,getItemByCode, saveItem} from '../../../api';
import TextArea from './Components/TextArea';
import TextAreaWid from '../../../Components/TextArea/widget';
import CheckBox from './Components/CheckBox';
import CheckBoxWid from '../../../Components/CheckBox/widget';

import {Criterions} from './Criterions';
import {setDetailsItem,changeItem,setItem} from '../../../store/action';
import axios from 'axios';
import ItemForm from '../../../Components/ItemForm';



class WellViolationItem extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={code:'', loadData:false}
    }
    componentDidMount=(e)=>{

        // getItem(this.props.selectedItem['Index'],this.props.profileIndex).then((result)=>{
           
        //     this.setState({profileItem:result.data});
        //     this.setState({criterions:Criterions})
        //     this.props.dispatch(setDetailsItem(Criterions.map((itm,index)=>(Object.assign({},{Criterion:itm,Description:'',isChecked:false,rowId:index}))),this.props.storeIndex));
        //     }).catch((error)=>console.log(error));
    }
    handleChangeCode=(e)=>{
      this.setState({code:e.target.value})

    }
    loadVisitProfile=(e)=>{
      axios.all([getItemByCode(this.state.code,'WellProfiles'),getItemByCode(this.state.code,'WellVisiteds')]).then(axios.spread((resultProfile,resultVisit)=>{
        this.setState({profileItem:resultProfile.data});
        this.setState({visitItem:resultVisit.data});
        console.log('visit',this.state.visitItem);
        console.log('profile',this.state.profileItem);
        this.setState({criterions:Criterions})
        this.props.dispatch(setDetailsItem(Criterions.map((itm,index)=>(Object.assign({},{Criterion:itm,Description:'',isChecked:false,rowId:index}))),this.props.storeIndex));
        this.setState({loadData:true});
        })).
        catch((error)=>console.log(error));
        
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
        return(this.props.formName=='New'? <div>

            <div>
           کد پرونده  <input onChange={this.handleChangeCode} /> <input type='button' onClick={this.loadVisitProfile} value='بارگذاری' />
            </div>
            {this.state.loadData?
           
               <table className='table-show-item' > 
                   <thead>
                       <tr>
                           <th></th><th>شناسنامه ای</th><th>بازدید</th><th>اختلاف</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                            <td>عمق چاه</td><td>{this.state.profileItem.WellDepth}</td><td>{this.state.visitItem.WellDepth}</td><td>{this.state.visitItem.WellDepth-this.state.profileItem.WellDepth}</td>
                            </tr> <tr><td> سطح آب</td><td>{this.state.profileItem.WaterSurface}</td><td>{this.state.visitItem.WaterSurface}</td><td>{this.state.visitItem.WaterSurface-this.state.profileItem.WaterSurface}</td>
                            </tr><tr><td>  دبی (لیتر در تانیه)</td><td>{this.state.profileItem.FlowWater}</td><td>{this.state.visitItem.FlowWater}</td><td>{this.state.visitItem.FlowWater-this.state.profileItem.FlowWater}</td>
                            </tr><tr><td>هدایت الکتریکی</td><td>{this.state.profileItem.EC}</td><td>{this.state.visitItem.EC}</td><td>{this.state.visitItem.EC-this.state.profileItem.EC}</td>
                       </tr>
                   </tbody>
               </table>
            : null
            }
                <br/>
            <div>
                <form onSubmit={this.handleSubmitInfraction}>
                    ثبت تخلف
                    <div className='table-show'>
                    {
                    (this.props.item)&&this.props.item.rows ?
                      this.props.item.rows.map((crt)=><div className='col-item' key={crt.rowId}>
                         <div className='col-table' ><div className='fild-row-item' >{crt.Criterion}</div><div className='fild-row-item' ><CheckBox render={CheckBoxWid} storeIndex={this.props.storeIndex} internalName='isChecked' rowID={crt.rowId}/></div><div className='fild-row-item' ><TextArea render={TextAreaWid} rowID={crt.rowId}  storeIndex={this.props.storeIndex} internalName='Description' /></div></div>
                      </div>)
                      :null
                    }
               </div>
                <button>ثبت تخلف</button>
                </form>
            </div>
        </div>:
         <div>
         <ItemForm  storeIndex={this.props.storeIndex} {...this.props} />
        
        
         </div>
        )
    }
    
    }
    const mapStateToProps=(state,props)=>({
       
        item:state.item[props.storeIndex],
       // visitItem:state.item[props.visitIndex]
    })
    export default connect(mapStateToProps)(WellViolationItem)