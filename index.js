const canv = document.getElementById('canv'),
ctx = canv.getContext('2d');

canv.width = 3200;
canv.height = 1216;

document.body.style.overflow = 'hidden';

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

	changeStatus()
	{
		if(!this.status.jump)
			this.speeds.jump = this.constants.power.jump;

		if(!this.status.flip)
			this.speeds.flip = this.constants.power.flip;

		if(!this.status.jerk)
			this.speeds.jerk = this.constants.power.jerk;


		if(this.status.jump)
		{
			this.status.gravity = false;
			this.reload.jump = false;
			this.reload.flip = true;
		}

		if(this.status.flip)
		{
			this.status.gravity = false;
			this.status.jump = false;
			this.reload.flip = false;
		}

		if(this.status.jerk)
		{
			this.status.gravity = false;
			this.status.jump = false;
			this.reload.jump = false;
			this.reload.jerk = false;
			this.reload.flip = true;
		}


		if(this.collision.up)
		{
			if(this.status.jump)
			{
				this.status.jump = false;
				this.reload.jump = false;
			}
			if(this.status.jerk)
			{
				this.status.jerk = false;
				this.reload.jerk = false;
			}
			if(this.status.flip)
			{
				this.status.flip = false;
				this.reload.flip = false;
			}
		}

		//gravity, jump, flip
		if(this.collision.down)
		{
			this.status.gravity = false;
			this.reload.jump = true;
			this.reload.flip = false;
		}

		//gravity, jump, down, jerk, flip
		if(!this.status.jump && !this.collision.down && !this.status.jerk && !this.status.flip)
			this.status.gravity = true;

		if(this.status.gravity)
		{
			this.reload.jump = false;
			this.reload.flip = true;
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
		this.y += this.speeds.jump;

		if(this.speeds.jump < 1)
			this.status.jump = false;
	},

	doFlip()
	{
		if(!this.status.flip)
			return;

		this.speeds.flip *= this.constants.progression.flip;
		this.y += this.speeds.flip;

		if(this.speeds.flip < 1)
			this.status.flip = false;
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
	}

	doJerk()
	{
		if(!this.status.jerk)
			return;

		this.speeds.jerk *= this.constants.progression.jerk;

		this.x += this.speeds.jerk * this.directions.jerk.vector.dx;
		this.y += this.speeds.jerk * this.directions.jerk.vector.dy;

		if(this.speeds.jerk < 1)
			this.status.jerk = false;
	},

	onClick(key)
	{

	}

}

const knifes = []

const start = ()=>{
	fieldStart();
}


start()

let animation = setInterval(stopR, 300);


document.oncontextmenu = ()=>{return false}


