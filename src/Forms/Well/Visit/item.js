import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment-jalaali';
import ItemForm from '../../../Components/ItemForm';
import InfractionForm from '../../../Components/InfractionForm';
import {addItem, setFieldValue,setItem} from '../../../store/action';

import {saveItem,getItem,updateItem} from '../../../api';

import Modal from 'react-modal';


class WellVisitItem extends React.Component{
        constructor(props){
            super(props);
           
        }    
        componentDidMount=(e)=>{
            console.log('opennn');
        }
        render(){
    
            return(

                <div>
                    <ItemForm  storeIndex={this.props.storeIndex} {...this.props} />
                    {this.props.formName=='Display'? <InfractionForm visitedID={this.props.item['ID']} profileID={this.props.item['Index']} {...this.props}  visitIndex={this.props.storeIndex} profileIndex='WellProfiles' storeIndex='WellViolations' />:null}
                
                    </div>
            )
    }
}
const mapStateToProps=(state,props)=>({
    item:state.item[props.storeIndex]
})
export default connect(mapStateToProps)(WellVisitItem)