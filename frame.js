setInterval((e)=>{
	for(key in Player)
		Movement.processing(Player[key]);

	for(key in Bot)
		Movement.processing(Bot[key]);

	Follow(Bot);

	Animation.processing();

	Users[0].scrollToPlayer();
}, 20);
document.oncontextmenu = ()=>{return false}
