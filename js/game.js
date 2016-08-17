function game(sence){
	this.sence=sence;
	this.num=4;
	this.speed=3;
	this.score=0;
	this.level=1;
	this.life=10;
	this.flag=false;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
}
// 获取指定数量的字母
game.prototype.getLetter=function(num){
	var that=this;
	for(var i=0;i<num;i++){
		if(num==0){
			return;
		}
		var let=that.letter[Math.floor(Math.random()*26)];
		for(var j=0;j<that.letterArr.length;j++){
			while(let==that.letterArr[j]){
				let=that.letter[Math.floor(Math.random()*26)];
			}
		}
		var imgs=document.createElement("img");
		imgs.style.cssText="height:100px;position:absolute;top:"+(300*Math.random()-200)+"px;left:"+((that.cw-300)*Math.random()+50)+"px;";
		imgs.src="images/"+let+".jpg";
		imgs.className=imgs.src.slice(-5,-4);
		that.sence.appendChild(imgs);
		that.letterArr.push(let)
	}
}
// 落下字母 消除超出界面的字母 重新获取字母
game.prototype.play=function(){
	var that=this;
	that.flag=true;
	if(!that.flag){
		that.flag=false;
		return;
	}
	var t=setInterval(function(){
		if(that.num>that.letterArr.length){
			that.getLetter(that.num-that.letterArr.length)
		}
		var allimg=document.getElementsByTagName('img');
		for(var i=0;i<allimg.length;i++){
			var imgTop=parseInt(allimg[i].style.top);
			var imgHeight=parseInt(allimg[i].style.height);
			allimg[i].style.top=imgTop+that.speed+"px";
			if(that.ch<(imgTop+imgHeight+30)){
				for(var j=0;j<that.letterArr.length;j++){
					if(allimg[i].className==that.letterArr[j]){
						that.letterArr.splice(j,1);
					}
				}
				that.sence.removeChild(allimg[i]);
				allimg[i]==null;
			}
		}
	},50)
}
// 消除字字母
game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;

		// 别人的方法
		var key=String.fromCharCode(ev.keyCode);
		var checkImg=document.getElementsByClassName(key);
		if(checkImg.length>0){
			for(var j=0;j<that.letterArr.length;j++){
				if(that.letterArr[j]==checkImg[0].className){
					that.letterArr.splice(j,1);
				}
			}
		console.log(that.letterArr)
			that.sence.removeChild(checkImg[0]);
			checkImg[0]==null;
		}


		// // 我的方法
		// var allimg=document.getElementsByTagName('img');
		// for(var i=0;i<allimg.length;i++){
		// 	var key=String.fromCharCode(ev.keyCode)
		// 	if(key==allimg[i].className){
		// 		for(var j=0;j<that.letterArr.length;j++){
		// 			if(key==that.letterArr[j]){
		// 				that.letterArr.splice(j,1);
		// 			}
		// 		}
		// 		that.sence.removeChild(allimg[i]);
		// 		allimg[i]==null;
		// 	}
		// }
	}
}
