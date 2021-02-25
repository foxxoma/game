class Player
{
	constructor(name)
	{
		this.name = name,
		this.vSpeed = 0,
		this.position = {
			x:0, y:0
		},
		this.dimensions = {
			w:64, h:64
		},
		this.collision = {
			yUp: false,
			yDown: false,
			xLeft: false,
			xRight: false
		},
		this.focus = {
			x: this.position.x + this.dimensions.w / 2,
			y: this.position.y + this.dimensions.h / 2
		}
	}

	toCollision()
	{
		
	}

	
}