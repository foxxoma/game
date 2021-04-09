const Listener = {
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

			Listener.gravity.end(player);

			player.reload.jump = false;
			player.reload.flip = true;

			Listener.jump.animation.start(player);
		},
		make(player)
		{	
			if(player.speeds.jump < player.constants.finishSpeed.jump)
				Listener.jump.end(player);
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

			Listener.gravity.end(player);
			Listener.jump.end(player);

			player.reload.flip = false;

			Listener.flip.animation.start(player);
		},
		make(player)
		{
			if(player.speeds.flip < player.constants.finishSpeed.flip)
				Listener.flip.end(player);
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
					Listener.jump.animation.start(player);
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

			Listener.gravity.end(player);
			Listener.jump.end(player);

			player.reload.jump = false;
			player.reload.jerk = false;
			player.reload.flip = true;

			player.animation.direction = player.directions.jerk.vector.dx > 0?'right':'left';
		},
		make(player)
		{
			if(player.speeds.jerk < player.constants.finishSpeed.jerk + 2)
				Listener.jerk.animation.start(player);

			if(player.speeds.jerk < player.constants.finishSpeed.jerk)
				Listener.jerk.end(player);

			player.reload.jump = false;
			player.reload.flip = true;
		},
		end(player)
		{
			Listener.jerk.animation.start(player);
			player.status.jerk = false;
			player.speeds.jerk = player.constants.power.jerk;
			Listener.jerk.load(player, 2000);
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

			Listener.jump.end(player);

			player.reload.jump = false;

			Listener.gravity.animation.start(player);
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
				player.finishCollision.up = object.y;
				player.y = object.y;
				
				player.collision.up = true;

				if(player.status.jump)
				{
					Listener.jump.end(player);

					player.reload.jump = false;
				}
				if(player.status.jerk)
				{
					Listener.jerk.end(player);

					player.reload.jerk = false;
				}
				if(player.status.flip)
				{
					Listener.flip.end(player);

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
							Listener.collision.up.start(player, {x:0,y:Field.coordinates[y][x].y + Field.cell.size + 5});
							return true;
						}
					}
				}
				Listener.collision.up.end(player);
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

				if(player.status.jerk && player.directions.jerk.vector.dx > 0)
				{
					Listener.jerk.end(player);

					player.reload.jerk = false;
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

						if(Math.abs(Field.coordinates[y][x].x - (player.x + player.sizeCollision)) < 5 && Math.abs(Field.coordinates[y][x].y - player.y) < Field.cell.size - 5)
						{
							Listener.collision.right.start(player, {x:Field.coordinates[y][x].x - player.sizeCollision, y:0});
							return true;
						}
						else
							Listener.collision.right.end(player);
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

				if(player.status.jerk && player.directions.jerk.vector.dx < 0)
				{
					Listener.jerk.end(player);

					player.reload.jerk = false;
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

						if(Math.abs((Field.coordinates[y][x].x + player.sizeCollision) - player.x) < 5 && Math.abs(Field.coordinates[y][x].y - player.y) < Field.cell.size - 5)
						{
							Listener.collision.left.start(player, {x:Field.coordinates[y][x].x + Field.cell.size, y:0});
							return true;
						}
						else
							Listener.collision.left.end(player);
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
				player.finishCollision.down = object.y;
				player.y = object.y;
				
				player.collision.down = true;
				
				if(player.status.jerk)
				{
					Listener.jerk.end(player);

					player.reload.jerk = false;
				}

				Listener.gravity.end(player);

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
							Listener.collision.down.start(player, {x:0,y: Field.coordinates[y][x].y - player.sizeCollision});
							return true;
						}
						else
							Listener.collision.down.end(player);
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
}