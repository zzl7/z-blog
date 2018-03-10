import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Button, message } from 'antd';
const { Meta } = Card;
import Remarkable from 'remarkable';
import SideBar from '../../components/sideBar';
import blogModel from '$models/blog';
import moment from 'moment';

import './index.less';
class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            blogsList: []
        }
        this.getBlogs();
    }
    componentDidMount() {
        // this.setState({
        //     content: this.renderMarkdown(content)
        // });
    }
    getBlogs() {
        blogModel.getBlogs().then((response) => {
            let blogsList = response.data.data ? response.data.data : [];
            blogsList.map(record => {
                record.key = record._id;
                return record
            });
            this.setState({
                blogsList
            });
        })
    }
    deleteBlog(id) {
        blogModel.deleteBlog(id).then((response) => {
            message.success('删除成功！');
            this.getBlogs();
        })
    }
    renderMarkdown(source) {
        this.options = {
            html: true
        };
        if (!this.md) {
            this.md = new Remarkable(this.options);
        }
        return this.md.render(source);
    }
    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, row) => <Link to={`/pages/blog/${row._id}`}>{text}</Link>,
        }, {
            title: '作者',
            dataIndex: 'author',
            dataIndex: 'author',
            key: 'fdf',
        }, {
            title: '点赞数',
            dataIndex: 'author',
            dataIndex: 'author',
            key: 'author',
            render: (text, row) => {
                return '999+'
            }
        }, {
            title: '创建时间',
            dataIndex: 'date',
            key: 'date',
            render: text => moment(text).format('YYYY-MM-DD HH:mm')
        }, {
            title: '操作',
            dataIndex: 'oper',
            key: 'oper',
            render: (text, row) => <div><Button type="danger" onClick={() => { this.deleteBlog(row._id) }}>删除</Button></div>
        }];

        return (
            <div className="add-blog">
                <Button className="add-blog-btn"><Link to="/pages/addBlog">新增文章</Link></Button>
                {/* <div className="about-page">
                    <div className="blog-content">
                        <div className="full-image"><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" /></div>
                        <div className="md-content">
                            <span className="md-container" dangerouslySetInnerHTML={{ __html: this.state.content }} />
                        </div>
                    </div>
                </div>
                <SideBar /> */}
                <Table columns={columns} dataSource={this.state.blogsList} />
            </div>

        )
    }
}
export default index