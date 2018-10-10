import React from 'react';
import {connect} from 'react-redux';
import {moment} from 'moment-jalaali';
import ItemRow from '../ItemRow';
import ItemForm from '../ItemForm';
import {getAllVisitItem,removeItem} from '../../api';
import {setAllItems,deleteItem} from '../../store/action'
import 'react-table/react-table.css';
import Modal from 'react-modal';
import ColumnsFilter from '../ColumnsFilter';

// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
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
  };
class AllItems extends React.Component{

    constructor(props){
        super(props);
        this.state={column:[], 
          showModal: false,
          selectedItem:{},formName:''
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
    }
    removeClick=(row)=>{
     removeItem(row['ID']).then((response)=>{
     this.props.dispatch(deleteItem(row))
      }).catch((e)=>console.log(e))
    }
   
  componentDidMount=(e)=>{

    getAllVisitItem().then((response)=>{
        
        this.props.dispatch(setAllItems((response.data)));
      
       this.setState({datasource:this.props.items.map((itm,index)=>({...itm,key:index}))})   ;
       console.log('datasource',this.state.datasource);
      this.setState({columns:[{'Header':'شناسه','accessor':'ID'},{'Header':'طول جغرافیایی','accessor':'LongitudeWell'},{'Header':'عرض جغرافیایی','accessor':'LatitudeWell'},{'Header':'DateCensus','accessor':'DateCensus'},{'Header':'کد مالک','accessor':'OwnerCode'},{'Header':'موبایل مالک' ,'accessor':'OwnerMobile'},
      {'Header':'حجم مجاز برداشت(متر مکعب در سال)','accessor':'ApprovedVolume'},{'Header':'ساعت کارکرد سالانه' ,'accessor':'WorkHours'},{'Header':'میزان قدرت(برق)' ,'accessor':'PowerlevelElectricity'},{'Header':'میزان قدرت (دیزل)'  ,'accessor':'PowerlevelDiesel'},{'Header':'نوع مصرف آب بر اساس پرونده بهره برداری'  ,'accessor':'KindConsumptionWater'},{'Header':'لوله جدار' ,'accessor':'KindPipeline'}]})
     

    })
  }
    render(){
      
        Object.assign(ReactTableDefaults, {
            defaultPageSize: 5,
            minRows: 3
            // etc...
          });
        const columns = [{
            Header: 'ID',
            accessor: 'ID' // String-based value accessors!
          }, {
            Header: 'طول جغرافیایی',
            accessor: 'LongitudeWell',
           
          },{
            Header: 'عرض جغرافیایی',
            accessor: 'LatitudeWell',
           
          },{
            Header: 'DateCensus',
            id: 'DateCensus',
           // accessor:  props => <div> {moment(props.value).format('YY/MM/DD')} </div>
           accessor:'DateCensus'
          },{
            Header: 'عملیات',
            id: 'action',
           // accessor:  props => <div> {moment(props.value).format('YY/MM/DD')} </div>
           accessor:'Action',
           Cell: row => (
             <span>
           <button onClick={ ()=> {this.setState({ showModal: true,selectedItem:row.original,formName:'Display' });}}>نمایش</button>
            <button onClick={ ()=> {this.setState({ showModal: true,selectedItem:row.original,formName:'Edit' });}}>ویرایش</button>
           <button onClick={()=> {removeItem(row.original['ID']).then((response)=>{
                                                                          this.props.dispatch(deleteItem(row.original))
                                                                            }).catch((e)=>console.log(e))}} >حذف</button>
                                                                                
           <div>
                <Modal 
                   isOpen={this.state.showModal}
                   contentLabel="onRequestClose Example"
                   onRequestClose={this.handleCloseModal}
                >
                  <ItemForm formName={this.state.formName} selectedItem={this.state.selectedItem}/>
                  <button onClick={this.handleCloseModal}>بستن</button>
                </Modal>
              </div>
          
          </span>
          ) 
          
          }
        ]




       
        return(
           <div>
             <ColumnsFilter  columns={this.state.columns} 
                        onChange={(values) => this.onChange(this.state.columns, values)}
                        
                      /> 
              <ReactTable
                    data={this.props.items.map((itm,index)=>({...itm,key:index}))}
                    noDataText="اطلاعاتی وجود ندارد"
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value}
                    columns={columns}
                    className="-striped -highlight"
                />
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


const mapStateToProps=(state)=>({
    items:state.items
})
export default connect(mapStateToProps)(AllItems)


