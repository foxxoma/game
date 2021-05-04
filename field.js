class FIELD
{
	constructor(y, x)
	{
		this.y = y*64,
		this.x = x*64,
		this.tree = false,
		this.bush = false,
		this.pine = false,
		this.contact = false,
		this.generator = false
	}
	draw()
	{
		if(this.num === 1)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 2)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 3)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 4)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 5)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 6)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 7)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 8)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		if(this.num === 9)
			ctxB.drawImage(FieldImg.super_platform, this.x, this.y);
		
		

		if(this.generator)
			ctxB.drawImage(FieldImg.generator, this.x, this.y-64);

		if(this.decor)
			ctxB.drawImage(FieldImg.decor, this.x, this.y-64);

		if(this.anten)
			ctxB.drawImage(FieldImg.anten, this.x, this.y-256);
		// if(this.pine){
		// 	ctxB.drawImage(FieldImg.pine, this.x, this.y-256)
		// }
		// if(this.bush){
		// 	ctxB.drawImage(FieldImg.bush, this.x, this.y-64)
		// }
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




