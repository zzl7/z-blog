import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Card, Input, Icon, message, notification } from 'antd';
const { Meta } = Card;
const Search = Input.Search;

import './index.less';
import IndexPage from '../index'
import BlogDetail from '../blogDetail'
import Photo from '../photo';
import About from '../about';
import Manager from '../manager';
import Tour from '../tour';
import AddBlog from '../addBlog';
import UploadImg from '../uploadImg';
import Register from '../../components/register';
import history from 'history/createBrowserHistory';
import userModel from '$models/user';

class index extends React.Component {
    constructor(props) {
        super(props)
        this.beforeScrollTop = 0;
        this.afterScrollTop = 0;
        this.state = {
            scrollDire: '',
            visible: false,
            activeIndex: 1
        };
        this.userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : []
        console.log(this.userInfo, 'this.userInfo');
    }
    componentDidMount() {
        this.refs.layoutRef.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        });
        this.beforeScrollTop = this.refs.layoutRef.scrollTop;
    }
    handleScroll(e) {
        this.afterScrollTop = e.target.scrollTop;
        if (this.afterScrollTop - this.beforeScrollTop > 0) {
            this.setState({
                scrollDire: 'scolledheader'
            })
        } else {
            this.setState({
                scrollDire: ''
            })
        }
    }
    changeTag(tab) {
        this.setState({
            activeIndex: tab
        });
    }
    saveFormRef(form) {
        this.form = form;
    }
    logout() {
        sessionStorage.setItem('userInfo', '');
        this.props.history.push('/');
    }
    handleOk() {
        this.form.validateFields((err, values) => {
            if(err){
                return
            }
            userModel.createUser(values).then((response)=>{
                if(response.data.data === 'success'){
                    message.success('注册成功！')
                }else{
                    notification.error({
                        message: '注册失败',
                        description: '请稍后再尝试！'
                    })
                }
            })
        })
        this.setState({
            visible: false
        });
    }
    handleCancel() {
        console.log('onCancel');
        this.setState({
            visible: false
        });
    }
    showRegisterModal() {
        this.setState({
            visible: true
        });
    }
    render() {
        let activeIndex = this.state.activeIndex
        return (
            <div className="layout" ref="layoutRef">
                <header className={"header" + ' ' + this.state.scrollDire}>
                    <nav>
                        <ul>
                            <li onClick={() => { this.changeTag(1) }}>
                                <Link className={activeIndex === 1 ? 'current' : ''} to="/pages/index">首页</Link>
                            </li>
                            <li onClick={() => { this.changeTag(2) }}>
                                <Link className={activeIndex === 2 ? 'current' : ''} to="/pages/photo">摄影</Link></li>
                            <li onClick={() => { this.changeTag(3) }}>
                                <Link className={activeIndex === 3 ? 'current' : ''} to="/pages/tour">旅游</Link>
                            </li>
                            <li onClick={() => { this.changeTag(4) }}>
                                <Link className={activeIndex === 4 ? 'current' : ''} to="/pages/about">关于</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="account">
                        <ul>
                            {!this.userInfo.length ?
                                <div>
                                    <li onClick={this.showRegisterModal.bind(this)}><a>注册</a></li>
                                    <li><Link to={`/`}>登录</Link></li>
                                </div> :
                                <div>
                                    <li><a><Icon className="user-icon" size="large" type="user" />{this.userInfo[0].userName}</a></li>
                                    <li><Link to={`/pages/manager`}><Icon className="user-icon" size="large" type="setting" />后台管理</Link></li>
                                    <li onClick={this.logout.bind(this)}><a>注销</a></li>
                                </div>}
                        </ul>
                    </div>
                </header>
                <div className="body-content">
                    {/* <div className="left">header</div> */}
                    <div className="center">
                        <Route path="/pages/index" component={IndexPage} />
                        <Route path="/pages/blog/:id" component={BlogDetail} />
                        <Route path="/pages/photo" component={Photo} />
                        <Route path="/pages/tour" component={Tour} />
                        <Route path="/pages/about" component={About} />
                        <Route path="/pages/manager" component={Manager} />
                        <Route path="/pages/addBlog" component={AddBlog} />
                        <Route path="/pages/upload" component={UploadImg} />
                    </div>
                    {/* <div className="right">right</div> */}
                </div>
                <footer className="footer">
                    <div className="author">©2018 zzl</div>
                </footer>
                <Register
                    ref={this.saveFormRef.bind(this)}
                    showModal={this.state.visible}
                    onCancel={this.handleCancel.bind(this)}
                    onOk={this.handleOk.bind(this)}
                />
            </div>
        )
    }
}
export default index