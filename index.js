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
			jump: 30,
			gravity: 4,
			jerk: 50,
			flip: 30
		},
		progression:
		{
			jump: 0.9,
			gravity: 0.9,
			jerk: 0.97,
			flip: 0.9
		},
		finishSpeed:
		{
			jump: 2,
			gravity: 55,
			jerk: 40,
			flip: 2
		}
	},
	life:
	{
		hp: 100,
		alive: true
	},
	status:
	{
		run: false,
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
		jump: 30,
		jerk: 50,
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
		current: 'flip',
		iterationTime: 300,
		stap: 1,
		direction: 'right'
	},

	processing()
	{
		this.checkCollision();
		this.checkStatus();
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

		if(this.y < 300 + Field.cell.size && this.y > 300  && this.x > 300 && this.x < 600)
			this.listener.collision.up.start(this, {x:0,y:300 + Field.cell.size});
		else
			this.listener.collision.up.end(this);
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
		run:
		{
			start(player)
			{
				player.status.run = true;

				if(!player.status.jerk)
					player.animation.direction = player.status.right?'right':'left';
			},
			make(player)
			{
			},
			end(player)
			{
				player.status.run = false;
			},
			animation:
			{
				start(player)
				{
					player.animation.current = 'run';
					player.animation.stap = 1;
					player.animation.iterationTime = '200';
				},
				make(player)
				{
					//
				},
				end(player)
				{
					//
				}
			}
		},
		standing:
		{
			start(player)
			{
				player.status.standing = true;
			},
			make(player)
			{
			},
			end(player)
			{
				player.status.standing = false;
			},
			animation:
			{
				start(player)
				{	
					player.animation.current = 'standing';
					player.animation.stap = 1;
					player.animation.iterationTime = '500';
				},
				make(player)
				{
					//
				},
				end(player)
				{
					//
				}
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

				player.listener.jump.animation.start(player);
			},
			make(player)
			{	
				if(player.speeds.jump < player.constants.finishSpeed.jump)
					player.listener.jump.end(player);
			},
			end(player)
			{
				player.status.jump = false;
				player.speeds.jump = player.constants.power.jump;
			},
			animation:
			{
				start(player)
				{	
					player.animation.current = 'jump';
					player.animation.stap = 1;
					player.animation.iterationTime = '200';
				},
				make(player)
				{
					//
				},
				end(player)
				{
					//
				}
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

				player.listener.flip.animation.start(player);
			},
			make(player)
			{
				if(player.speeds.flip < player.constants.finishSpeed.flip)
					player.listener.flip.end(player);
			},
			end(player)
			{
				player.status.flip = false;
				player.speeds.flip = player.constants.power.flip;
			},
			animation:
			{
				start(player)
				{
					player.animation.current = 'flip';
					player.animation.stap = 1;
					player.animation.iterationTime = '70';
				},
				make(player)
				{
					if(player.animation.stap == Images[player.animation.current][player.animation.direction].length)
						player.listener.jump.animation.start(player);
				},
				end(player)
				{
					//
				}
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

				player.animation.direction = player.directions.jerk.vector.dx > 0?'right':'left';
			},
			make(player)
			{
				if(player.speeds.jerk < player.constants.finishSpeed.jerk + 2)
					player.listener.jerk.animation.start(player);

				if(player.speeds.jerk < player.constants.finishSpeed.jerk)
					player.listener.jerk.end(player);

				player.reload.jump = false;
				player.reload.flip = true;
			},
			end(player)
			{
				player.listener.jerk.animation.start(player);
				player.status.jerk = false;
				player.speeds.jerk = player.constants.power.jerk;
				player.listener.jerk.load(player, 2000);
			},
			load(player, time)
			{	
				setTimeout(()=>{
					player.reload.jerk = true;
				},time);
			},
			animation:
			{
				start(player)
				{
					player.animation.current = 'jerk';
					player.animation.stap = 1;
					player.animation.iterationTime = '300';
				},
				make(player)
				{
					//
				},
				end(player)
				{
					//
				}
			}
		},
		gravity:
		{
			start(player)
			{
				player.status.gravity = true;

				player.listener.jump.end(player);

				player.reload.jump = false;

				player.listener.gravity.animation.start(player);
			},
			make(player)
			{
				if(player.speeds.gravity >= player.constants.finishSpeed.gravity)
					player.speeds.gravity = 55;
			},
			end(player)
			{
				player.status.gravity = false;
				player.speeds.gravity = player.constants.power.gravity;
			},
			animation:
			{
				start(player)
				{	
					player.animation.current = 'gravity';
					player.animation.stap = 1;
					player.animation.iterationTime = '300';
				},
				make(player)
				{
					//
				},
				end(player)
				{
					//
				}
			}
		},
		collision:
		{
			up:
			{
				start(player, object)
				{
					player.y = object.y;
					
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
					player.reload.flip = false
				},
				end(player)
				{
					player.collision.down = false;
				}
			}
		}
	},

	checkStatus()
	{
		if(!this.status.jump && !this.collision.down && !this.status.jerk && !this.status.flip && !this.status.gravity)
			this.listener.gravity.start(this);

		if(!this.status.jump && !this.status.flip && !this.status.jerk && !this.status.gravity)
		{
			if(this.status.run)
			{
				if(this.animation.current != 'run')
					this.listener.run.animation.start(this);
			}
			else
			{
				this.listener.standing.start(this);

				if(this.animation.current != 'standing')
					this.listener.standing.animation.start(this);
			}

		}
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

			if(!player.status.right && !player.status.left)
				player.listener.run.end(player);
			else
				player.listener.run.start(player);
		},
		right(player,e)
		{
			if(e == 'keydown')
				player.status.right = true;

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



const Support = {
	getVector(x1,y1,x2,y2)
	{
		let vx = x2 - x1,
			vy = y2 - y1,
			result = {}

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
	}
}





let Images = 
{
	standing:
	{
		right:
		[
			Support.setImage('img/stopR/1.png'),
			Support.setImage('img/stopR/2.png')
		],
		left:
		[
			Support.setImage('img/stopL/1.png'),
			Support.setImage('img/stopL/2.png')
		]
	},
	run:
	{
		right:
		[
			Support.setImage('img/runR/1.png'),
			Support.setImage('img/runR/2.png')
		],
		left:
		[
			Support.setImage('img/runL/1.png'),
			Support.setImage('img/runL/2.png')
		]
	},
	jump:
	{
		right:
		[
			Support.setImage('img/runR/1.png')
		],
		left:
		[
			Support.setImage('img/runL/1.png')
		]
	},
	jerk:
	{
		right:
		[
			Support.setImage('img/at/right.png')
		],
		left:
		[
			Support.setImage('img/at/left.png')
		]
	},
	gravity:
	{
		right:
		[
			Support.setImage('img/runR/2.png')
		],
		left:
		[
			Support.setImage('img/runL/2.png')
		]
	},
	flip:
	{
		right:
		[
			Support.setImage('img/flipR/1.png'),
			Support.setImage('img/flipR/2.png'),
			Support.setImage('img/flipR/3.png'),
			Support.setImage('img/flipR/4.png'),
			Support.setImage('img/flipR/5.png')
		],
		left:
		[
			Support.setImage('img/flipL/1.png'),
			Support.setImage('img/flipL/2.png'),
			Support.setImage('img/flipL/3.png'),
			Support.setImage('img/flipL/4.png'),
			Support.setImage('img/flipL/5.png')
		]
	}
}


let Animation = {
	fps: 60,
	player: {},
	field: {},
	init()
	{
		//
	},
	processing()
	{
		this.clearPlayerCanvas();
		this.rendering();
	},
	changesFrames(player)
	{
		player.listener[player.animation.current].animation.make(player);

		if(player.animation.stap < Images[player.animation.current][player.animation.direction].length)
			player.animation.stap += 1;
		else
			player.animation.stap = 1;

		this.changesFramesTimeFunction = setTimeout(()=>{
			Animation.changesFrames(player);
		},player.animation.iterationTime);
	},
	rendering()
	{
		ctx.drawImage(Images[Player.animation.current][Player.animation.direction][Player.animation.stap-1], Player.x, Player.y);
	},
	clearPlayerCanvas()
	{
		ctx.clearRect(0, 0, canv.width, canv.height);
	}
}
Animation.changesFrames(Player);
setInterval((e)=>{ Player.processing(); Animation.processing()}, 20)










let Field = {
	cell:
	{
		size: 60,
	},
	cellidth: 1000,
	height: 700,
	coordinates: [],
	init()
	{
		//
	}
}

document.oncontextmenu = ()=>{return false}
