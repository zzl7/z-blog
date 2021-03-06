
import React from 'react';
import { Button, Input, Form, Icon, notification } from 'antd';
const FormItem = Form.Item;
import userModel from '$models/user';
import './index.less';


class LoginForm extends React.Component {
    constructor(props){
        super(props)

    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this); 
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
                return;
            }
            this.login(values)
            
        });
    }
    login(values){
        userModel.login(values).then((response) => {
            if(response.data.data.length){
                sessionStorage.setItem('userInfo', JSON.stringify(response.data.data));
                this.props.history.push('/pages/index');
            }else{
                notification.error({
                    message: '登录失败',
                    description: '用户名或者密码错误'
                })
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div className="login-content">
                <div className="login">
                    <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input size="large" prefix={<Icon className="login-icon" size="large" type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input size="large" prefix={<Icon className="login-icon" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                        </FormItem>
                        <FormItem>
                            <Button size="large" type="primary" className="login-btn" htmlType="submit"> 登录 </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
const Index = Form.create()(LoginForm);
export default Index;