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
	}
	return imageDataArr;
})(imageDatas);
//随机去区间内的整数
function getRandomRange(low,high) {
  return Math.ceil(Math.random() * (high -low) + low)
}
var constant = {
        centerPos:{
            left:0,
            top:0
        },
        hPosRange:{
            leftSec:[0,0],
            rightSec:[0,0],
            y:[0,0]
        },
        vPosRange:{
            x:[0,0],
            topY:[0,0]
        }
    };
import React from 'react';
import ReactDOM from 'react-dom';
   
class ImgFigure extends React.Component {

	render() {
		var styleObj = {};
		// 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

		return ( <figure className="img-figure" style = {styleObj}>
		<img src={this.props.data.imageURL} alt={this.props.data.title}/>
		<figcaption className="img-figcaption">
		<h2 className="img-title">{this.props.data.title}</h2>
		</figcaption>
		</figure>
		);}}
class AppComponent extends React.Component { 
	 //构建展示舞台的区域约束对象
	 constructor() {
	 	super();
	 	this.state = { 
	 	ranges:[]//存放图片位置信息的状态
	 	 }
	 }
    //重新排布视图
    rearrange(centerIndex) {
    	var imgsArrangeArr = this.state.ranges;
    	var centerPos = constant.centerPos;
    	var hPosRange = constant.hPosRange;
    	var vPosRange = constant.vPosRange;
    	var HPRLeftSec = hPosRange.leftSec;//HPR == hPosRange
    	var HPRRightSec = hPosRange.rightSec;
    	var HPRY = hPosRange.y;
    	var VPRTopY = vPosRange.topY;//VPR == vPosRange
    	var VPRX = vPosRange.x;
    	//顶部区域图片数组，设计如下：顶部区域可以有1或0张图片
    	var imgsArrangeTopArr = [];
    	//取0或1整数
    	var topImageNum = Math.ceil(Math.random() * 2);
    	//默认顶部图片的个数
    	var topImgSpliceIndex = 0;
    	//取中心图片位置对象
    	var imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
    	//将中心位置赋值给图片
    	imgsArrangeCenterArr[0].pos = centerPos;
    	//随机获取顶部图片
    	topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImageNum));
    	imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImageNum);
    	//随机产生顶部区域的位置；通过forEach有效避免数组为空值，导致数组越界
    	imgsArrangeTopArr.forEach(function(value) {
    		value.pos = {
    			top:getRandomRange(VPRTopY[0],VPRTopY[1]),
    			left:getRandomRange(VPRX[0],VPRX[1])
    			}
    		
    	});
    	//布局左右两侧的图片
    	for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
    		var hPosRangeLORX = null;
    		if (i < k) {//布局左边
    			hPosRangeLORX = HPRLeftSec;
    		}else {//布局右边
    			hPosRangeLORX = HPRRightSec;
    		}
    		imgsArrangeArr[i].pos = {
    			left:getRandomRange(hPosRangeLORX[0],hPosRangeLORX[1]),
    			top:getRandomRange(HPRY[0],HPRY[1])
    		}
    	}
        //把取出的对象再插回去
    	if (imgsArrangeArr && imgsArrangeTopArr[0]) {
    		imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    	}
    	imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        console.log(imgsArrangeArr);
    	this.setState({
            ranges: imgsArrangeArr
        });
    }
    //当控件已经挂载后，添加位置约束
	 componentDidMount() {
    	//获取舞台的尺寸
    	var stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    	var	stageW =  stageDOM.scrollWidth;
    	var	stageH = stageDOM.scrollHeight;
    	var	halfStageW = Math.ceil(stageW/2);
    	var	halfStageH = Math.ceil(stageH/2);
    		//获取imgFigure的尺寸
    	var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    	var	imgFigureW   = imgFigureDOM.scrollWidth;
    	var	imgFigureH   = imgFigureDOM.scrollHeight;
    	var	halfImageFigureW = Math.ceil(imgFigureW/2);
    	var	halfImageFigureH = Math.ceil(imgFigureH/2);
    		//计算中心点的位置
    		constant.centerPos = {
    			left:halfStageW-halfImageFigureW,
    			top:halfStageH-halfImageFigureH
    		}
    		//计算左、右范围
    		constant.hPosRange.leftSec[0] = -halfImageFigureW;
    		constant.hPosRange.leftSec[1] = halfStageW - halfImageFigureW * 3;
    		constant.hPosRange.rightSec[0] = halfStageW + halfImageFigureW;
    		constant.hPosRange.rightSec[1] = stageW - halfImageFigureW;
    		constant.hPosRange.y[0] = -halfImageFigureH;
    		constant.hPosRange.y[1] = stageH - halfImageFigureH;

    		constant.vPosRange.x[0] = halfStageW-imgFigureW;
    		constant.vPosRange.x[1] =  halfStageW;
    		constant.vPosRange.topY[0] = -halfImageFigureH;
    		constant.vPosRange.topY[1] = halfStageH - halfImageFigureH * 3;
    		//设置默认排布centerIndex
    		this.rearrange(0);

    }
  render() {
  	var controllerUnits = [];
    var imgFigures = [];
    imageDatas.forEach(function(value,index) {
    	if (!this.state.ranges[index]) {
    		//随机产生图片的位置信息
             console.log("初始化");
    		this.state.ranges[index] = {
    			pos: {
                    left: 0,
                    top: 0
                }
    		}
    	}
        console.log("imageDatas.forEach");
     imgFigures.push(<ImgFigure data= {value} key={index} ref = {'imgFigure' + index} arrange = {this.state.ranges[index]}/>)

    }.bind(this));
    return (
    	<div id="content" className="content">
    	  <section className="stage" ref = 'stage'>
     	        <section className="img-sec">
     	        {imgFigures}
     	        </section>
     	        <nav className="controller-nav">
     	        {controllerUnits}
     	        </nav>
     	</section>
    	</div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
