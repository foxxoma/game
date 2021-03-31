

class FIELD {
	constructor(y, x){
		this.y = y*64,
		this.x = x*64,
		this.tree = false,
		this.bush = false,
		this.pine = false,
		this.contact = false

	}
	draw(){
		if(this.num === 1){
			ctxB.drawImage(fieldImg.platform1, this.x, this.y)
		}
		if(this.num === 2){
			ctxB.drawImage(fieldImg.platform2, this.x, this.y)
		}
		if(this.num === 3){
			ctxB.drawImage(fieldImg.platform3, this.x, this.y)
		}
		if(this.num === 4){
			ctxB.drawImage(fieldImg.platform4, this.x, this.y)
		}
		if(this.num === 5){
			ctxB.drawImage(fieldImg.platform5, this.x, this.y)
		}
		if(this.num === 6){
			ctxB.drawImage(fieldImg.platform6, this.x, this.y)
		}
		if(this.num === 7){
			ctxB.drawImage(fieldImg.platform7, this.x, this.y)
		}
		if(this.num === 8){
			ctxB.drawImage(fieldImg.platform8, this.x, this.y)
		}
		if(this.num === 9){
			ctxB.drawImage(fieldImg.platform9, this.x, this.y)
		}
		

		if(this.tree){
			ctxB.drawImage(fieldImg.tree, this.x, this.y-256)
		}
		if(this.pine){
			ctxB.drawImage(fieldImg.pine, this.x, this.y-256)
		}
		if(this.bush){
			ctxB.drawImage(fieldImg.bush, this.x, this.y-64)
		}
	}
}


const spCreate = (x, y, len)=> {
	for(let i = 0; i< len; i++){
		if(i === 0){Field.coordinates[y][x+i].num = 1}
		else if(i === len - 1){
			Field.coordinates[y][x+i].num = 3
		}
		else {
			Field.coordinates[y][x+i].num = 2
		}
	}
}

const spCreatePlatform = (x, y, len)=> {
	for(let i = 0; i< len; i++){
		Field.coordinates[y][x+i].num = 2
	}
}

const spCreateWall = (x, y, len)=> {
	for(let i = 0; i< len; i++){
		Field.coordinates[y+i][x].num = 9
	}
}




