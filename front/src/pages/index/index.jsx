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
    blogDetail(id) {
        this.props.history.push(`/pages/blog/${id}`);
    }
    render() {
        return (
            <div>
                <div className="index-page">
                    {
                        this.state.blogsList.map(record => {
                            let favs = record.meta && record.meta.favs ? record.meta.favs : 0;
                            return (
                                <Card
                                    hoverable
                                    key={record._id}
                                    onClick={() => { this.blogDetail(record._id) }}
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
                                            <span>{favs}</span>
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