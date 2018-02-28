
import React from 'react';
import { Button, Input, Form, Icon } from 'antd';
const FormItem = Form.Item;
import './index.less';
class LoginForm extends React.Component {
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div className="login-content">
                <div className="login">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input size="large" prefix={<Icon size="large" type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input size="large" prefix={<Icon size="large" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                        </FormItem>
                        <FormItem>
                            <Button size="large" type="primary" htmlType="submit"> 登录 </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
const Index = Form.create()(LoginForm);
export default Index;