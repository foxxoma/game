let Bot = [{
	y: canv.height/(Math.random() * (10 - 1) + 1),
	x: canv.width/(Math.random() * (10 - 1) + 1),
	size: 64,
	sizeCollision: 64,
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
		this.listener.collision.right.check(this);
		this.listener.collision.left.check(this);

		if(this.status.jump || this.status.jerk || this.status.flip)
			this.listener.collision.up.check(this);
		else
			this.listener.collision.down.check(this);
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
					player.speeds.gravity = player.constants.finishSpeed.gravity;
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
				check(player)
				{
					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(player.y < Field.coordinates[y][x].y + Field.cell.size && player.y > Field.coordinates[y][x].y  && player.x > Field.coordinates[y][x].x - player.sizeCollision && player.x < Field.coordinates[y][x].x + Field.cell.size)
							{
								player.listener.collision.up.start(player, {x:0,y:Field.coordinates[y][x].y + Field.cell.size + 5});
								return true;
							}
							else
								player.listener.collision.up.end(player);
						}
					}
					return false;
				},
				end(player)
				{
					player.collision.up = false;
				}	
			},
			right:
			{
				start(player, object)
				{
					player.x = object.x;
					player.collision.right = true;
				},
				check(player)
				{
					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(Math.abs(Field.coordinates[y][x].x - (player.x + player.sizeCollision)) < 5 && Math.abs(Field.coordinates[y][x].y - player.y) < Field.cell.size - 5)
							{
								player.listener.collision.right.start(player, {x:Field.coordinates[y][x].x - player.sizeCollision, y:0});
								return true;
							}
							else
								player.listener.collision.right.end(player);
						}
					}
					return false;
				},
				end(player)
				{
					player.collision.right = false;
				}
			},
			left:
			{
				start(player, object)
				{
					player.x = object.x;
					player.collision.left = true;
				},
				check(player)
				{
					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(Math.abs((Field.coordinates[y][x].x + player.sizeCollision) - player.x) < 5 && Math.abs(Field.coordinates[y][x].y - player.y) < Field.cell.size - 5)
							{
								player.listener.collision.left.start(player, {x:Field.coordinates[y][x].x + Field.cell.size, y:0});
								return true;
							}
							else
								player.listener.collision.left.end(player);
						}
					}
					return false;
				},
				end(player)
				{
					player.collision.left = false;
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
				check(player)
				{
					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(player.y + player.sizeCollision >= Field.coordinates[y][x].y && player.y < Field.coordinates[y][x].y + Field.cell.size && !player.status.jump && player.x  > Field.coordinates[y][x].x - player.sizeCollision  && player.x < Field.coordinates[y][x].x + Field.cell.size)
							{
								player.listener.collision.down.start(player, {x:0,y: Field.coordinates[y][x].y - player.sizeCollision});
								return true;
							}
							else
								player.listener.collision.down.end(player);
						}
					}
					return false;
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
}];

