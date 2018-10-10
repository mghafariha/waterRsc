import React from 'react'
import Field from '../../../Components/Field';
class StepThree extends React.Component{

    constructor(props){
        super(props);
        this.state={showFields:false}
    }
    handleChange=(e)=>{

      this.setState({showFields:e.target.checked})
    }
    render(){
       
        const fields=[{accessor:'FileClosed',Header:'فایل مختومه',type:'File',isRequired:'True'},{accessor:'DateClosed',Header:'تاریخ مختومه شدن',type:'DateTime','isRequired':'True'}]
        return(<div>
         اخطار سوم <input type='checkbox' onChange={this.handleChange} />
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
export default StepThree