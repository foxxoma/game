function Follow(bot)
{
	for(keyBot in Bot)
	{
		let key = 0;
		for(key in Player)
			if(Math.abs(Player[key].x - Bot[keyBot].x) < key)
				key = Math.abs(Player[key].x - Bot[keyBot].x);

		if(Room.lvl > 1)
		{
			Bot[keyBot].mouse.x = Player[key].x;
			Bot[keyBot].mouse.y = Player[key].y;

			if(Bot[keyBot].reload.shells)
				Listener.shells.start(Bot[keyBot]);
		}

		if((Player[key].y < (Bot[keyBot].y - Player[key].size) || (Bot[keyBot].collision.right && Player[key].x > Bot[keyBot].x && Math.abs(Player[key].x - Bot[keyBot].x) > 8) || (Bot[keyBot].collision.left && Player[key].x < Bot[keyBot].x && Math.abs(Player[key].x - Bot[keyBot].x) > 8)) && !Bot[keyBot].status.jump)
		{
			OnClick.up(Bot[keyBot]);
		}
		else if(Player[key].y < Bot[keyBot].y - Player[key].size && Bot[keyBot].status.gravity && Bot[keyBot].finishCollision.up < (Bot[keyBot].y - Bot[keyBot].size/2))
		{
			OnClick.up(Bot[keyBot]);
		}
		if(Bot[keyBot].finishCollision.up)
		{
			if((Bot[keyBot].finishCollision.up - Field.cell.size) > Bot[keyBot].y || Player[key].y >= Bot[keyBot].y || Bot[keyBot].collision.left || Bot[keyBot].collision.right)
			{
				Bot[keyBot].finishCollision.up = false;
			}
			if(!Bot[keyBot].status.right && !Bot[keyBot].status.left)
			{
				if(Bot[keyBot].x > Player[key].x)
				{
					OnClick.left(Bot[keyBot], 'keydown');
					OnClick.right(Bot[keyBot], 'keyup');
				}
				else
				{
					OnClick.left(Bot[keyBot], 'keyup');
					OnClick.right(Bot[keyBot], 'keydown');
				}
			}
		}
		else if(Bot[keyBot].finishCollision.down && Bot[keyBot].y < (Player[key].y - Player[key].size))
		{
			if((Bot[keyBot].finishCollision.down + Bot[keyBot].size) < Bot[keyBot].y || Player[key].y <= Bot[keyBot].y || Bot[keyBot].collision.left || Bot[keyBot].collision.right)
			{
				Bot[keyBot].finishCollision.down = false;
			}
			if(!Bot[keyBot].status.right && !Bot[keyBot].status.left)
			{
				if(Bot[keyBot].x > Player[key].x)
				{
					OnClick.left(Bot[keyBot], 'keydown');
					OnClick.right(Bot[keyBot], 'keyup');
				}
				else
				{
					OnClick.left(Bot[keyBot], 'keyup');
					OnClick.right(Bot[keyBot], 'keydown');
				}
			}
		}
		else if(Math.abs(Player[key].x - Bot[keyBot].x) < 8)
		{
			OnClick.right(Bot[keyBot], 'keyup');
			OnClick.left(Bot[keyBot], 'keyup');
		}
		else if(Player[key].x > Bot[keyBot].x && !Bot[keyBot].status.right)
		{
			OnClick.left(Bot[keyBot], 'keyup');
			OnClick.right(Bot[keyBot], 'keydown');
		}
		else if(Player[key].x < Bot[keyBot].x && !Bot[keyBot].status.left)
		{
			OnClick.right(Bot[keyBot], 'keyup');
			OnClick.left(Bot[keyBot], 'keydown');
		}
	}
}
