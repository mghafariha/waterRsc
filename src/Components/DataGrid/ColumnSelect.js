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
        return(<div  className='check-box-items'>{
        this.props.columns.map((col,index) => 
            <div className='check-item' key={col.accessor}>
              {col.Header}
              <CheckBox  internalName={col.accessor}  storeIndex={storeIndex} isChecked={col.isChecked} />
             </div> 
              
          )
         }
        
         </div>
        )
    }
}
const mapStateToProps=(state,props)=>(console.log('columns4',state.columns[props.storeIndex]),{columns:state.columns[props.storeIndex],items:state.items[props.storeIndex]})
export default  connect(mapStateToProps)(ColumnSelect)
