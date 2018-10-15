import React from 'react';
import {connect} from 'react-redux';
import Label from '../Label';
import NumberWid from '../Number/widget';
import Number from '../Number';
import TextWid from '../Text/widget';
import Text from '../Text';
import Span from '../Span';
import DateWid from '../Date/widget';
import Date from '../Date';
import SelectWid from '../Select/widget';
import Select from '../Select';
import TextAreaWid from '../TextArea/widget';
import TextArea from '../TextArea';
import CheckBoxWid from '../CheckBox/widget';
import CheckBox from '../CheckBox';
import FileWid from '../File/widget';
import File from '../File';
import LookupWid from '../Lookup/widget';
import Lookup from '../Lookup';


class Field extends React.Component{
  
   render() {
   
    let formName=this.props.formName;
    let { accessor, type , Header,errorMessge } = this.props.fields.find((field)=>field.accessor==this.props.internalName)
   // console.log(this.props.internalName, this.props.fields)
    return (<div className='field-item' >
        <fieldset className={this.props.uniqueName} >

            <Label value={Header} htmlFor={this.props.internalName} />
            <div>
                {(() => {
                    switch (type) {

                        case 'String':
                        return (
                            <div className='item-view'>
                              {formName!=='Display' ? <Text render={TextWid} internalName={this.props.internalName} storeIndex={this.props.storeIndex} /> :
                              <Span internalName={this.props.internalName} value={this.props.item[accessor]} />}
                            </div>
                          );
                        case 'Int32':
                        case 'Decimal':
                            return (
                                <div className= 'item-view' >
                                    {formName!=='Display'?<Number render={NumberWid} internalName={this.props.internalName}  className={'input input-' + this.props.InternalName} storeIndex={this.props.storeIndex} />:
                                    <Span internalName={this.props.internalName} value={this.props.item[accessor]} /> }
                                </div>
                            ) 
                           case 'DateTime':
                          
                            return(
                            <div className='item-view'>
                                {formName!=='Display' ? <Date render={DateWid} internalName={this.props.internalName} className={'input input-' + this.props.InternalName} storeIndex={this.props.storeIndex}/> :
                                <Span internalName={this.props.internalName} value={this.props.item[accessor]} /> } 
                            </div>
                            ) 
                         case 'Select':
                                return ( 
                                <div className='item-view' >
                                {formName!=='Display'? <Select
                                render={SelectWid}
                                    internalName={this.props.internalName}
                                    className={'input input-' + this.props.InternalName}
                                    storeIndex={this.props.storeIndex}
                                   
                                />: 
                                <Span internalName={this.props.internalName} value={this.props.item[accessor]} />}
                                 </div>
                            )
                         case 'MultiChoice':
                                return(<div className='item-view'>
                                    {formName!=='Display'?
                                    <Select
                                render={SelectWid}
                                    internalName={this.props.internalName}
                                    className={'input input-' + this.props.InternalName}
                                    storeIndex={this.props.storeIndex}
                                />:
                                <Span internalName={this.props.internalName} value={this.props.item[accessor]} />}

                                </div>
                                )
                                case 'Lookup' :
                                return(<div>
                                    {formName!=='Display'?
                                    <Lookup
                                    render={LookupWid}
                                    internalName={this.props.internalName}
                                    className={'input input'+this.props.InternalName}
                                    storeIndex={this.props.storeIndex}
                                     />:
                                     <Span internalName={this.props.internalName} value={this.props.item[accessor]}  />
                                     }
                                </div>)
                         case 'Note':
                           return(
                           <div>
                           {formName!=='Display' ? <TextArea render={TextAreaWid} internalName={this.props.internalName}  className={'input note' + this.props.InternalName} storeIndex={this.props.storeIndex} /> :
                            <Span internalName={this.props.internalName} value={this.props.item[accessor]}  />}
                            </div>)
                           
                         
                        case 'Boolean':
                             return(<div>
                                {formName!=='Display'? <CheckBox render={CheckBoxWid} 
                             internalName={this.props.internalName}
                             className={'input input-' + this.props.InternalName}
                             storeIndex={this.props.storeIndex}
                             />:
                             <Span internalName={this.props.internalName} value={this.props.item[accessor]} />}
                             </div>
                             )
                             case 'File':
                             console.log('storeIndex')
                             return(<div>
                                 {formName!=='Display'?<File render={FileWid} 
                                 internalName={this.props.internalName} 
                                 className={'input input-'+ this.props.InternalName}
                                  storeIndex={this.props.storeIndex} />
                                 :
                                 <Span internalName={this.props.internalName} value={this.props.item[accessor]}/>}
                             </div>
                             )

                    }
                })()}
                <span style={{color: 'red'}}>{errorMessge || ''}</span>
            </div>


        </fieldset>
</div>
    );

}


}
const mapStateToProps=(state,props)=>(
    {field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName),fields:state.columns[props.storeIndex],item:state.item[props.storeIndex]} )                                     
export default connect(mapStateToProps)(Field)