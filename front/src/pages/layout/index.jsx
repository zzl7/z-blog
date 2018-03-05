import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Card, Input, Icon } from 'antd';
const { Meta } = Card;
const Search = Input.Search;

import './index.less';
import IndexPage from '../index'
import BlogDetail from '../blogDetail'
import Photo from '../photo';
import About from '../about';
import Tour from '../tour';
import Register from '../../components/register';
import history from 'history/createBrowserHistory';

class index extends React.Component {
    constructor(props) {
        super(props)
        this.beforeScrollTop = 0;
        this.afterScrollTop = 0;
        this.state = {
            scrollDire: '',
            visible: false
        };
    }
    componentDidMount() {
        this.refs.layoutRef.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        });
        this.beforeScrollTop = this.refs.layoutRef.scrollTop;
    }
    blogDetail() {
        this.props.history.push('/');
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
    changeTag() {

    }
    saveFormRef(form){
        this.form = form;
    }
    handleCancel() {
        console.log('onCancel');
        this.setState({
            visible: false
        });
    }
    handleOk() {
        console.log('ok');
        this.setState({
            visible: false
        });
    }
    showRegisterModal(){
        this.setState({
            visible: true
        });
    }
    render() {
        return (
            <div className="layout" ref="layoutRef">
                <header className={"header" + ' ' + this.state.scrollDire}>
                    <nav>
                        <ul>
                            <li><Link className="current" to="/pages/index">首页</Link></li>
                            <li><Link to="/pages/photo">摄影</Link></li>
                            <li><Link to="/pages/tour">旅游</Link></li>
                            <li><Link to="/pages/about">关于</Link></li>
                        </ul>
                    </nav>
                    <div className="account">
                        <ul>
                            <li onClick={this.showRegisterModal.bind(this)}><a>注册</a></li>
                            <li><Link to={`/`}>登录</Link></li>
                        </ul>
                    </div>
                </header>
                <div className="body-content">
                    {/* <div className="left">header</div> */}
                    <div className="center">
                        <Route path="/pages/index" component={IndexPage} />
                        <Route path="/pages/detail" component={BlogDetail} />
                        <Route path="/pages/photo" component={Photo} />
                        <Route path="/pages/tour" component={Tour} />
                        <Route path="/pages/about" component={About} />
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