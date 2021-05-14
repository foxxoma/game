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
	dead:
	{
		start(player)
		{
			if(player.bot)
			{
				if((Room.bots - Object.keys(Bot).length) < 2)
				{
					delete Bot[player.id];
					return;
				}
				Room.bots--;
			}

			player.x = (Math.random() * (canv.width - 100 - 1) + 1);
			player.y = (Math.random() * (canv.height - 200 - 1) + 1);

			player.hp = 100;
			player.xp -= 1;

			if(!player.bot && Users[player.id])
				Users[player.id].setXp(player.xp);
		},
		xp(player)
		{
			player.xp += 1;
			if(!player.bot && Users[player.id])
				Users[player.id].setXp(player.xp);
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
			setTimeout(()=> {
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
	shells:
	{
		start(player)
		{
			player.reload.shells = false;

			setTimeout(() =>
			{
				player.reload.shells = true;
			}
			,1000);

			const shell = {};

			shell.id = player.shells.length;

			shell.stop = false;

			shell.x = player.x;
			shell.y = player.y;

			shell.vector = Support.getVector(player.x, player.y, player.mouse.x, player.mouse.y);

			player.shells.push(shell);
		},
		make(player)
		{
			//
		},
		end(player)
		{
			//
		},
		collision:
		{
			user:
			{
				start(user, player, shell, hp)
				{
					if(player.bot && user.bot)
						return;

					user.hp -= hp;
					shell.clear = true;

					if(user.hp <= 0)
					{
						Listener.dead.start(user);
						Listener.dead.xp(player);
					}
				},
				check(player, shell)
				{
					if(shell.clear)
						return false;

					for(key in Bot)
					{
						if(player.id == Bot[key].id)
							continue;

						if((Bot[key].x < (shell.x + player.shellSize.w)) && ((Bot[key].x + Bot[key].sizeCollision - 20) > shell.x) && (Bot[key].y < (shell.y + player.shellSize.h)) && ((Bot[key].y + Bot[key].sizeCollision - 20) > shell.y))
						{
							Listener.shells.collision.user.start(Bot[key], player, shell, 50);
							return true;
						}
					}
					for(key in Player)
					{
						if(player.id == Player[key].id)
							continue;
						if((Player[key].x < (shell.x + player.shellSize.w)) && ((Player[key].x + Player[key].sizeCollision - 20) > shell.x) && (Player[key].y < (shell.y + player.shellSize.h)) && ((Player[key].y + Player[key].sizeCollision - 20) > shell.y))
						{
							Listener.shells.collision.user.start(Player[key], player, shell, 50);
							socket.emit('createDamageMess', Support.damageMessConstructor(key, 50, Room.id));
							return true;
						}
					}

					return false;
				}
			},
			up:
			{
				start(shell, object)
				{
					// shell.y = object.y;
					shell.stop = true;
				},
				check(player, shell)
				{
					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(shell.y < (Field.coordinates[y][x].y + Field.cell.size) && shell.y > Field.coordinates[y][x].y  && shell.x > (Field.coordinates[y][x].x - player.shellSize.w) && shell.x < (Field.coordinates[y][x].x + Field.cell.size))
							{
								Listener.shells.collision.up.start(shell, {x:0, y:Field.coordinates[y][x].y + Field.cell.size});
								return true;
							}
						}
					}
					return false;
				}
			},
			right:
			{
				start(shell, object)
				{
					// shell.x = object.x;
					shell.stop = true;
				},
				check(player, shell)
				{
					if (Math.abs(canv.width - (shell.x + player.shellSize.w)) < 5)
					{
						Listener.shells.collision.right.start(shell, {x:canv.width - player.shellSize.w, y:0});
						return true;
					}

					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(Math.abs(Field.coordinates[y][x].x - (shell.x + player.shellSize.x)) < 5 && Math.abs(Field.coordinates[y][x].y - shell.y) < player.shellSize.h)
							{
								Listener.shells.collision.right.start(shell,{x:Field.coordinates[y][x].x, y:0});
								return true;
							}
						}
					}
					return false;
				}
			},
			left:
			{
				start(shell, object)
				{
					// shell.x = object.x;
					shell.stop = true;
				},
				check(player, shell)
				{
					if (Math.abs(0 - shell.x) < 5)
					{
						Listener.shells.collision.left.start(shell, {x:0, y:0});
						return true;
					}

					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if(Math.abs((Field.coordinates[y][x].x + Field.cell.size) - shell.x) < 5 && Math.abs(Field.coordinates[y][x].y - shell.y) < player.shellSize.h)
							{
								Listener.shells.collision.left.start(shell,{x:Field.coordinates[y][x].x + Field.cell.size, y:0});
								return true;
							}
						}
					}
					return false;
				}
			},
			down:
			{
				start(shell, object)
				{
					// shell.y = object.y;
					shell.stop = true;
				},
				check(player, shell)
				{
					for(let y = 0; y< 19; y++)
					{
						for(let x= 0; x< 50; x++)
						{
							if(!Field.coordinates[y][x].num)
								continue;

							if((shell.y + player.shellSize.h) >= Field.coordinates[y][x].y && shell.y < (Field.coordinates[y][x].y + Field.cell.size)  && shell.x  > Field.coordinates[y][x].x - player.shellSize.w  && shell.x < Field.coordinates[y][x].x + Field.cell.size)
							{
								Listener.shells.collision.down.start(shell,{x:0, y:Field.coordinates[y][x].y});
								return true;
							}
						}
					}
					return false;
				}
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
		},
	},
	collision:
	{
		user:
		{
			start(bot, player, hp)
			{
				if(Room.lvl > 1)
					return;

				player.hp -= hp;
				if(player.hp <= 0)
					Listener.dead.start(player);
			},
			check(bot)
			{
				for(key in Player)
					if((Player[key].x < (bot.x + bot.sizeCollision - 20)) && ((Player[key].x + Player[key].sizeCollision - 20) > bot.x) && (Player[key].y < (bot.y + bot.sizeCollision - 20)) && ((Player[key].y + Player[key].sizeCollision - 20) > bot.y))
						Listener.collision.user.start(bot, Player[key], 100);
			}
		},
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
				if (Math.abs(canv.width - (player.x + player.sizeCollision)) < 5)
				{
					Listener.collision.right.start(player, {x:canv.width - player.sizeCollision, y:0});
					return true;
				}

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
				if (Math.abs(0 - player.x) < 5)
				{
					Listener.collision.left.start(player, {x:0, y:0});
					return true;
				}

				for(let y = 0; y< 19; y++)
				{
					for(let x= 0; x< 50; x++)
					{
						if(!Field.coordinates[y][x].num)
							continue;

						if(Math.abs((Field.coordinates[y][x].x + player.sizeCollision) - player.x) < 5 && Math.abs(Field.coordinates[y][x].y - player.y) < player.sizeCollision - 5)
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
};
