const canv = document.getElementById('players'),
ctx = canv.getContext('2d');	

canv.width = 1000;
canv.height = 700;


document.oncontextmenu = ()=> {return false;}

let Player = {
	y: canv.height/2,
	x: canv.width/2,
	size: 60,
	constants:
	{
		power:
		{
			jump: 50,
			gravity: 4,
			jerk: 55,
			flip: 50
		},
		progression:
		{
			jump: 0.9,
			gravity: 0.9,
			jerk: 0.97,
			flip: 0.9
		}
	},
	life:
	{
		hp: 100,
		alive: true
	},
	status:
	{
		right: false,
		left: false,
		jump: false,
		flip: false,
		jerk: false,
		shells: false,
		gravity: false,
		standing: false,
		damage: false
	},
	speeds:
	{
		run: 8,
		gravity: 4,
		jump: 50,
		jerk: 55,
		flip: 50
	},
	reload:
	{
		jump: false,
		flip: false,
		jerk: true,
		shells: true,
	},
	collision:
	{
		up: false,
		down: false,
		left: false,
		right: false
	},
	mouse: 
	{
		x:0, y:0
	},
	directions:
	{
		jerk:
		{ 
			x:0, y:0,
			vector:
			{
				dx:0, dy:0
			}
		}
	},
	shells: [],
	animation:
	{
		current: 'stop',
		direction:
		{
			right: true,
			left: false
		}
	},

	processing()
	{
		this.checkCollision();
		this.changeStatus();
		this.doStap();
		this.doJump();
		this.doFlip();
		this.doGravity();
		this.doJerk();
	},

	checkCollision()
	{
		if(this.y + this.size >= 600 && this.y <= 600 + Field.cell.size && !this.status.jump && this.x > 300 && this.x < 600)
			this.listener.collision.down.start(this, {x:0,y:600 - this.size});
		else
			this.listener.collision.down.end(this);
	},

	listener:
	{
		mouse:
		{
			move(player, e)
			{
				player.mouse.x = e.pageX;
				player.mouse.y = e.pageY;
			},
			click(player, e)
			{
				//
			}
		},
		stap:
		{
			start(player)
			{
				player.status.stap = true;
			},
			make(player)
			{
			},
			end(player)
			{
				player.status.stap = false;
			}
		},
		jump:
		{
			start(player)
			{
				if(!player.reload.jump)
					return;

				player.status.jump = true;

				player.listener.gravity.end(player);

				player.reload.jump = false;
				player.reload.flip = true;
			},
			make(player)
			{	
				if(player.speeds.jump < 2)
					player.listener.jump.end(player);
			},
			end(player)
			{
				player.status.jump = false;
				player.speeds.jump = player.constants.power.jump;
			}
		},
		flip:
		{
			start(player)
			{
				if(!player.reload.flip)
					return;

				player.status.flip = true;

				player.listener.gravity.end(player);
				player.listener.jump.end(player);

				player.reload.flip = false;
			},
			make(player)
			{
				if(player.speeds.flip < 2)
					player.listener.flip.end(player);
			},
			end(player)
			{
				player.status.flip = false;
				player.speeds.flip = player.constants.power.flip;
			}
		},
		jerk:
		{
			start(player)
			{
				if(!player.reload.jerk)
					return;

				player.status.jerk = true;

				player.listener.gravity.end(player);
				player.listener.jump.end(player);

				player.reload.jump = false;
				player.reload.jerk = false;
				player.reload.flip = true;
			},
			make(player)
			{
				if(player.speeds.jerk < 40)
					player.listener.jerk.end(player);

				player.reload.jump = false;
				player.reload.flip = true;
			},
			end(player)
			{
				player.status.jerk = false;
				player.speeds.jerk = player.constants.power.jerk;
				player.listener.jerk.load(player, 2000);
			},
			load(player, time)
			{	
				setTimeout(()=>{
					player.reload.jerk = true;
				},time);
			}

		},
		gravity:
		{
			start(player)
			{
				player.status.gravity = true;

				player.listener.jump.end(player);

				player.reload.jump = false;
			},
			make(player)
			{
				if(player.speeds.gravity >= 55)
					player.speeds.gravity = 55;
			},
			end(player)
			{
				player.status.gravity = false;
				player.speeds.gravity = player.constants.power.gravity;
			}
		},
		collision:
		{
			up:
			{
				start(player)
				{
					player.collision.up = true;

					if(player.status.jump)
					{
						player.listener.jump.end(player);

						player.reload.jump = false;
					}
					if(player.status.jerk)
					{
						player.listener.jerk.end(player);

						player.reload.jerk = false;
					}
					if(player.status.flip)
					{
						player.listener.flip.end(player);

						player.reload.flip = false;
					}
				},
				end(player)
				{
					player.collision.up = false;
				}	
			},
			down:
			{
				start(player, object)
				{
					player.y = object.y;
					player.collision.down = true;

					player.listener.gravity.end(player);
					// player.listener.jerk.end(player);

					player.reload.jump = true;
					player.reload.flip = false
				},
				end(player)
				{
					player.collision.down = false;
				}
			}
		}
	},

	getVector(x,y)
	{
		let vx = x - this.x,
			vy = y - this.y,
			result = {};

		let dist = Math.sqrt(vx * vx + vy * vy);

		result.dx = vx / dist;
		result.dy = vy / dist;

		return result;
	},

	changeStatus()
	{
		if(!this.status.jump && !this.collision.down && !this.status.jerk && !this.status.flip)
			this.listener.gravity.start(this);
	},

	doStap()
	{
		if(this.status.right && !this.collision.right)
			this.x += this.speeds.run;
		else
		{
			if(this.status.left && !this.collision.left)
				this.x -= this.speeds.run;
		}
	},

	doJump()
	{
		if(!this.status.jump)
			return;

		this.speeds.jump *= this.constants.progression.jump;

		this.y -= this.speeds.jump;

		this.listener.jump.make(this);
	},

	doFlip()
	{
		if(!this.status.flip)
			return;

		this.speeds.flip *= this.constants.progression.flip;
		this.y -= this.speeds.flip;

		this.listener.flip.make(this);
	},

	doJerk()
	{
		if(!this.status.jerk)
			return;

		this.speeds.jerk *= this.constants.progression.jerk;

		this.x += this.speeds.jerk * this.directions.jerk.vector.dx;
		this.y += this.speeds.jerk * this.directions.jerk.vector.dy;

		this.listener.jerk.make(this);
	},

	doGravity()
	{
		if(!this.status.gravity)
			return;

		this.speeds.gravity /= this.constants.progression.gravity;
		this.y += this.speeds.gravity;

		this.listener.gravity.make(this);
	},

	onClick:
	{
		left(player, e)
		{
			if(e == 'keydown')
				player.status.left = true;

			if(e == 'keyup')
				player.status.left = false;
		},
		right(player,e)
		{
			if(e == 'keydown')
				player.status.right = true;

			if(e == 'keyup')
				player.status.right = false;
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
				player.directions.jerk.vector = player.getVector(player.mouse.x, player.mouse.y);
				player.listener.jerk.start(player);
			}
		},
		shells()
		{
			//
		}
	}
}


