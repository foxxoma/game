let Bot = {
	1:{
		id:1,
		y: canv.height/(Math.random() * (10 - 1) + 1),
		x: canv.width/(Math.random() * (10 - 1) + 1),
		size: 64,
		bot: 1,
		hp: 100,
		xp: 0,
		sizeCollision: 64,
		finishCollision:
		{
			up: false,
			down: false
		},
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
				gravity: 33,
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
			run: 6,
			gravity: 4,
			jump: 30,
			jerk: 50,
			flip: 30,
			shell: 27,
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
		shellSize:
		{
			h: 20,
			w: 20
		},
		shells: [],
		animation:
		{
			current: 'flip',
			iterationTime: 300,
			stap: 1,
			direction: 'right'
		},
	},
	2:{
		id: 2,
		y: canv.height/(Math.random() * (10 - 1) + 1),
		x: canv.width/(Math.random() * (10 - 1) + 1),
		size: 64,
		bot: 1,
		hp: 100,
		xp: 0,
		sizeCollision: 64,
		finishCollision:
		{
			up: false,
			down: false
		},
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
				gravity: 33,
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
			run: 6,
			gravity: 4,
			jump: 30,
			jerk: 50,
			flip: 30,
			shell: 27,
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
		shellSize:
		{
			h: 20,
			w: 20
		},
		shells: [],
		animation:
		{
			current: 'flip',
			iterationTime: 300,
			stap: 1,
			direction: 'right'
		}
	}
};
