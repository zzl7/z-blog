import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'antd';
const { Meta } = Card;
import SideBar from '../../components/sideBar';
import './index.less';
class index extends React.Component {
    constructor(props) {
        super(props)
    }
    blogDetail() {
        this.props.history.push('/pages/detail');
    }
    render() {
        return (
            <div>
                <div className="index-page">
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
                <SideBar />
            </div>

        )
    }
}
export default index