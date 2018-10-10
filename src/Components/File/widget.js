import React from 'react'

import { Upload, message, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
 const FileWid=({internalName,onChange})=>(
        <Upload onChange={this.onChange} >
                <Button>
                <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>

 )
 export default FileWid