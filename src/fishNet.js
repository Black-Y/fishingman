function netObj(img,x,y,w,h){
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.netTime = 0;
	this.netInterval = 200;
}
netObj.prototype.draw = function(){
	var img = new Image();
	img.src = this.img;
	ctx.drawImage(img,this.x - this.w/2,this.y - this.h/1.8);
}
