import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter,Switch} from 'react-router-dom';
import PCIndex from './js/components/pc_index';
import PCNewsDetails from './js/components/pc_news_details';
import PCUserCenter from './js/components/pc_usercenter';
import MobileIndex from './js/components/mobile_index';
import MobileNewsDetails from './js/components/mobile_news_details';
import MobileUserCenter from './js/components/mobile_usercenter'
import 'antd/dist/antd.css';
import './css/pc.css';
import './css/mobile.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={PCIndex}></Route>
							<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
							<Route path="/usercenter" component={PCUserCenter}></Route>
						</Switch>
					</BrowserRouter>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={MobileIndex}></Route>
							<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
							<Route path="/usercenter" component={MobileUserCenter}></Route>
						</Switch>
					</BrowserRouter>
				</MediaQuery>
			</div>
		);
	};
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));