var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");
var cvswidth;
var cvsheight;
var lastTime;
var deltaTime;
var _fish = [];
var _deadFish = [];
var bar;
var bgImg;
var battery; //炮台
var battSize = 0;
var netSize = 0;
var changeFlag = 0;
var _shell = []; //存储炮弹对象
var _net = [];
var _coin = [];
var score = 500;
var overFlag = false;
var sources = [
    { src: "images/bottom-bar.png", x: 217.5, y: 674},
    { src: "images/cannon_minus.png", x: 554, y: 710},  
    { src: "images/cannon_plus.png", x: 691, y: 710}
];
var batImg = [
    { src: "images/cannon1.png", x: 642, y: 705, w: 74, h: 74},
    { src: "images/cannon2.png", x: 642, y: 705, w: 74, h: 76},
    { src: "images/cannon3.png", x: 642, y: 705, w: 74, h: 76},
    { src: "images/cannon4.png", x: 642, y: 705, w: 74, h: 83},
    { src: "images/cannon5.png", x: 642, y: 705, w: 74, h: 85},
    { src: "images/cannon6.png", x: 642, y: 705, w: 74, h: 90},
    { src: "images/cannon7.png", x: 642, y: 705, w: 74, h: 94},
];
var shellImg = [
 	{ src: "images/bullet1.png", x: 642, y: 705, w: 24, h: 26, m : 1},
 	{ src: "images/bullet2.png", x: 642, y: 705, w: 25, h: 29, m : 2},
 	{ src: "images/bullet3.png", x: 642, y: 705, w: 27, h: 31, m : 4},
 	{ src: "images/bullet4.png", x: 642, y: 705, w: 29, h: 33, m : 6},
 	{ src: "images/bullet5.png", x: 642, y: 705, w: 30, h: 34, m : 8},
 	{ src: "images/bullet6.png", x: 642, y: 705, w: 31, h: 35, m : 10},
 	{ src: "images/bullet7.png", x: 642, y: 705, w: 32, h: 38, m : 15}
];
var netImg = [
	{ src: "images/web1.png", w: 116, h: 118 },
	{ src: "images/web2.png", w: 137, h: 142 },
	{ src: "images/web3.png", w: 156, h: 162 },
	{ src: "images/web4.png", w: 180, h: 174 },
	{ src: "images/web5.png", w: 163, h: 155 },
	{ src: "images/web6.png", w: 191, h: 181 },
	{ src: "images/web7.png", w: 242, h: 244 },
];
var fishImg = [  
    { src: "images/fish1.png", frm: 4, w: 55, h: 37 , c : 2},
    { src: "images/fish2.png", frm: 4, w: 78, h: 64 , c : 5},
    { src: "images/fish3.png", frm: 4, w: 72, h: 56 , c : 10},
    { src: "images/fish4.png", frm: 4, w: 77, h: 59 , c : 20},
    { src: "images/fish5.png", frm: 4, w: 107, h: 122 , c : 30},
    { src: "images/fish6.png", frm: 6, w: 105, h: 79 , c : 40},
    { src: "images/fish7.png", frm: 5, w: 92, h: 151 , c : 50},
    { src: "images/fish8.png", frm: 6, w: 174, h: 126 , c : 60},
    { src: "images/fish9.png", frm: 6, w: 166, h: 183 , c : 70},
    { src: "images/fish10.png", frm: 5, w: 178, h: 187 , c : 80},
    { src: "images/shark1.png", frm: 6, w: 509, h: 270 , c : 100},
    { src: "images/shark2.png", frm: 6, w: 516, h: 273 , c : 150}
];
var coinImg = "images/coinText.png";
var scoreImg = "images/number_black.png";
document.body.onload = game;
 //存储图片链接信息的关联数组  
function game(){
	bgImg= new Image();
	bgImg.src = "images/bg2.png";
	cvswidth = canvas.width;
	cvsheight = canvas.height;
	lastTime = Date.now();
	deltaTime = 0;
	battery = new batteryObj(batImg[battSize].src,batImg[battSize].x,batImg[battSize].y,batImg[battSize].w,batImg[battSize].h);
	gameloop();
}
function gameloop(){	//游戏循环，刷新界面
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	ctx.clearRect(0,0,cvswidth,cvsheight); //清除画布上残留的鱼群运动轨迹的每一帧
	ctx.drawImage(bgImg,0,0,cvswidth,cvsheight);
	addFishGroup();
	drawFishNet();
	drawCoin();
	drawBar();
	scoring(scoreImg,score);
	isShut();
	isOut(_fish);
	isOut(_shell);
	hasCollided();
	battery.draw();
	gameOver(overFlag);
}

