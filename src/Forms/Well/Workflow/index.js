import React from 'react';
import {connect} from 'react-redux'
import { Checkbox } from '../../../../node_modules/antd';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { updateItem } from '../../../api';
import {changeItem,setItem} from '../../../store/action';


class WellWorkFlow extends React.Component{

 constructor(props){
    super(props);

 }
 componentDidMount=(e)=>{
      // let itmId=getUrlVars()['ID'];
       this.props.dispatch(setItem(this.props.selectedItem,this.props.storeIndex));
       
   }
 handleSubmit=(e)=>{
       e.preventDefault();
       updateItem(this.props.item,this.props.storeIndex).then((response)=>{
        this.props.dispatch(changeItem(this.props.item,this.props.storeIndex));
      
       this.props.dispatch(setItem({},this.props.storeIndex));
       })
 }
 render(){
     return (<form onSubmit={this.handleSubmit}>
               <div>
            
                <StepOne isChecked={true}/>
               </div>
              
               <div>
              
                <StepTwo/>
               </div> 
               <div>
              
                <StepThree/>
               </div>
               <button type='submit'>submit</button>
             </form>)
 }
}
const mapStateToProps=(state,props)=>({

 item:state.item[props.storeIndex]

})
export default connect(mapStateToProps)(WellWorkFlow)
