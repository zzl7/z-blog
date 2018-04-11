import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Input, Button } from 'antd';
const { Meta } = Card;
const { TextArea } = Input;
import moment from 'moment';
import ReactMde, { ReactMdeTypes, ReactMdeCommands } from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";
import Remarkable from 'remarkable';
// import SideBar from '../../components/sideBar';
import './index.less';
import photoModel from '$models/photo.js';


class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: {},
            body: '',
            reactMdeValue: { text: "" },
        }
        // console.log(this.props);
        this.photoId = '';
        this.getPhotoDetail();

    }
    componentWillReceiveProps() {
        if (this.props.match.params.id != this.blogId) {
            console.log(this.props.match.params.id, '===', this.blogId)
            this.getPhotoDetail();
        }

    }
    componentDidMount() {

    }

    blogDetail() {
        this.props.history.push('/pages/detail');
    }


    getPhotoDetail() {
        let id = this.props.match.params.id;
        this.photoId = id;
        photoModel.getPhotoDetail(id).then((response) => {
            this.setState({
                content: response.data.data[0]
            })
        });
    }
    commentBlog() {
        let userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : []
        let id = this.props.match.params.id;
        let commentator = userInfo[0].userName;
        let params = { body: this.state.reactMdeValue.text, commentator: commentator }
        photoModel.commentPhoto(id, params).then((response) => {
            // this.setState({
            //     content: response.data.data[0]
            // })
            this.setState({
                reactMdeValue: { text: "" }
            });
            this.getBlog();
        });
    }
    onChangeComment(e) {
        this.setState({
            body: e.target.value
        });
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
    handleValueChange(value) {
        this.setState({
            reactMdeValue: value
        });
    }
    onFavs() {
        let id = this.props.match.params.id;
        blogModel.favs(id, { favs: 1 }).then((response) => {
            this.getBlog();
        });
    }
    render() {
        // let favs = this.state.content && this.state.content.meta && this.state.content.meta.favs ? this.state.content.meta.favs : 0;
        // let mdText = this.renderMarkdown(this.state.content.body);
        console.log(this.state.content)
        return (
            <div>
                <div className="photo-detail">
                    <div className="photo-detail-content">
                        <div className="full-image">
                            {this.state.content && this.state.content.url ? this.state.content.url.map(record => {
                                return (
                                    <div className="photo">
                                        <img src={record} alt="图片"/>
                                    </div>
                                );
                            }) : ''}
                            {/* <img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" />
                            <div className="author">
                                <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                <span>{this.state.content.author}</span>
                                <span className="favorite" onClick={this.onFavs.bind(this)}>
                                    <Icon type="heart" />
                                    <span>{favs}</span>
                                </span>
                            </div> */}

                        </div>
                        {/* <h3 className="title">{this.state.content.title}</h3> */}
                        {/* <div className="md-content">
                            <span className="md-container" dangerouslySetInnerHTML={{ __html: mdText }} />
                        </div> */}
                        <div>
                            {
                                this.state.content && this.state.content.comments ? this.state.content.comments.map((record, index) => {
                                    let markdownHtml = this.renderMarkdown(record.body)
                                    return (
                                        <div className="comments" key={record._id}>
                                            <div className="author">
                                                <div>
                                                    <img className="author-icon" alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                                    <span>{index + 1}楼: {record.commentator}</span>
                                                    <span className="date">{moment(record.date).format('YYYY-MM-DD HH:mm')}</span>
                                                </div>
                                                <div className="comment-detail"><span className="md-container" dangerouslySetInnerHTML={{ __html: markdownHtml }} /></div>
                                            </div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>
                        <div className="comment">
                            <ReactMde
                                value={this.state.reactMdeValue}
                                onChange={this.handleValueChange.bind(this)}
                                commands={ReactMdeCommands.getDefaultCommands()}
                                showdownOptions={{ tables: false, simplifiedAutoLink: false }}
                            />
                            {/* <TextArea rows={4} placeholder="评论" value={this.state.body} onChange={this.onChangeComment.bind(this)} /> */}
                            <Button className="comment-btn" onClick={this.commentBlog.bind(this)}>发表</Button>
                        </div>
                    </div>
                </div>
                {/* <SideBar /> */}
            </div>

        )
    }
}
export default index