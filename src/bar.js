function toolBar(img,x,y){
	this.x = x;
	this.y = y;
	this.frm = 1;
	this.img = img;
}
toolBar.prototype.draw = function(){
	var img = new Image();
	img.src = this.img;
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.drawImage(img, 0, 0);
	ctx.restore();
};
