let Animation = {
	fps: 60,
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
		Listener[player.animation.current].animation.make(player);

		if(player.animation.stap < Images[player.animation.current][player.animation.direction].length)
			player.animation.stap += 1;
		else
			player.animation.stap = 1;

		this.changesFramesTimeFunction = setTimeout(()=>
		{
			Animation.changesFrames(player);
		},player.animation.iterationTime);
	},
	rendering()
	{
		for(key in Player)
			ctx.drawImage(Images[Player[key].animation.current][Player[key].animation.direction][Player[key].animation.stap-1], Player[key].x, Player[key].y);
		for(key in Bot)
			ctx.drawImage(BotImages[Bot[key].animation.current][Bot[key].animation.direction][Bot[key].animation.stap-1], Bot[key].x, Bot[key].y);
		for(key in Player)
		{
			for(shellKey in Player[key].shells)
			{
				let shell = Player[key].shells[shellKey];
				ctx.drawImage(FieldImg.shell, shell.x, shell.y);
			}
		}

	},
	clearPlayerCanvas()
	{
		ctx.clearRect(0, 0, canv.width, canv.height);
	}
};
