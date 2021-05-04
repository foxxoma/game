Users = {
	0:{
		id: 0,
		scrollToPlayer()
		{
			let player = Player[this.id],
				x = player.x + player.size/2 - screen.width/2,
				y = player.y + player.size - screen.height/2;

			window.scroll(x,y);
		},
		setXp(xp)
		{
			document.querySelector('.xp').textContent = 'xp: ' + xp;
		}
	}
};
