import React from 'react';
import { Carousel, Card, Icon } from 'antd';
const { Meta } = Card;
import photoModel from '$models/photo'
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
    }
    blogDetail() {
        this.props.history.push('/pages/detail');
    }
    getPhoto() {
        const params = {
            rn: 10,
            tag1: '动漫',
            tag2: '全部',
            ftags: '气质'
        };
        console.log('0000');
        photoModel.getPhoto(params).then((response) => {
            delete response.data.data[response.data.data.length -1]
            this.setState({
                imageList: response.data.data
            })
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
                <h3>更多图片>></h3>
                <div className="more-photo">
                    
                    {
                        this.state.imageList.map((record, key) => {
                            return (
                                <Card
                                    hoverable
                                    key={key}
                                    onClick={this.blogDetail.bind(this)}
                                    className="mycard"
                                    cover={<img alt="example" src={record.image_url} />}
                                >
                                    <Meta
                                        title="网页设计趋势"
                                        description="网页设计师不要错过！2015年度最值得关注的21个网页设计趋势..."
                                    />
                                    <div className="author">
                                        <img alt="example" src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-479801.jpg" />
                                        <span>秦时明月</span>
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