setInterval(function(){	//不定时实例化一个鱼对象
	var type = util.getFishProbability(Math.random()*100);
	var img = fishImg[type].src;
	var w = fishImg[type].w;
	var h = fishImg[type].h;
	var maxFrame = fishImg[type].frm;
	var c = fishImg[type].c;
	var fish = new ofish(img, w, h , maxFrame, c);
	fish.init();
	_fish.push(fish);
},Math.random()*400 + 400);

function addFishGroup(){ //出现一群鱼
	for(var i =0;i<_fish.length;i++){
		if(_fish[i].alive){
			_fish[i].fishFrame();
			_fish[i].draw();
			_fish[i].move();
		}else{
			_fish[i].deadFrame();
			_fish[i].draw();
			if(_fish[i].frm >= _fish[i].maxFrm){
				_fish.splice(i--,1);
			}
		}
	}
}

function drawBar(){
	for(var i = 0; i<sources.length; i++){
		bar = new toolBar(sources[i].src, sources[i].x, sources[i].y, sources[i].w, sources[i].h);
		bar.draw();
	}
}
function changeBattey(angle){
	battery = new batteryObj(batImg[battSize].src,batImg[battSize].x,batImg[battSize].y,batImg[battSize].w,batImg[battSize].h);
	battery.rotate = angle;
}
canvas.addEventListener("mousedown",function(e){
	e = e || window.event;
	var x = e.offsetX || e.layerX;
	var y = e.offsetY || e.layerY;
	if(score > 0){
		if(x>560 && x<590 && y>716 && y<736){
			changeBatAudio();
			if(battSize){
				battSize--;
			}else{
				battSize = 6;
			}
			changeBattey(battery.rotate);
		}else if(x>695 && x<730 && y>716 && y<736){
			changeBatAudio();
			if(battSize == 6){
				battSize = 0;
			}else{
				battSize++;
			}
			changeBattey(battery.rotate);
		}else if(x<220 || x>=220 && y<705 || x>980){
			if(score < shellImg[battSize].m){
				battSize--;
				changeBattey(battery.rotate);
			}else{
				shutAudioInit();
				var shell = new shellObj(shellImg[battSize].src,shellImg[battSize].x,shellImg[battSize].y,shellImg[battSize].w,shellImg[battSize].h,shellImg[battSize].m);
				_shell.push(shell);
				var angle =  Math.PI - Math.atan2(x-battery.x,y-battery.y);
				battery.rotate = angle;
				shell.rotate = angle;
				shell.shut = true;	//当发射一枚炮弹后开启move()
				score -= shellImg[battSize].m;
				netSize = battSize;
			}
		}
	}else{
		overFlag = true;
	}
});
function isOut(_obj){ //是否出界
	for(var i =0;i<_obj.length;i++){
		var obj = _obj[i];
		if(obj.x<-obj.w || obj.x>canvas.width+obj.w || obj.y<-obj.h || obj.y>canvas.width+obj.h){
			_obj.splice(i--,1);	//删除第一个对象后由于改变了数组第二个对象的下标将要减少1
		}
	}
}
function isShut(){	//判断是否发射了炮弹，如果发射了炮弹就执行move()和draw()
	var len = _shell.length;
	if(len > 0){
		for(var i = 0;i<len;i++){
			_shell[i].draw();
			_shell[i].move();
		}
	}
}

