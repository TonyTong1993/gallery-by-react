require('normalize.css/normalize.css');
require('styles/App.css');
//获取图片相关数据
var imageDatas = require('../sources/images.json');
//利用自执函数，获取图片路径
imageDatas = (function genImageURL (imageDataArr) {
	for (var i = 0; i < imageDatas.length; i++) {
	var singleImageData	= imageDatas[i];
	singleImageData.imageURL = require('../images/' + singleImageData.fileName);
	imageDataArr[i] = singleImageData;
	};
	return imageDataArr;
})(imageDatas);
import React from 'react';
class ImgFigure extends React.Component {

	render() {
		return ( 
		<figure className="img-figure">
		<img src={this.props.data.imageURL} alt={this.props.data.title} />
		<figcaption className="img-figcaption">
		<h2 className="img-title">{this.props.data.title}</h2>
		</figcaption>
		</figure>);
	}
};

class AppComponent extends React.Component { 
	 //构建展示舞台的区域约束对象
	 constructor() {
	 	super();
	 	this.state = {
	 	ranges:[]	
	 	};
	 }
     constant = {
    	centerPos:{
    		left:0,
    		top:0,
    	},
    	hPosRange:{
    		leftSec:[0,0],
    		rightSec:[0,0],
    		y:[0,0],
    	},
    	vPosRange:{
    		x:[0,0],
    		topY:[0,0],
    	}
    }
    //重新排布视图
    reLayoutUI(centerIndex) {

    }
    //当控件已经挂载后，添加位置约束
	 componentDidMount() {
    	//获取舞台的尺寸
    	var stageDOM = React.findDOMNode(this.refs.stage);
    		stageW =  stageDOM.scrollWidth;
    		stageH = stageDOM.scrollHeight;
    		halfStageW = Math.ceil(stageW/2);
    		halfStageH = Math.ceil(stageH/2);
    		//获取imgFigure的尺寸
    	var imgFigureDOM = React.findDOMNode(this.ref.imgFigure0);
    		imgFigureW   = imgFigureDOM.scrollWidth;
    		imgFigureH   = imgFigureDOM.scrollHeight;
    		halfImageFigureW = Math.ceil(imgFigureW/2);
    		halfImageFigureH = Math.ceil(imgFigureH/2);
    		//计算中心点的位置
    		this.constant.centerPos = {
    			left:halfStageW-halfImageFigureW,
    			top:halfStageH-halfImageFigureH,
    		};
    		//计算左、右范围
    		this.constant.hPosRange.leftSec[0] = -halfImageFigureW;
    		this.constant.hPosRange.leftSec[1] = halfStageW - halfImageFigureW * 3;
    		this.constant.hPosRange.rightSec[0] = halfStageW + halfImageFigureW;
    		this.constant.hPosRange.rightSec[1] = stageW - halfImageFigureW;
    		this.constant.hPosRange.y[0] = -halfImageFigureH;
    		this.constant.hPosRange.y[1] = stageH - halfImageFigureH;

    		this.constant.vPosRange.x[0] = halfImageFigureW-imgFigureW;
    		this.constant.vPosRange.x[1] = halfImageFigureW;
    		this.constant.vPosRange.topY[0] = -halfImageFigureH;
    		this.constant.vPosRange.topY[1] = halfStageH - halfImageFigureH * 3;

    		//设置默认排布centerIndex
    		this.reLayoutUI(0);

    }
  render() {
  	var controllerUnits = [];
    var imgFigures = [];
    imageDatas.forEach(function(value,index) {
    	if (!this.state.ranges[index]) {
    		//随机产生图片的位置信息
    	};
     imgFigures.push(<ImgFigure data= {value} key={index} ref = {'imgFigure' + index}/>)
    }.bind(this));
    return (
    	<div id="content" className="content">
    	  <section className="stage" ref="stage">
     	        <section className="img-sec">
     	        {imgFigures}
     	        </section>
     	        <nav className="controller-nav">
     	        </nav>
     	</section>
    	</div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
