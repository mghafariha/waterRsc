import React from 'react';
import {connect} from 'react-redux';
import {setFieldValue} from '../../store/action';
//import Files from 'react-files'
import { Upload, message, Button, Icon } from 'antd';
import {URL} from '../../api';

//import ReactUploadFile from 'react-upload-file';

class File extends React.Component{
  
  constructor(props){
        super(props);   
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
      uploadedBundle = (info) => {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log(info);
        } else if (info.file.status === 'error') {
          console.log(info.fileList);
        }
        this.setState({
          fileList: info.fileList,
          size: +info.file.size
        })
      }
  
    render(){
        
//       let value=this.props.item[this.props.internalName]||null;
// return(
//       <Upload onChange={this.handleChange} >
//       <Button>
//       <Icon type="upload" /> Click to Upload
//       </Button>
//       </Upload>)
//         // return this.props.render({internalName:this.props.internalName,value,onChange:this.handleChange})



        const uploads = {
          action:  '/uploadedFiles',
          listType: 'picture',
          defaultFileList: [],
          onChange: this.uploadedBundle
          // customRequest: this.uploadedBundle
        };
        return (
          <div>
          <Upload {...uploads}>
            <Button className='modal-button login-form-button'>
              <Icon type="upload">Upload A Study</Icon>
            </Button>
          </Upload>
          </div>
        )
    }

     
}
const mapStateToProps=(state,props)=>(console.log('itemFile',state.item[props.storeIndex]),
  
  {item:state.item[props.storeIndex],field:state.columns[props.storeIndex].find((field)=>field.accessor==props.internalName)})
export default connect(mapStateToProps)(File);
