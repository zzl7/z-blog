import React from 'react';
import { Carousel, Card, Icon } from 'antd';
const { Meta } = Card;
import SideBar from '../../components/photoSideBar';
import './index.less';

class index extends React.Component {
    blogDetail() {
        this.props.history.push('/pages/detail');
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
                <SideBar />
                <div className="more-photo">
                    <h3>更多图片>></h3>
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