const Movement = {
	processing(player)
	{
		this.checkCollision(player);
		this.checkStatus(player);
		this.doStap(player);
		this.doJump(player);
		this.doFlip(player);
		this.doGravity(player);
		this.doJerk(player);
		this.doShells(player);
	},

	checkSahllsCollision(player, shell)
	{
		if(Listener.shells.collision.right.check(player, shell))
			return true;
		if(Listener.shells.collision.left.check(player, shell))
			return true;
		if(Listener.shells.collision.down.check(player, shell))
			return true;
		if(Listener.shells.collision.up.check(player, shell))
			return true;
		if(Listener.shells.collision.user.check(player, shell))
			return true;

		return false;
	},

	checkCollision(player)
	{
		
		Listener.collision.right.check(player);
		Listener.collision.left.check(player);

		if(player.status.jump || player.status.jerk || player.status.flip)
		{
			if(!Listener.collision.up.check(player) && player.status.jerk && player.directions.jerk.vector.dy > 0.3)
				Listener.collision.down.check(player);
		}
		else
			Listener.collision.down.check(player);

		if(player.bot == 1)
			Listener.collision.user.check(player);
	},

	checkStatus(player)
	{
		if(!player.status.jump && !player.collision.down && !player.status.jerk && !player.status.flip && !player.status.gravity)
			Listener.gravity.start(player);

		if(!player.status.jump && !player.status.flip && !player.status.jerk && !player.status.gravity)
		{
			if(player.status.run)
			{
				if(player.animation.current != 'run')
					Listener.run.animation.start(player);
			}
			else
			{
				Listener.standing.start(player);

				if(player.animation.current != 'standing')
					Listener.standing.animation.start(player);
			}

		}
	},

	doStap(player)
	{
		if(player.status.right && !player.collision.right)
			player.x += player.speeds.run;
		else
		{
			if(player.status.left && !player.collision.left)
				player.x -= player.speeds.run;
		}
	},

	doJump(player)
	{
		if(!player.status.jump)
			return;

		player.speeds.jump *= player.constants.progression.jump;

		for (let i = 1; i < player.speeds.jump; i++)
		{
			if(!Listener.collision.up.check(player))
			{
				player.y -= 1;
			}
			else
			{
				return;
			}
		}

		Listener.jump.make(player);
	},

	doFlip(player)
	{
		if(!player.status.flip)
			return;

		player.speeds.flip *= player.constants.progression.flip;
		
		for (let i = 1; i < player.speeds.flip; i++)
		{
			if(!Listener.collision.up.check(player))
			{
				player.y -= 1;
			}
			else
			{
				return;
			}
		}

		Listener.flip.make(player);
	},

	doShells(player)
	{
		let shells = player.shells;

		if(shells.length <= 0)
			return;

		for (key in shells)
		{
			shell = shells[key];
			if(shells[key].stop)
				continue;

			for (let i = 1; i < player.speeds.shell; i++)
			{

				if(this.checkSahllsCollision(player, shell))
					return;

				if(shell.clear)
				{
					delete shells[shell.id];
					return;
				}

				if(shell.stop)
					return;

				shell.y += 1 * shell.vector.dy;
				shell.x += 1 * shell.vector.dx;
			}
		}

		Listener.shells.make(player);
	},

	doJerk(player)
	{
		if(!player.status.jerk)
			return;

		player.speeds.jerk *= player.constants.progression.jerk;

		player.x += player.speeds.jerk * player.directions.jerk.vector.dx;
		player.y += player.speeds.jerk * player.directions.jerk.vector.dy;

		Listener.jerk.make(player);
	},

	doGravity(player)
	{
		if(!player.status.gravity)
			return;

		player.speeds.gravity /= player.constants.progression.gravity;
		player.y += player.speeds.gravity;

		Listener.gravity.make(player);
	}
};
