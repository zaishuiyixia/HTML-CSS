import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Upload, Modal, Icon, Card} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			previewVisible: false,
		    previewImage: '',
		    fileList: [{
		        uid: -1,
		        name: 'xxx.png',
		        status: 'done',
		        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		    }],
		    headers: {
				"Access-Control-Allow-Origin":"*"
			},
			usercollection: '',
			usercomments: ''
		};
	};

  	componentDidMount(){
  		var myFetchOptions = {
  			method: 'GET'
  		};
  		//获取用户收藏接口
  		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
			if (!this.state.usercollection.title) {
				document.title = "React News | React 驱动的新闻平台";
			}else{
				document.title = this.state.usercollection.title + " - React News | React 驱动的新闻平台";
			}	
		});
		//获取用户收评论接口
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
			if (!this.state.usercomments.title) {
				document.title = "React News | React 驱动的新闻平台";
			}else{
				document.title = this.state.usercomments.title + " - React News | React 驱动的新闻平台";
			}	
		});
  	}

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
	    this.setState({
	        previewImage: file.url || file.thumbUrl,
	        previewVisible: true,
	    });
    } 

    handleChange = ({ fileList }) => this.setState({ fileList })

	render() {	
		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length ?
			usercollection.map((uc,index)=>(
					<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/details/${uc.uniquekey}`}>查看</a>}>
						<p>{uc.Title}</p>
					</Card>
			))
			:
			'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

		const usercommentsList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`您于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'您还没有发表过任何评论。';

		const { previewVisible, previewImage, fileList, headers } = this.state;
        const uploadButton = (
	        <div>
		        <Icon type="plus" />
		        <div className="ant-upload-text">Upload</div>
	        </div>
	    );

		return (
			<div>
				<PCHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Tabs>
							<TabPane tab="我的收藏列表" key="1">
								<div className="comment">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</div>
							</TabPane>
							<TabPane tab="我的评论列表" key="2">
								<div className="comment">
								<Row>
									<Col span={24}>
										{usercommentsList}
									</Col>
								</Row>
							</div>
							</TabPane>
							<TabPane tab="头像设置" key="3">
								<div className="clearfix">
							        <Upload headers={headers} action="http://newsapi.gugujiankong.com/handler.ashx" listType="picture-card" fileList={fileList} onPreview={this.handlePreview} onChange={this.handleChange}>
					         	    	{fileList.length >= 3 ? null : uploadButton}
					        		</Upload>
							        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
							            <img alt="example" style={{ width: '100%' }} src={previewImage} />
							        </Modal>
					      		</div>
							</TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter/>
			</div>
		);
	}
}
