import React from 'react';
import {connect} from 'react-redux';
import Field from '../../../Components/Field';


  class StepOne extends React.Component{
    constructor(props){

        super(props);
        this.state={showFields:false}
    }
    handleChange=(e)=>{

      this.setState({showFields:e.target.checked})
    }

    render(){

       const fields=[{accessor:'FileFirstWarning',Header:'فایل اخطار اول',type:'File',isRequired:'True'},{accessor:'DateFirstWarning',Header:'تاریخ اخطار اول',type:'DateTime','isRequired':'True'}]
      return(<div>
       اخطار اول <input type='checkbox' onChange={this.handleChange} />
         { this.state.showFields?  <div >
          { fields.map((field,index)=><Field 
            key={field.accessor}
            internalName={field.accessor}
            storeIndex='WellViolations'
            formName='New'
        
          />)}
          </div>:null}
          </div>)
        
    }
  }
  const mapStateToProps=(state,props)=>({
    columns:state.columns['WellViolations'],item:state.item['WellViolations']
  })
  export default StepOne