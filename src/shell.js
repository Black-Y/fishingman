function shellObj(img,x,y,w,h,m){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.m = m;
	this.rotate = 0;
	this.frm = 1;
	this.img = img;
	this.speed = 7;//炮弹的速度
	this.shut = false;
}
shellObj.prototype.draw = function(){
	var img = new Image();
	img.src = this.img;
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.rotate);
	ctx.drawImage(img,-this.w/2, -this.h);
	ctx.restore();
}; 
shellObj.prototype.move = function(){
	if(this.shut){
		this.x += -Math.sin(Math.PI/180 - this.rotate) * this.speed;
		this.y += -Math.cos(Math.PI/180 -this.rotate) * this.speed;
	}
}
