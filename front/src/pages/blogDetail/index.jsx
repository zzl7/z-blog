import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Input, Button } from 'antd';
const { Meta } = Card;
const { TextArea } = Input;
import moment from 'moment';
import ReactMde, { ReactMdeTypes, ReactMdeCommands } from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";
import Remarkable from 'remarkable';
import SideBar from '../../components/sideBar';
import './index.less';
import blogModel from '$models/blog';


class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: {},
            body: '',
            reactMdeValue: { text: "" },
        }
        // console.log(this.props);
        this.getBlog();
    }
    componentWillReceiveProps() {
        if (this.props.match.params.id != this.blogId) {
            console.log(this.props.match.params.id, '===', this.blogId)
            this.getBlog();
        }

    }
    componentDidMount() {
        //         let content = `
        // #### 入门书
        // 入门可以通过啃书，但书本上的东西很多都已经过时了，在啃书的同时，也要持续关注技术的新动态。这里推几本我觉着不错的书：

        // * 《JavaScript高级编程》：可以作为入门书籍，但同时也是高级书籍，可以快速吸收基础，等到提升再回来重新看
        // * 《JavaScript权威指南》：不太适合入门，但是必备，不理解的地方就去查阅一下，很有帮助
        // * 《编写可维护的JavaScript》
        // * 《JavaScript DOM编程艺术》学习JavaScript和DOM开发的必读之作。
        // * 《Node.js开发指南》：不错的Nodejs入门书籍
        // * 《深入浅出Node.js》：Nodejs进阶书籍，必备
        // * 《JavaScript异步编程》：理解JS异步的编程理念
        // * 《JavaScript模式》和《JavaScript设计模式》：JavaScript的代码模式和设计模式，将开发思维转变到JavaScript，非常好的书
        // * 《JavaScript框架设计》：在用轮子同时，应当知道轮子是怎么转起来的，讲解很详细，从源码级别讲解框架的各个部分的实现，配合一个现有框架阅读，可以学到很多东西
        // * 《Don\`t make me think》：网页设计的理念，了解用户行为，非常不错
        // * 《CSS禅意花园》：经久不衰的一部著作，同样传递了网页设计中的理念以及设计中需要注意的问题
        // * 《高性能JavaScript》和《高性能HTML5》：强调性能的书，其中不只是性能优化，还有很多原理层面的东西值得学习
        // * 《HTML5 Canvas核心技术》：我正在读的一本书，对于canvas的使用，动画的实现，以及动画框架的开发都非常有帮助
        // * 《HTTP权威指南》：HTTP协议相关必备，前端开发调试的时候也会经常涉及到其中的知识
        // * 《响应式Web设计》：技术本身不难，重要的是响应式网页的设计理念，以及移动先行的思想
        // * 《JavaScript语言精粹》：老道的书，也是普及JavaScript的开发思维的一本好书，非常适合入门

        // #### 一些不错的网站
        // * [github](https://github.com)：没啥好说的，多阅读别人的源码，多上传自己的源码，向世界各地的大牛学习
        // * [codepen](http://codepen.io/)：感受前端之美的必选之地，里面有很多酷炫的效果和优秀的插件
        // * [echojs](http://www.echojs.com/)：快速了解js新资讯的网站
        // * [stackoverflow](http://stackoverflow.com/)和[segmentfault](segmentfault.com)：基本上各种问题都能在上面获得解答
        // * [google web fundamentals](https://developers.google.com/web/fundamentals/)：每篇文章都适合仔细阅读
        // * [static files](http://www.staticfile.org/)：开放的CDN，很好用
        // * [iconfont](http://www.iconfont.cn/)：阿里的矢量图标库，非常不错，支持CDN而且支持项目
        // * [html5 rocks](http://www.html5rocks.com/): 一个不错的网站，很多浏览器的新特性以及前沿的技术，都能在这上面找到文章
        // * [css tricks](http://css-tricks.com/)：如何活用CSS，以及了解CSS新特性，这里可以满足你
        // * [JavaScript 秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/#object.general) JavaScript初学必看，非常不错
        // * [w3cplus](http://www.w3cplus.com/)：一个前端学习的网站，里面的文章质量都挺不错的
        // * [node school](http://nodeschool.io/)：一个不错的node学习网站
        // * [learn git branch](http://pcottle.github.io/learnGitBranching/?demo)：一个git学习网站，交互很棒
        // * [前端乱炖](http://www.html-js.com/)：一个前端文章分享的社区，有很多优秀文章
        // * [正则表达式](http://deerchao.net/tutorials/regex/regex.htm)：一个正则表达式入门教程，非常值得一看
        // * [阮一峰的博客](http://www.ruanyifeng.com/blog/)和[张鑫旭的博客](http://www.zhangxinxu.com/wordpress/)：快速了解某些知识的捷径，但是如果需要深挖，还需要其他的资源
        // * 各路大牛的博客：这个太多了，就不贴了，知乎上有很全的
        // * 各种规范的官方网站，不懂得时候读规范`
        // this.setState({
        //     content: this.renderMarkdown(content)
        // });
    }

    blogDetail() {
        this.props.history.push('/pages/detail');
    }

    // getMarkdownSource(path) {
    //     LogModel.getMarkdownSource(path).then((xhr, data) => {
    //         // console.log(data, 'sadfd');
    //         if (path === 'SUMMARY.md') {
    //             this.setState({
    //                 summary: data ? this.renderMarkdown(data.replace(/\]\(/g, '](/helper#')) : ''
    //             });
    //         } else {

    //             console.log(this.renderMarkdown(data.replace(/\.\.\/_images\//g, this.baseUrl + '/_images/')).replace(/\<img/g, '<img onClick="window.open(this.src)"'));

    //             this.setState({
    //                 content: data ? this.renderMarkdown(data.replace(/\.\.\/_images\//g, this.baseUrl + '/_images/')).replace(/\<img/g, '<img onClick="window.open(this.src)"') : ''
    //             });
    //         }

    //     }).catch(function (error, response, xhr) {
    //         // message.error('获取用户组信息失败!');
    //     });
    // }
    getBlog() {
        let id = this.props.match.params.id;
        this.blogId = id;
        blogModel.getBlog(id).then((response) => {
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
        blogModel.commentBlog(id, params).then((response) => {
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
    render() {
        let mdText = this.renderMarkdown(this.state.content.body);
        return (
            <div>
                <div className="blog-detail">
                    <div className="blog-content">
                        <div className="full-image">
                            <img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" />
                            <div className="author">
                                <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                <span>{this.state.content.author}</span>
                                <span className="favorite">
                                    <Icon type="heart" />
                                    <span>999+</span>
                                </span>
                            </div>

                        </div>
                        <h3 className="title">{this.state.content.title}</h3>
                        <div className="md-content">
                            {/*<ReactMarkdown source={this.state.content} />*/}
                            <span className="md-container" dangerouslySetInnerHTML={{ __html: mdText }} />
                        </div>
                        <div>
                            {
                                this.state.content && this.state.content.comments ? this.state.content.comments.map((record, index) => {
                                    let markdownHtml =  this.renderMarkdown(record.body)
                                    return (
                                        <div className="comments" key={record._id}>
                                            <div className="author">
                                                <div>
                                                    <img class="author-icon" alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                                    <span>{index + 1}楼: {record.commentator}</span>
                                                    <span className="date">{moment(record.date).format('YYYY-MM-DD HH:mm')}</span>
                                                </div>
                                                <div className="comment-detail"><span className="md-container" dangerouslySetInnerHTML={{ __html:  markdownHtml}} /></div>
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
                <SideBar />
            </div>

        )
    }
}
export default index