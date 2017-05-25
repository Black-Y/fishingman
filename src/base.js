var util = {
	loadImages : function(sources, callback){
	    var count = 0,  
	        images ={},  
	        imgNum = 0; 
	    for(var src in sources){
	    	imgNum++; 
	        images[src] = new Image();  
	        images[src].onload = function(){  
	            if(++count >= imgNum){  
	                callback(images);  
	            }  
	        }  
	        images[src].src = sources[src];  
	    }  
	},
		//弧度转角度
	d2a : function(n){
		return n * Math.PI / 180;
	},
		//角度转弧度
	a2d: function(n){
		return n * 180 / Math.PI;
	},
	getFishProbability : function(num){
		if(num < 20 && num >= 0){ //20%
			return 0;
		}else if(num < 35 && num > 19){ //15%
			return 1;
		}else if(num < 47 && num > 34){ //12%
			return 2;
		}else if(num < 57 && num > 46){ //10%
			return 3;
		}else if(num < 65 && num > 56){ //8%
			return 4;
		}else if(num < 73 && num > 64){ //8%
			return 5;
		}else if(num < 80 && num > 72){ //7%
			return 6;
		}else if(num < 87 && num > 79){ //7%
			return 7;
		}else if(num < 92 && num > 86){ //5%
			return 8;
		}else if(num < 97 && num > 91){ //5%
			return 9;
		}else if(num < 99 && num > 96){ //2%
			return 10;
		}else if(num < 100 && num > 98){ //1%	
			return 11;
		}
	},
	getDistance : function(x1, y1, x2, y2){
		var dx = Math.abs(x1 - x2);
		var dy = Math.abs(y1 - y2);
		return Math.sqrt(dx*dx + dy*dy);
	}
};
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();
