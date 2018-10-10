import React from 'react';
import CheckBoxWid from '../CheckBox/widget';
import CheckBox from '../CheckBox';

class ColumnsFilter extends React.Component{
constructor(props){
    super(props);
    this.state = {
        checkedItems: new Map(),
      }
  
}
componentDidMount=(e)=>{
    
        this.setState({columns:this.props.columns});
}
handleChange=(e)=> {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }
render(){
    return(<div>
       {
          this.state.columns.map(col => (
            <label key={col.key}>
              {col.DisplayName}
              <CheckBox render={CheckBoxWid} internalName={col.name} checked={this.state.checkedItems.get(col.name)} onChange={this.handleChange} />
            </label>
          ))
        }
    </div>)
}

}

export default ColumnsFilter