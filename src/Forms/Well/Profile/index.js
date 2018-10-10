import React from 'react';
import {connect} from 'react-redux'
import {setAllItems,setColumns} from '../../../store/action';
import {getAllItem,getMetaData} from '../../../api';
import ColumnSelect from '../../../Components/DataGrid/ColumnSelect'
import Table from '../../../Components/DataGrid/Table';
import WellVisitItem from './item';
import {fields} from './fields';
import axios from 'axios';


class WellProfile extends React.Component{
    constructor(props){
        super(props);

    }
    handleClick=()=>{

    }
   
    componentDidMount(){  
        axios.all([getAllItem('WellProfiles'),getMetaData(1)]).then(axios.spread((response,columns)=>{
        
            this.props.dispatch(setAllItems('WellProfiles',response.data));
        //    const col=[... columns.data.map(itm=>Object.assign({},{Header:itm.DisplayName,accessor:itm.Name,type:itm.Type,required:itm.Required,IsMulti:itm.IsMulti,Options:itm.Options})),{Header:'فایل',accessor:'File1',type:'File',required:'false',IsMulti:false,Options:null}];
         
            this.props.dispatch(setColumns('WellProfiles',columns.data.map((itm,index)=>Object.assign({},{Header:itm.DisplayName,accessor:itm.Name,type:itm.Type,required:itm.Required,IsMulti:itm.IsMulti,Options:itm.Options?itm.Options.split(';'):null,TitleField:itm.TitleField?itm.TitleField:null,isChecked:(index<5?true:false)}))));
                                                                                                                                                                                                                                              
           }));

    }
    render(){

        return(<div>
            <ColumnSelect  storeIndex='WellProfiles' {...this.props} />
            <Table   itemIndex={WellVisitItem} storeIndex='WellProfiles' {...this.props} showEdit={true} showRemove={true} showNew={true}  /> 

           
            </div>)
    }
}
const mapStateToProps=(state)=>({columns:state.columns['WellProfiles'],items:state.items['WellProfiles']})
export default  connect(mapStateToProps)(WellProfile)
