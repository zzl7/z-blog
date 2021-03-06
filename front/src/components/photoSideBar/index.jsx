import React from 'react';
import { Link} from 'react-router-dom';
import { Input, Icon } from 'antd';
const Search = Input.Search;

import './index.less';
class index extends React.Component {
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
                    <li>
                        <Link to={'/pages/detail'}>
                            <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                            <div className="recent">
                                <div className="recent-blog">设计之路</div>
                                <div className="update-time">2017/2/10 10:24</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/pages/detail'}>
                            <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                            <div className="recent">
                                <div className="recent-blog">【MACHINE LEARNING】机器学习：简明入门指南</div>
                                <div className="update-time">2017/2/10 10:24</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/pages/detail'}>
                            <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                            <div className="recent">
                                <div className="recent-blog">设计之路</div>
                                <div className="update-time">2017/2/10 10:24</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/pages/detail'}>
                            <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                            <div className="recent">
                                <div className="recent-blog">设计之路</div>
                                <div className="update-time">2017/2/10 10:24</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/pages/detail'}>
                            <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                            <div className="recent">
                                <div className="recent-blog">设计之路</div>
                                <div className="update-time">2017/2/10 10:24</div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default index;