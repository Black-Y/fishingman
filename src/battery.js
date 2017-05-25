function batteryObj(img,x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.rotate = 0;
	this.frm = 1;
	this.img = img;
}
batteryObj.prototype.draw = function(){
	var img = new Image();
	img.src = this.img;
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.rotate);
	ctx.drawImage(img,-this.w/6,this.h,this.w,this.h, -this.w/1.5, -this.h/2,this.w,this.h);
	ctx.restore();
}; 
