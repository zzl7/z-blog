import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;
import './index.less';
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
                        {
                            [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(record => {
                                return (
                                    <Card
                                        hoverable
                                        key={record}
                                        onClick={this.blogDetail.bind(this)}
                                        className="mycard"
                                        cover={<img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />}
                                    >
                                        <Meta
                                            title="网页设计趋势"
                                            description="网页设计师不要错过！2015年度最值得关注的21个网页设计趋势"
                                        />
                                    </Card>
                                );
                            })
                        }

                    </div>
                    {/* <div className="right">right</div> */}
                </div>
            </div>
        )
    }
}
export default index