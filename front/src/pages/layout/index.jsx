import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;
import './index.less';
import IndexPage from '../index'
import history from 'history/createBrowserHistory';

class index extends React.Component {
    constructor(props){
        super(props)
        this.beforeScrollTop = 0;
        this.afterScrollTop = 0;
        this.state = {
            scrollDire: ''
        };
    }
    componentDidMount() {
        this.refs.layoutRef.addEventListener('scroll', (e)=>{
            this.handleScroll(e)
        });
        this.beforeScrollTop  = this.refs.layoutRef.scrollTop;
    }
    blogDetail() {
        this.props.history.push('/');
    }
    handleScroll(e) {
        this.afterScrollTop = e.target.scrollTop;
        if(this.afterScrollTop - this.beforeScrollTop > 0){
            this.setState({
                scrollDire: 'scolledheader'
            })
        }else{
            this.setState({
                scrollDire: ''
            })
        }
    }
    render() {
        return (
            <div className="layout" ref="layoutRef">
                <header className={"header" +' '+ this.state.scrollDire}>
                    <nav>
                        <ul>
                            <li><Link className="current" to={`/`}>首页</Link></li>
                            <li><Link to={`/`}>摄影</Link></li>
                            <li><Link to={`/`}>旅游</Link></li>
                            <li><Link to={`/`}>关于</Link></li>
                        </ul>
                    </nav>
                    <div className="account">
                        <ul>
                            <li><Link className="current" to={`/`}>注册</Link></li>
                            <li><Link to={`/`}>登录</Link></li>
                        </ul>
                    </div>
                </header>
                <div className="body-content">
                    {/* <div className="left">header</div> */}
                    <div className="center">
                        <div class="main-page">
                            <Route path="/index" component={IndexPage} />
                         </div>
                         <div class="info">11</div>
                    </div>
                    {/* <div className="right">right</div> */}
                </div>
                <footer className="footer">
                    
                </footer> 
            </div>
        )
    }
}
export default index