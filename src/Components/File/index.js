import React from 'react';
import {connect} from 'react-redux';
import {setFieldValue} from '../../store/action';
//import Files from 'react-files'
// import { Upload, message, Button, Icon } from 'antd';
import ReactDropzone from 'react-dropzone';
import {URL} from '../../api';
import request from "superagent";
//import ReactUploadFile from 'react-upload-file';

class File extends React.Component{
  
  constructor(props){
        super(props);   
    }
    onDrop= acceptedFiles => {
      // acceptedFiles.forEach(file => {
      //     const reader = new FileReader();
      //     reader.onload = () => {
      //         const fileAsBinaryString = reader.result;
      //         // do whatever you want with the file content
      //     };
      //     reader.onabort = () => console.log('file reading was aborted');
      //     reader.onerror = () => console.log('file reading has failed');
  
      //     reader.readAsBinaryString(file);
      // });
  }
    // handleChange=(info) =>{
    // console.log('file',info.file);
    //   // const reader = new FileReader();
    //   // reader.onloadend = (obj) => {
    //   //   this.imageDataAsURL = obj.srcElement.result;
    //   //   const fileAsBinaryString = reader.result;
    //   // };
    //   // reader.readAsDataURL(info.file.originFileObj);
    // // this.props.dispatch(setFieldValue(this.props.internalName,reader.readAsDataURL(info.file.originFileObj),this.props.storeIndex));
    //   }
     
  
    render(){
     
        return (
          <div className="app">
            <ReactDropzone
              onDrop={this.onDrop}
            >
              Drop your best gator GIFs here!!
            </ReactDropzone>
          </div>
        );
      }
//       let value=this.props.item[this.props.internalName]||null;
// return(
//       <Upload onChange={this.handleChange} >
//       <Button>
//       <Icon type="upload" /> Click to Upload
//       </Button>
//       </Upload>)
//         // return this.props.render({internalName:this.props.internalName,value,onChange:this.handleChange})

}
const mapStateToProps=(state,props)=>(console.log('itemFile',state.item[props.storeIndex]),
  
  {item:state.item[props.storeIndex],field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName)})
export default connect(mapStateToProps)(File);
