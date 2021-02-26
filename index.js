const canv = document.getElementById('players'),
ctx = canv.getContext('2d');	

canv.width = 800;
canv.height = 500;


document.oncontextmenu = ()=> {return false;}

let Player = {
	y: canv.height/2,
	x: canv.width/2,
	constants:
	{
		power:
		{
			jump: 60,
			gravity: 10,
			jerk: 70,
			flip: 30
		},
		progression:
		{
			jump: 0.8,
			gravity: 0.8,
			jerk: 0.9,
			flip: 0.8
		}
	},
	life:
	{
		hp: 100,
		alive: true
	},
	status:
	{
		atack: false,
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
		run: 2,
		gravity: 10,
		jump: 30,
		jerk: 70,
		flip: 30
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
	mous: 
	{
		x:0, y:0,
		vector:
		{
			dx:0, dy:0
		}
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
		this.setMousData();
		this.changeStatus();
		this.doStap();
		this.doJump();
		this.doFlip();
		this.doGravity();
		this.doJerk();
	},

	checkCollision()
	{
		if(this.y + 60 >= 500 && !this.status.jump)
			this.listener.collision.down.start(this, {x:0,y:440});
		else
			this.listener.collision.down.end(this);
	},

	listener:
	{
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
				if(player.speeds.jump < 1)
					player.status.jump = false;
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
				if(player.speeds.flip < 1)
					player.status.flip = false;
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
				if(player.speeds.jerk < 1)
					player.status.jerk = false;
			},
			end(player)
			{
				player.status.jerk = false;
				player.speeds.jerk = player.constants.power.jerk;
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

					player.reload.jump = true;
					player.reload.flip = false;
				},
				end(player)
				{
					player.collision.down = false;
				}
			}
		}
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

		this.listener.jump.make(this);

		this.speeds.jump *= this.constants.progression.jump;
		this.y -= this.speeds.jump;
	},

	doFlip()
	{
		if(!this.status.flip)
			return;

		this.listener.flip.make(this);

		this.speeds.flip *= this.constants.progression.flip;
		this.y -= this.speeds.flip;
	},

	doJerk()
	{
		if(!this.status.jerk)
			return;

		this.listener.jerk.make(this);

		this.speeds.jerk *= this.constants.progression.jerk;

		this.x += this.speeds.jerk * this.directions.jerk.vector.dx;
		this.y += this.speeds.jerk * this.directions.jerk.vector.dy;
	},

	doGravity()
	{
		if(!this.status.gravity)
			return;

		this.speeds.gravity /= this.constants.progression.gravity;
		this.y += this.speeds.gravity;
	},

	setMousData()
	{
		let vx = this.mous.x - this.x,
			vy = this.mous.y - this.y

		let dist = Math.sqrt(vx * vx + vy * vy);

		this.mous.vector.dx = vx / dist;
		this.mous.vector.dy = vy / dist;
	},

	onClick(key)
	{
		//
	}
}







const player = new Image()
player.src = 'img/sp/platform.png'

setInterval((e)=>{ ctx.clearRect(0, 0, canv.width, canv.height); ctx.drawImage(player, Player.x, Player.y); Player.processing();}, 60)







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
