function toolBar(img,x,y){
	this.x = x;
	this.y = y;
	this.frm = 1;
	this.img = img;
}
toolBar.prototype.draw = function(){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.drawImage(this.img, 0, 0);
	ctx.restore();
};
