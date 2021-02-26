const canv = document.getElementById('canv'),
ctx = canv.getContext('2d');	

canv.width = 3200;
canv.height = 1216;

document.body.style.overflow = 'hidden';
document.oncontextmenu = ()=> {return false;}

let player = {
	y: canv.height/2,
	x: canv.width/2,
	constants:
	{
		power:
		{
			jump: 30,
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
		gravity: this.constants.power.gravity,
		jump: this.constants.power.jump,
		jerk: this.constants.power.jerk,
		flip: this.constants.power.flip
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
		direction:
		{
			right: true,
			left: false
		}
	}

	processing()
	{
		checkCollision();
		setMousData();
		setPower();
		changeStatus();
		doStap();
		doJump();
		doFlip();
		doGravity();
		doJerk();
	},

	checkCollision()
	{
		//
	},
	listener:
	{
		stap:
		{
			start()
			{
				this.status.stap = true;
			},
			make()
			{
			},
			end()
			{
				this.status.stap = false;
			}
		},
		jump:
		{
			start()
			{
				if(!this.reload.jump)
					return;

				this.status.jump = true;

				this.listener.gravity.end();

				this.reload.jump = false;
				this.reload.flip = true;
			},
			make()
			{		
				if(this.speeds.jump < 1)
					this.status.jump = false;
			},
			end()
			{
				this.status.jump = false;
				this.speeds.jump = this.constants.power.jump;
			}

		},
		flip:
		{
			start()
			{
				if(!this.reload.flip)
					return;

				this.status.flip = true;

				this.listener.gravity.end();
				this.listener.jump.end();

				this.reload.flip = false;
			},
			make()
			{
				if(this.speeds.flip < 1)
					this.status.flip = false;
			},
			end()
			{
				this.status.flip = false;
				this.speeds.flip = this.constants.power.flip;
			}
		},
		jerk:
		{
			start()
			{
				if(!this.reload.jerk)
					return;

				this.status.jerk = true;

				this.listener.gravity.end();
				this.listener.jump.end();

				this.reload.jump = false;
				this.reload.jerk = false;
				this.reload.flip = true;
			},
			make()
			{
				if(this.speeds.jerk < 1)
					this.status.jerk = false;
			},
			end()
			{
				this.status.jerk = false;
				this.speeds.jerk = this.constants.power.jerk;
			}

		},
		gravity:
		{
			start()
			{
				this.status.gravity = true;

				this.listener.jump.end();

				this.reload.jump = false;
			},
			make()
			{
			},
			end()
			{
				this.status.gravity = false;
			}
		},
		collision:
		{
			up()
			{
				if(this.status.jump)
				{
					this.listener.jump.end();

					this.reload.jump = false;
				}
				if(this.status.jerk)
				{
					this.listener.jerk.end();

					this.reload.jerk = false;
				}
				if(this.status.flip)
				{
					this.listener.flip.end();

					this.reload.flip = false;
				}
			},
			down()
			{
				this.listener.gravity.end();

				this.reload.jump = true;
				this.reload.flip = false;
			}
		}
	},

	changeStatus()
	{
		if(!this.status.jump && !this.collision.down && !this.status.jerk && !this.status.flip)
			this.listener.gravity.start();
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

		this.listener.jump.make();

		this.speeds.jump *= this.constants.progression.jump;
		this.y += this.speeds.jump;
	},

	doFlip()
	{
		if(!this.status.flip)
			return;

		this.listener.flip.make();

		this.speeds.flip *= this.constants.progression.flip;
		this.y += this.speeds.flip;
	},

	doJerk()
	{
		if(!this.status.jerk)
			return;

		this.listener.jerk.make();

		this.speeds.jerk *= this.constants.progression.jerk;

		this.x += this.speeds.jerk * this.directions.jerk.vector.dx;
		this.y += this.speeds.jerk * this.directions.jerk.vector.dy;
	},

	doGravity()
	{
		if(!this.status.gravity)
			return;

		this.speeds.gravity /= this.constants.progression.gravity;
		this.y -= this.speeds.gravity;
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

document.oncontextmenu = ()=>{return false}
