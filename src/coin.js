function coinObj(img,x,y,c){
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = 36;
	this.h = 49;
	this.coinTime = 0;
	this.coinInterval = 500;
	this.c = c;
}
coinObj.prototype.draw = function(){
	var num = this.c.toString();
	var len = num.length;
	ctx.save();
	ctx.translate(this.x+this.w*1.5,this.y);
	ctx.drawImage(this.img,360,0,36,49,36,-50 ,36,49);
	for(var i = 1; i<=len;i++){
		var frm = Number(num.substr([len-i],1));
		ctx.drawImage(this.img,36*frm,0,36,49,-36*(i-1),-50 ,36,49);
	}
	ctx.restore();
}
coinObj.prototype.move = function(){
	this.y -= 2;
}