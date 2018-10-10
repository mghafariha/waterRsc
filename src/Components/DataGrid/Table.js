import React from 'react'
import {connect} from 'react-redux';
import {moment} from 'moment-jalaali';
import ItemRow from '../ItemRow';
import ItemForm from '../ItemForm';
import {getAllVisitItem,removeItem} from '../../api';
import {setAllItems,deleteItem,setItem} from '../../store/action'
import 'react-table/react-table.css';
import Modal from 'react-modal';
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";

Modal.setAppElement('#root');
const customStyles = {
  content : {
  top                   : '50%',
  left                  : '50%',
  right                 : 'auto',
  bottom                : 'auto',
  marginRight           : '-50%',
  transform             : 'translate(-50%, -50%)'
  }
  }

  class Table extends React.Component{

    constructor(props){
        super(props);
        this.state={column:[], 
          showModal: false,
          selectedItem:{},formName:'',
          showWorkflowModal:false
        }
    }

    handleClick(event) {  // switch the value of the showModal state
      this.setState({
        showModal: !this.state.showModal
      });
    }
    handleOpenModal =(e)=> {
      this.setState({ showModal: true });
    }
    
    handleCloseModal =(e)=> {
      this.setState({ showModal: false });
      this.props.dispatch(setItem({},this.props.storeIndex));
      this.setState({selectedItem:{}})
    }
    removeClick=(row)=>{
     removeItem(row['ID']).then((response)=>{
     this.props.dispatch(deleteItem(row))
      }).catch((e)=>console.log(e))
    }
  componentDidMount=(e)=>{

  
        this.setState({itemIndex:this.props.itemIndex})
       
      //  this.setState({datasource:this.props.items.map((itm,index)=>({...itm,key:index}))})   ;
     
  }
  render(){


    // const TagName = this.components[this.props.itemIndex || 'foo'];
   
    Object.assign(ReactTableDefaults, {
      defaultPageSize: 5,
      minRows: 3
      // etc...
    });

   


 let columns = this.props.columns.filter(col=>col.isChecked)
 columns.push({
  Header: 'عملیات',
  id: 'action',
 // accessor:  props => <div> {moment(props.value).format('YY/MM/DD')} </div>
 accessor:'Action',
 Cell: row => (
   <span>
      <button onClick={ ()=> {this.setState({ showModal: true,selectedItem:row.original,formName:'Display' });}}>نمایش</button>
      { this.props.showEdit ?<button onClick={ ()=> {this.setState({ showModal: true,selectedItem:row.original,formName:'Edit' });}}>ویرایش</button>:null}
      { this.props.showRemove? <button onClick={()=> { removeItem(row.original['ID'],this.props.storeIndex).then((response)=>{
                                                                this.props.dispatch(deleteItem(row.original,this.props.storeIndex))
     }).catch((e)=>console.log(e))}} >حذف</button> :null  }

     {this.props.workFlow? <button onClick={()=>{this.setState({showModalWorkflow:true,selectedItem:row.original});}}>ورک فلو</button>:null}                                                           
</span>
) 

})
  return(
     <div>
        <ReactTable
              data={this.props.items.map((itm,index)=>({...itm,key:index}))}
              noDataText="اطلاعاتی وجود ندارد"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={columns}
              className="-striped -highlight"
          />
          {(this.props.showNew)? <button   onClick={ ()=> {this.setState({ showModal: true,formName:'New'});}}>مورد جدید</button>:null}

           <div>
                <Modal 
                   isOpen={this.state.showModal}
                   contentLabel="onRequestClose Example"
                   onRequestClose={this.handleCloseModal}
                >
                  <this.props.itemIndex formName={this.state.formName} selectedItem={this.state.selectedItem} storeIndex={this.props.storeIndex}/>
                  <button onClick={this.handleCloseModal}>بستن</button>
                </Modal>
              </div>
             <div>
               <Modal
                  isOpen={this.state.showModalWorkflow}
                  contentLabel="onRequestClose Example"
                  onRequestClose={this.handleCloseModal}
               >
                 <this.props.workFlow selectedItem={this.state.selectedItem} storeIndex={this.props.storeIndex}/>
                  <button onClick={this.handleCloseModal}>بستن</button>
               </Modal> 
               </div>
      </div>
      //  <BootstrapTable   
      
      //     pagination={true}
      //     search={true}
      //     selectRow={this.state.selectRowProp} data={ this.state.datasource } columns={this.state.columns }  filter={ filterFactory() }
      //     keyField='ID' 
      //     /> 
       
  )

  }

}
const mapStateToProps=(state,props)=>({columns:state.columns[props.storeIndex],items:state.items[props.storeIndex]})
export default connect(mapStateToProps)(Table)