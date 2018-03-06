import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'antd';
const { Meta } = Card;
import photoModel from '$models/photo'
import SideBar from '../../components/sideBar';
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
            tag1: '旅游',
            tag2: '全部',
            ftags: '风景'
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
            <div>
                <div className="tour-page">
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
                <SideBar />
            </div>

        )
    }
}
export default index