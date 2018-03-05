import React from 'react';
import { Carousel } from 'antd';
import './index.less';

class index extends React.Component {
    render() {
        return (
            <div className="photo">
                <Carousel autoplay>
                    <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" /></div>
                    <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-366911.jpg" /></div>
                    <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-479801.jpg" /></div>
                    <div><img alt="example" src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-366911.jpg" /></div>
                </Carousel>
            </div>
        )
    }
}
export default index;