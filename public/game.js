const canv = document.getElementById('players'),
	background = document.getElementById('background'),
	ctxB = background.getContext('2d'),
	ctx = canv.getContext('2d');

background.height = 700;
background.width = 1000;
canv.width = 1000;
canv.height = 700;

document.oncontextmenu = ()=> {return false;}


let Room = {
	id: '',
	lvl: 2,
	bots: 4
};

const Support = {
	damageMessConstructor(id, damage, room)
	{
		return {id, damage, room};
	},
	messConstructor(id, player, room)
	{
		return {id, player, room};
	},
	getVector(x1,y1,x2,y2)
	{
		let vx = x2 - x1,
			vy = y2 - y1,
			result = {};

		let dist = Math.sqrt(vx * vx + vy * vy);

		result.dx = vx / dist;
		result.dy = vy / dist;

		return result;
	},
	setImage(src)
	{
		let img = new Image();
		img.src = src;
		return img;
	},
	random(max, min)
	{
		return Math.random() * (max - min) + min;
	}
};

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
		background.height = 19 * this.cell.size;
		background.width = 50 * this.cell.size;
		canv.width = 50 * this.cell.size;
		canv.height = 19 * this.cell.size;
	},
	fieldStart()
	{
		for(let y = 0; y < 19; y++)
		{
			this.coordinates[y] = [];
			for(let x = 0; x < 50; x++)
			{
				this.coordinates[y][x] = new FIELD(y,x);
				this.coordinates[y][x].num = 0;
			}
		}
		this.fieldCreate();
	},
	fieldCreate()
	{
		fieldCreate();
		setTimeout(function() {Field.drawField();}, 1000);
	},
	drawField()
	{
		for(let y = 0; y < 19; y++)
		{
			for(let x = 0; x < 50; x++)
			{
				this.coordinates[y][x].draw();
			}
		}
	}
};

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
			Listener.run.end(player);
		else
			Listener.run.start(player);
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
			Listener.run.end(player);
		else
			Listener.run.start(player);
	},
	up(player)
	{
		if(player.reload.jump)
			Listener.jump.start(player);
		else
		{
			if(player.reload.flip)
				Listener.flip.start(player);
		}
	},
	jerk(player)
	{
		if(player.reload.jerk)
		{
			player.directions.jerk.vector = Support.getVector(player.x, player.y, player.mouse.x, player.mouse.y);
			Listener.jerk.start(player);
		}
	},
	shells(player)
	{
		if(player.reload.shells)
			Listener.shells.start(player);
	}
};
