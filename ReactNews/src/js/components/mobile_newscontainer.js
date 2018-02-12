import React from 'react';
import {Tabs,Carousel} from 'antd';
import MobileNewsBlock from './mobile_news_block';
import Carousel1 from '../../images/carousel1.jpg';
import Carousel2 from '../../images/carousel2.jpg';
import Carousel3 from '../../images/carousel3.jpg';
import Carousel4 from '../../images/carousel4.jpg';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (
			<div>
				<Tabs>
					<TabPane tab="头条" key="1">
						<div className="carousel">
							<Carousel {...settings}>
								<div><img src={Carousel1} alt="picture1" /></div>
								<div><img src={Carousel2} alt="picture2" /></div>
								<div><img src={Carousel3} alt="picture3" /></div>
								<div><img src={Carousel4} alt="picture4" /></div>
							</Carousel>
						</div>
						<MobileNewsBlock count={20} type="top"/>
					</TabPane>
					<TabPane tab="社会" key="2">
						<MobileNewsBlock count={20} type="shehui"/>
					</TabPane>
					<TabPane tab="国内" key="3">
						<MobileNewsBlock count={20} type="guonei"/>
					</TabPane>
					<TabPane tab="国际" key="4">
						<MobileNewsBlock count={20} type="guoji"/>
					</TabPane>
					<TabPane tab="娱乐" key="5">
						<MobileNewsBlock count={20} type="yule"/>
					</TabPane>
				</Tabs>
			</div>
		);
	};
}
