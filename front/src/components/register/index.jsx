import React, { Component } from 'react';
import { Input, Modal, Form, Select, Switch} from 'antd';
import './index.less';
const Option = Select.Option;

const FormItem = Form.Item;

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    confirmPassword(rule, value, callback) {
        const form = this.props.form;
        form.setFieldsValue({'password': form.getFieldValue('password')});
        if (value && value !== form.getFieldValue('password')) {
            
            callback('您两次输入的密码不一致');
        } else if ((!value && value !== '0' || !value) && form.getFieldValue('password')) {
            callback('请输入确认密码');
        } else {
            callback();
        }
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        form.setFieldsValue({'conform_assword': form.getFieldValue('conform_assword')});
        if (value && form.getFieldValue('conform_assword') && value !== form.getFieldValue('conform_assword')) {
            callback('您两次输入的密码不一致');
        } else {
            callback();
        }
    }
    illegalChar(rule, value, callback) {
        const re = /^[A-Za-z]([-A-Za-z0-9]*[-A-Za-z0-9])?(\\.[A-Za-z0-9]([-A-Za-z0-9]*[A-Za-z0-9])?)*$/;
        const re1 = /\\/g;
        if (value && !re.test(value) || (value && re1.test(value))) {
            callback('请输入非特殊字符！如字母/数字/-，且不以\"-\"、数字开头');
        } else if (!value) {
            callback('不能为空');
        } else {
            callback();
        }
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        return (
            <Modal
                title="用户注册"
                visible={this.props.showModal}
                onOk={this.props.onOk.bind(this)}
                onCancel={this.props.onCancel.bind(this)}
                okText="确认"
                cancelText="取消"
                className="userModal1">
                <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            initialValue: '',
                            rules: [{
                                validator: this.illegalChar.bind(this), required: true
                            }]
                        })(
                            <Input size="large"  maxLength="15" />
                            )}
                    </FormItem>
                    <FormItem label="" {...formItemLayout} style={{ display: 'none' }}>
                        {getFieldDecorator('hidden', {
                            initialValue: ''
                        })(
                            <Input size="large" style={{ display: 'none' }} type="text" name="txtPassword" autoComplete="off" />
                            )}
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '请输入密码!' },
                                { validator: this.checkPassword.bind(this) }
                            ]
                        })(
                            <Input size="large" type="password" name="txtPassword" autoComplete="off"  />
                            )}
                    </FormItem>

                    <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('conform_assword', {
                            initialValue: '',
                            rules: [{
                                validator: this.confirmPassword.bind(this), required: true,
                            }]
                        })(
                            <Input size="large" type="password" autoComplete="off" name="txtPassword"  />
                            )}
                    </FormItem>

                    <FormItem label="邮箱" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            initialValue: '',
                            rules: [{ required: true, type: 'email', message: '邮箱格式不对！' }]
                        })(
                            <Input size="large" />
                            )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const Index = Form.create()(ModalForm);
export default Index;