function hasCollided(){	//是否碰撞
	if(_fish.length && _shell.length){
		for(var i =0;i<_fish.length;i++){
			if(_fish[i].alive){
				for(var j =0;j<_shell.length;j++){
					var rand = Math.random();
					var dis = util.getDistance(_fish[i].x, _fish[i].y, _shell[j].x, _shell[j].y);
					if(dis <= _fish[i].h/1.5){
						hitAudioInit();
						var net = new netObj(netImg[netSize].src, _shell[j].x, _shell[j].y, netImg[netSize].w, netImg[netSize].h);
						_net.push(net);
						if(rand <= _shell[j].m/_fish[i].c){ //命中概率
							coinAudio();
							score += _fish[i].c;
							var coin = new coinObj(coinImg, _fish[i].x, _fish[i].y, _fish[i].c);
							_coin.push(coin);
							_fish[i].frm = _fish[i].maxFrm;
							_fish[i].maxFrm = _fish[i].maxFrm * 2 - 1;
							_fish[i].timeInterval = 500;
							_fish[i].alive = false;
							_fish.splice(j--,1);
						}
						_shell.splice(j--,1);
						break;
					}
				}
			}
		}
	}
	
}

function drawFishNet(){		//绘制渔网
	var len = _net.length;
	for(var i = 0;i < len; i++){
		_net[i].draw();
		_net[i].netTime += deltaTime;
		if(_net[i].netTime >= _net[i].netInterval){
			_net.splice(i--,1);
			break;
		}
	}
}

function drawCoin(){		//绘制金币
	var len = _coin.length;
	for(var i = 0;i < len; i++){
		_coin[i].draw();
		_coin[i].move();
		_coin[i].coinTime += deltaTime;
		if(_coin[i].coinTime >= _coin[i].coinInterval){
			_coin.splice(i--,1);
			break;
		}
	}
}

function scoring(scoreImg,score){
	var img = new Image();
	img.src = scoreImg;
	var num = score.toString();
	var len = num.length;
	ctx.save();
	ctx.translate(353,718);
	for(var i = 1; i<=len;i++){
		var frm = 9 - Number(num.substr([len-i],1));
		ctx.drawImage(img,0,24*frm,20,24,-24*(i-1),0 ,20,24);
	}
	ctx.restore();
}

function gameOver(flag){
	if(flag){
		ctx.fillStyle = "#fff";
		ctx.font = "50px sans-serif";
		ctx.fillText("游戏结束！", cvswidth/2 - 125,cvsheight/2);
	}
}

//音频播放   
var loadAudioLen=0;//已加载的声音数
var AudioList={};//缓存已加载的声音
var audiolen=2;//要加载的声音总数
//支持声音的类型
(function(){
    var types=  {
        'mp3' : 'audio/mpeg',
        'ogg' : 'audio/ogg',
        'wav' : 'audio/wav',
        'aac' : 'audio/aac',
        'm4a' : 'audio/x-m4a'
    }
    //获取文件的扩展名
    function getExt(filename) {
            return filename.split('.').pop();
        }
    var audioList = { //要加载的清单
        bg: ["audio/bgmusic2.mp3"],
        hit: ["audio/hit.mp3"],
        shut: ["audio/shut.mp3"],
        change: ["audio/changeBattery.mp3"],
        coin: ["audio/coin.mp3"]
    };
    //循环上面的清单
    for(name in audioList){
        var Audio = document.createElement('audio');//创建audio元素
        var source = document.createElement('source');//创建source元素
        var srcArray = audioList[name];//取到要加载的各种声音文件数组
        for(var i=0;i<srcArray.length;i++){
            source.src=srcArray[i];
            source.type = types[getExt(source.src)];
            Audio.appendChild(source);
        }
        Audio.playname = name;
        Audio.onloadeddata=audioOnload(Audio);
        Audio.onerror = function(e){
            alert("资源加载时发生错误！"+this.playname);
        }
    }
})();

function  audioOnload(Audio){
   loadAudioLen++;
    AudioList[Audio.playname] = Audio;
    if(loadAudioLen==audiolen){//所有声音加载完成后执行init()
        bgAudioInit();
    }
}
function bgAudioInit(){
	AudioList["bg"].play();//要播放声音，只要这样做就行了。
    AudioList["bg"].loop = true;
}
function hitAudioInit(){
	AudioList["hit"].currentTime = 0;
	AudioList["hit"].play();
}
function shutAudioInit(){
	AudioList["shut"].currentTime = 0;
	AudioList["shut"].play();
}
function changeBatAudio(){
	AudioList["change"].currentTime = 0;
	AudioList["change"].play();
}
function coinAudio(){
	AudioList["coin"].currentTime = 0;
	AudioList["coin"].play();
}