document.addEventListener('keydown', (e)=> {
	if(e.code == 'KeyA')
		Player.onClick.left(Player,'keydown');

	if(e.code == 'KeyD')
		Player.onClick.right(Player,'keydown');

	if(e.code == 'KeyW')
		Player.onClick.up(Player);

	if(e.code == 'KeyE')
		Player.onClick.jerk(Player);
});

document.addEventListener('keyup', (e)=> {
	if(e.code == 'KeyA')
		Player.onClick.left(Player,'keyup');

	if(e.code == 'KeyD')
		Player.onClick.right(Player,'keyup');
});

document.addEventListener('mousemove',(e)=>{
	Player.listener.mouse.move(Player, e);
});

document.addEventListener('mousedown', (e)=> {
	Player.listener.mouse.click(Player, e);
});


const player = new Image()
player.src = 'img/sp/platform.png'

setInterval((e)=>{ctx.clearRect(0, 0, canv.width, canv.height); ctx.drawImage(player, Player.x, Player.y); Player.processing();}, 20)







let Animation = {
	fps: 60,
	player: {},
	field: {},
	init()
	{
		//
	},
	rendering()
	{
		//
	}
}

let Field = {
	cell:
	{
		size: 60,
	},
	cellidth: 1000,
	height: 500,
	coordinates: [],
	init()
	{
		//
	}
}

document.oncontextmenu = ()=>{return false}
