var ofish = function(img, w, h, maxFrm, c){
	this.x = 0;
	this.y = 0;
	this.w = w;
	this.h = h;
	this.c = c; //鱼的价值
	this.img = img;
	this.maxFrm = maxFrm;
	this.frm = 1;
	this.timeInterval = 200;
	this.fishTime = 0;
	this.speed = Math.random() + .5;//鱼游动的速度
	this.rotate = 0;//鱼游动的角度
	this.alive = true;
}
ofish.prototype.init = function(){
	var r = Math.random();
	this.y = Math.floor(Math.random()*canvas.height/2 + canvas.height/4);
	if(r > 0.5){ 					//鱼从右边出现
		this.x = canvas.width + this.w;
		this.rotate = Math.random() * 120 - 240;
	}else{ 							//鱼从左边出现
		this.x = -this.w/2;
		this.rotate = Math.random() * 120 - 60;
	}
}
ofish.prototype.draw = function(){
	var img = new Image();
	img.src = this.img;
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(util.d2a(this.rotate));
	if(Math.abs(this.rotate) >= 90){//如果角度的绝对值大于90度 那么就翻转
		ctx.scale(1, -1);
	}
	ctx.drawImage(img,0,this.h*this.frm,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
	ctx.restore();
}
ofish.prototype.fishFrame = function(){
	this.fishTime += deltaTime;
	if(this.fishTime >= this.timeInterval/this.speed){
		this.frm++;
		if(this.frm > this.maxFrm - 1){
			this.frm = 1;
		}
		this.fishTime %= this.timeInterval/this.speed;
	}
}
ofish.prototype.deadFrame = function(){
	this.fishTime += deltaTime;
	if(this.fishTime >= this.timeInterval){
		this.frm++;
	}
}
ofish.prototype.move = function(){
	this.x += Math.cos(util.d2a(this.rotate)) * this.speed;
	this.y += Math.sin(util.d2a(this.rotate)) * this.speed;
}

