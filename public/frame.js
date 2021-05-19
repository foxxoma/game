let frame = null;

function start(id, room)
{
	Field.drawField();

	document.addEventListener('keydown', (e)=> {
		if(e.code == 'KeyA')
			OnClick.left(Player[id],'keydown');

		if(e.code == 'KeyD')
			OnClick.right(Player[id],'keydown');

		if(e.code == 'KeyW')
			OnClick.up(Player[id]);

		if(e.code == 'KeyE')
			OnClick.jerk(Player[id]);

		if(e.code == 'KeyQ')
			OnClick.shells(Player[id]);
	});

	document.addEventListener('keyup', (e)=> {
		if(e.code == 'KeyA')
			OnClick.left(Player[id],'keyup');

		if(e.code == 'KeyD')
			OnClick.right(Player[id],'keyup');
	});

	document.addEventListener('mousemove',(e)=>{
		Listener.mouse.move(Player[id], e);
	});

	for(key in Player)
		Animation.changesFrames(Player[key]);

	for(key in Bot)
		Animation.changesFrames(Bot[key]);

	frame = setInterval((e)=>
	{
		socket.emit('createMess', Support.messConstructor(id, Player[id], room));

		Movement.processing(Player[id]);

		for(key in Bot)
			Movement.processing(Bot[key]);

		Follow(Bot);

		Animation.processing();

		Users[id].scrollToPlayer();
	}, 20);
}

document.oncontextmenu = ()=>
{
	return false;
};
