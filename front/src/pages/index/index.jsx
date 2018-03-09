import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'antd';
const { Meta } = Card;
import SideBar from '../../components/sideBar';
import blogModel from '$models/blog';
import './index.less';
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsList: []
        }
        this.getBlogs();
    }
    getBlogs() {
        blogModel.getBlogs().then((response) => {
            this.setState({
                blogsList: response.data.data ? response.data.data : []
            });
        })
    }
    blogDetail() {
        this.props.history.push('/pages/detail');
    }
    render() {
        return (
            <div>
                <div className="index-page">
                    {
                        this.state.blogsList.map(record => {
                            return (
                                <Card
                                    hoverable
                                    key={record._id}
                                    onClick={this.blogDetail.bind(this)}
                                    className="mycard"
                                    cover={<img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />}
                                >
                                    <Meta
                                        title={record.title}
                                        description={record.body}
                                    />
                                    <div className="author">
                                        <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                        <span>{record.author}</span>
                                        <span className="favorite">
                                            <Icon type="heart" />
                                            <span>999+</span>
                                        </span>
                                    </div>
                                </Card>
                            );
                        })
                    }
                </div>
                <SideBar />
            </div>

        )
    }
}
export default index