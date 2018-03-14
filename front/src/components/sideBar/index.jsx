import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon } from 'antd';
const Search = Input.Search;
import blogModel from '$models/blog';
import moment from 'moment';

import './index.less';
class index extends React.Component {
    constructor() {
        super()
        
        this.state = {
            recentBlogs: [],
            favsBlogs: []
        };
        this.getRecentBlog();
        this.getFavsBlog();
    }
    
    getRecentBlog() {
        blogModel.getRecentBlog().then((response) => {
            console.log(response);
            this.setState({
                recentBlogs: response.data.data
            });
        })
    }
    getFavsBlog() {
        blogModel.getFavs().then((response) => {
            console.log(response);
            this.setState({
                favsBlogs: response.data.data
            });
        })
    }
    render() {
        return (
            <div className="side-bar">
                <Search
                    placeholder="搜索"
                    className="search"
                    onSearch={value => console.log(value)}
                    enterButton
                />
                <h3>最近更新</h3>
                <ul>
                    {
                        this.state.recentBlogs.map((record) => {
                            return (
                                <li key={record._id}>
                                    <Link to={`/pages/blog/${record._id}`}>
                                        <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                        <div className="recent">
                                            <div className="recent-blog">{record.title}</div>
                                            <div className="update-time">{moment(record.date).format('YYYY-MM-DD HH:mm')}</div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
                <h3>点赞TOP5</h3>
                <ul>
                    {
                        this.state.favsBlogs.map((record) => {
                            return (
                                <li key={record._id}>
                                    <Link to={`/pages/blog/${record._id}`}>
                                        <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                        <div className="recent">
                                            <div className="recent-blog">{record.title}</div>
                                            <div className="update-time">{moment(record.date).format('YYYY-MM-DD HH:mm')}</div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
                <h3>联系我们</h3>
                <ul>
                    <li>
                        <a href="https://github.com/zzl7">
                            <Icon className="icon-size" type="github" />
                            <Icon className="icon-size" type="wechat" />
                            <Icon className="icon-size" type="weibo" />
                            <Icon className="icon-size" type="qq" />
                            <Icon className="icon-size" type="twitter" />
                        </a>
                    </li>
                </ul>

            </div>
        )
    }
}

export default index;