import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import authHeader from '../services/auth-header';
import './style.css'
import React, { Component } from "react";


export default class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://itp-be-deploy.herokuapp.com/api/products/import',
        headers: authHeader(),

        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
      <div className="container">
        <div className="title">
          <h2>Chart</h2>
        </div>
        {/* {this.state.userReady?(<Table columns={columns} dataSource={data} />):null} */}
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
      </div>
    );
  }
}
