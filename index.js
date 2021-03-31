const canv = document.getElementById('players'),
background = document.getElementById('background'),
ctxB = background.getContext('2d'),
ctx = canv.getContext('2d');

background.height = 700;
background.width = 1000;
canv.width = 1000;
canv.height = 700;

document.oncontextmenu = ()=> {return false;}

let Field = {
	cell:
	{
		size: 64,
	},
	cellidth: 1000,
	height: 700,
	coordinates: [],
	init()
	{
		this.fieldStart();
		background.height = 19* this.cell.size;
		background.width = 50* this.cell.size;
		canv.width = 50* this.cell.size;
		canv.height = 19* this.cell.size;
	},
	fieldStart()
	{
		for(let y = 0; y< 19; y++)
		{
			this.coordinates[y] = []
			for(let x= 0; x< 50; x++)
			{
				this.coordinates[y][x] = new FIELD(y,x)
				this.coordinates[y][x].num = 0;
			}
		}
		this.fieldCreate();
	},
	fieldCreate()
	{
		fieldCreate();
		setTimeout(function() {Field.drawField();}, 500);
	},
	drawField()
	{
		for(let y = 0; y< 19; y++)
		{
			for(let x= 0; x< 50; x++)
			{
				this.coordinates[y][x].draw();
			}
		}
	}
}

Field.init();

let OnClick = {
	left(player, e)
	{
		if(e == 'keydown')
		{
			player.status.left = true;
		}

		if(e == 'keyup')
			player.status.left = false;

		if(!player.status.right && !player.status.left)
			player.listener.run.end(player);
		else
			player.listener.run.start(player);
	},
	right(player,e)
	{
		if(e == 'keydown')
		{
			player.status.right = true;
		}

		if(e == 'keyup')
			player.status.right = false;

		if(!player.status.right && !player.status.left)
			player.listener.run.end(player);
		else
			player.listener.run.start(player);
	},
	up(player)
	{
		if(player.reload.jump)
			player.listener.jump.start(player);
		else
		{
			if(player.reload.flip)
				player.listener.flip.start(player);
		}
	},
	jerk(player)
	{
		if(player.reload.jerk)
		{
			player.directions.jerk.vector = Support.getVector(player.x, player.y, player.mouse.x, player.mouse.y);
			player.listener.jerk.start(player);
		}
	},
	shells()
	{
		//
	}
}