import React from 'react';
import { Carousel, Card, Icon } from 'antd';
const { Meta } = Card;
// import LazyLoad, { forceCheck } from 'react-lazyload';
import photoModel from '$models/photo';
import userModel from '$models/user';
import PhotoSideBar from '../../components/photoSideBar';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageList: []
        }
    }
    componentDidMount() {
        this.getPhoto();
        this.getUser();
    }
    blogDetail(id) {
        this.props.history.push(`/pages/photoDetail/${id}`);
    }
    getPhoto() {
        // const params = {
        //     rn: 15,
        //     tag1: '动漫',
        //     tag2: '全部',
        //     ftags: '可爱'
        // };
        console.log('0000');
        photoModel.getPhoto().then((response) => {
            // delete response.data.data[response.data.data.length -1]
            this.setState({
                imageList: response.data.data
            });
            // forceCheck();
        });
    }
    getUser() {
        console.log('dsds');
        userModel.getUser().then((response) => {
            console.log(response);
        });
    }
    render() {
        return (
            <div className="photo-content">
                <div className="photo">
                    <Carousel autoplay>
                        <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" /></div>
                        <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-366911.jpg" /></div>
                        <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" /></div>
                        <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-366911.jpg" /></div>
                    </Carousel>
                </div>
                <PhotoSideBar />
                <h3>更多图片</h3>
                <div className="more-photo">
                
                    {
                        this.state.imageList.map((record, key) => {
                            return (
                                <Card
                                    hoverable
                                    key={key}
                                    onClick={()=>{this.blogDetail(record._id)}}
                                    className="mycard"
                                    cover={<img alt="example" src={record.url ?  record.url[0] : ''} />}
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
                
            </div>
        )
    }
}
export default index;