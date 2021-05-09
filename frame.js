let frame = null;

function start()
{
	for(key in Player)
		Animation.changesFrames(Player[key]);

	for(key in Bot)
		Animation.changesFrames(Bot[key]);

	let frame = setInterval((e)=>
	{
		for(key in Player)
			Movement.processing(Player[key]);

		for(key in Bot)
			Movement.processing(Bot[key]);

		Follow(Bot);

		Animation.processing();

		Users[0].scrollToPlayer();
	}, 20);
}

start();

document.oncontextmenu = ()=>
{
	return false;
};
