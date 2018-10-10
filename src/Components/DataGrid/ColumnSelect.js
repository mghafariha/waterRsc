import React from 'react';
import {connect} from 'react-redux'
import {setAllItems,setColumns,checkedColumn} from '../../store/action';
import {getAllVisitItem} from '../../api';
import CheckBox from './CheckBox';
class ColumnSelect extends React.Component{
    constructor(props){
        super(props);

    }

    
    
    render(){
    
      let storeIndex= this.props.storeIndex;
        return(<div>{
        this.props.columns.map((col,index) => 
            <label key={col.accessor}>
              {col.Header}
              <CheckBox  internalName={col.accessor}  storeIndex={storeIndex} isChecked={col.isChecked} />
             </label> 
              
          )
         }
        
         </div>
        )
    }
}
const mapStateToProps=(state,props)=>({columns:state.columns[props.storeIndex],items:state.items[props.storeIndex]})
export default  connect(mapStateToProps)(ColumnSelect)
