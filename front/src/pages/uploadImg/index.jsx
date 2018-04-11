import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, message, Upload, Icon } from 'antd';
// import Remarkable from 'remarkable';
// import SideBar from '../../components/sideBar';
import photoModel from '$models/photo';
// import moment from 'moment';
// import ReactMde, { ReactMdeTypes, ReactMdeCommands } from 'react-mde';
// import "react-mde/lib/styles/css/react-mde-all.css";

const { Meta } = Card;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

import './index.less';
class ModalForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            blogsList: [],

        }
        // this.getBlogs();
        this.userInfo = sessionStorage.getItem("userInfo") ?
            JSON.parse(sessionStorage.getItem("userInfo")) : []
        this.pathList = [];
    }
    componentDidMount() {
        // this.setState({
        //     content: this.renderMarkdown(content)
        // });
    }
    // getBlogs() {
    //     blogModel.getBlogs().then((response) => {
    //         this.setState({
    //             blogsList: response.data.data ? response.data.data : []
    //         });
    //     })
    // }
    photo() {
        this.props.form.validateFields((err, values) => {
            console.log('values', values)
            if (err) {
                return
            }
            console.log(values, 'values');
            let params = {
                body: values.body,
                author: this.userInfo[0].userName,
                title: values.title,
                url: this.pathList
            };
            photoModel.photo(params).then((response) => {
                if (response.data.data === 'success') {
                    this.props.history.push('/pages/photo');
                    message.success('发表成功');
                    // this.props.history.push('/pages/manager');
                    // this.props.form.resetFields();
                }
            })
        })

    }
    renderMarkdown(source) {
        this.options = {
            html: true
        };
        if (!this.md) {
            this.md = new Remarkable(this.options);
        }
        return this.md.render(source);
    }
    fileChange(res) {
        this.pathList = res.fileList.map(record => {
            return record.response && record.response.data ? record.response.data.path : '';            
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        let fileList = [];
        let props = {
            action: '/v1/photo/upload',
            listType: 'picture',
            defaultFileList: [...fileList],
            multiple: true,
            className: 'upload-list-inline',
            onChange: this.fileChange.bind(this)
        };
        return (
            <div className="upload-img">
                <Form layout="horizontal">
                    <FormItem label="标题" {...formItemLayout}>
                        {getFieldDecorator('title', {
                            initialValue: '',
                            rules: [{
                                required: true
                            }]
                        })(
                            <Input size="large" />
                            )}
                    </FormItem>
                    <FormItem label="描述" {...formItemLayout}>
                        {getFieldDecorator('body', {
                            initialValue: '',
                            rules: [{
                                required: true
                            }]
                        })(
                            <Input size="large" />
                            )}
                    </FormItem>
                    <FormItem label="上传照片" {...formItemLayout}>
                        {getFieldDecorator('fileList', {
                            initialValue: '',
                            rules: [{
                                required: true
                            }]
                        })(
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">点击或者拖拽到这里上传</p>
                            </Dragger>
                            )}
                        <div className="btn-content"><Button className="btn" onClick={this.photo.bind(this)}>发表</Button></div>
                    </FormItem>

                </Form>

            </div>

        )
    }
}
const Index = Form.create()(ModalForm);
export default Index