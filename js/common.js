//var Common = {
var BASEURL = "http://121.40.241.28:7070/zhxz/app";
var ROOTURL = "http://121.40.241.28:7070/zhxz/";
var FILEURL = "http://121.40.241.28:7070/zhxz";
var aniShow = "slide-in-right";
var this_href = "";

function toUrl(_this) {
	//主列表点击事件
	if(this_href == _this) {
		return;
	}

	var href = _this.getAttribute('data-href');

	//非plus环境，直接走href跳转
	//			if(!mui.os.plus) {
	//				location.href = href;
	//				return;
	//			}

	//     console.log(href);
	//	var titleType = _this.getAttribute("data-title-type");

	var webview_style = {
		popGesture: "close"
	};

	var extras = {};
	var webview = plus.webview.create(href, href, webview_style, extras);
	var id = _this.getAttribute("data-id");
	var type = _this.getAttribute("data-type");
	var datalist = {};
	if(id) {

		datalist.id = id;
	}
	if(type) {

		datalist.type = type;
	}
	if(datalist != null) {
		mui.fire(webview, 'id', datalist);
	}

	webview.addEventListener("titleUpdate", function() {
		setTimeout(function() {
			webview.show(aniShow, 300);

		}, 100);
	});
	webview.addEventListener('close', function() { //页面关闭后可再次打开
		this_href = null;

	}, false);
	this_href = _this;

}

function backhide() {
	if(window.plus) {
		ws || (ws = plus.webview.currentWebview());

		ws.close('slide-out-right', 300);

	} else if(history.length > 1) {
		history.back();
	}
}

var url_href = null;

function pushUrl(ws, url, top, bottom) {
	//主列表点击事件
	if(url_href == url) {
		return;
	}

	//	var titleType = _this.getAttribute("data-title-type");

	var webview_style = {
		popGesture: "close",
		top: top + 'px',
		bottom: bottom + 'px'
	}
	var extras = {};
	var webview = plus.webview.create(url, url, webview_style, extras);
	ws.append(webview);
	webview.addEventListener("titleUpdate", function() {
		setTimeout(function() {
			webview.show('none', 300);

		}, 100);
	});
	webview.addEventListener('close', function() { //页面关闭后可再次打开
		url_href = null;

	}, false);
	url_href = url;

}
var url_href_s = "";

function swOpen(ws, url, _this, children) {
	//主列表点击事件
	if(url_href_s == url) {
		return;
	}

	//	var titleType = _this.getAttribute("data-title-type");

	var webview_style = {
		popGesture: "close",
		top: 95 + 'px',
		bottom: 0 + 'px'
	}
	//var extras = {};
	var datalist = {
		id: _this.getAttribute('data-id'),
		cdata: children
	}
	var webview = plus.webview.create(url, url, webview_style);
	mui.fire(webview, 'id', datalist);
	ws.append(webview);

	webview.addEventListener("titleUpdate", function() {
		setTimeout(function() {
			webview.show('none', 300);

		}, 100);
	});

	webview.addEventListener('close', function() { //页面关闭后可再次打开
		url_href_s = null;

	}, false);
	url_href_s = url;

}

function bk() {

	//	var ws=plus.webview.currentWebview();
	//	ws.close();
	mui.back = function() {

		var ws = plus.webview.currentWebview();
		ws.close();
	}
	mui.back();
}
Date.prototype.Format = function(fmt) { //author: meizz 

	//console.log(this);
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

	return fmt;
}

function isNumber(obj) {
	return !isNaN(parseFloat(obj)) && isFinite(obj);
}

function setLocalStorage(name, data) {
	localStorage.setItem(name, JSON.stringify(data));
}

function getLocalStorage(name) {
	return JSON.parse(localStorage.getItem(name));
}

function isLogin() {
	var user = getLocalStorage('user');
	if(user) {
		return user;
	} else {
		return false;
	}
}

function _isNull(str) {
	return(!str || str != "" || str != "undefined" || str != null || str != undefined) ? str : "";
}

function isImg(_this) {
	_this.style.display = "none";
}

//document.addEventListener('DOMContentLoaded',function(){
////	document.getElementsByTagName('img').each(function(i,item){
////	     console.log(item);
////    })
//console.log(JSON.stringify(document.getElementsByTagName('img')))
//	
//})
function fileName(url) {
	return url.split("/").pop();
}

function createDownload(_this) {
	//	console.log(FILEURL+_this.getAttribute('data-href'));
	//window.location.href=FILEURL+_this.getAttribute('data-href');
	plus.runtime.openURL(FILEURL + _this.getAttribute('data-href'), onError);

	function onError(error) {
		mui.alert("文件下载失败");
		console.log(error);
	}
	//	dtask = plus.downloader.createDownload(BASEURL+_this.getAttribute('data-href'), {}, function ( d, status ) {
	//		// 下载完成
	//		if ( status == 200 ) { 
	//			mui.alert(d.filename+"文件下载成功" ); 
	//			console.log( "Download success: " + d.filename );
	//		} else {
	//			if(status==400){
	//				console.log( "文件不存在" ); 
	//			}
	//			console.log( "Download failed: " + status ); 
	//			mui.alert( "文件下载失败" ); 
	//		}  
	//	});
	//	//dtask.addEventListener( "statechanged", onStateChanged, false );
	//	dtask.start(); 
}

function _ajax(url, callback) {
	mui.ajax(BASEURL + url, {

		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {

			if(data.result == "success") {
				callback(data.data);

			} else if(data.result == "fail") {
				//						mui.toast(data.msg, {
				//							duration: 'long',
				//							type: 'div'
				//						});
				callback(false);
			}

		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}