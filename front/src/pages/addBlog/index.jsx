import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import Remarkable from 'remarkable';
import SideBar from '../../components/sideBar';
import blogModel from '$models/blog';
import moment from 'moment';
import ReactMde, { ReactMdeTypes, ReactMdeCommands } from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";

const { Meta } = Card;
const FormItem = Form.Item;

import './index.less';
class ModalForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            blogsList: []
        }
        // this.getBlogs();
        this.userInfo = sessionStorage.getItem("userInfo") ?
            JSON.parse(sessionStorage.getItem("userInfo")) : []
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
    addBlog() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            
            let params = {
                body: values.body.text,
                author: this.userInfo[0].userName,
                title: values.title,
                imgUrl: 'asg.jpg',
                iconurl: 'sdsd.jpg'
            }
            blogModel.addBlog(params).then((response) => {
                if (response.data.data === 'success') {
                    message.success('发表成功');
                    this.props.history.push('/pages/manager');
                    this.props.form.resetFields();
                    
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
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        return (
            <div className="add-blog">
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
                    <FormItem label="内容" {...formItemLayout}>
                        {getFieldDecorator('body', {
                            initialValue: '',
                            rules: [{
                                required: true
                            }]
                        })(
                            <ReactMde
                                commands={ReactMdeCommands.getDefaultCommands()}
                                showdownOptions={{ tables: false, simplifiedAutoLink: false }}
                            />
                            )}
                        <div className="btn-content"><Button className="btn" onClick={this.addBlog.bind(this)}>发表</Button></div>
                    </FormItem>

                </Form>

            </div>

        )
    }
}
const Index = Form.create()(ModalForm);
export default Index