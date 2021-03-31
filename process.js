function Follow(bot)
{
	
	for(keyBot in Bot)
	{
		let key = 0;
		for(key in Player)
			if(Math.abs(Player[key].x - Bot[keyBot].x) < key)
				key = Math.abs(Player[key].x - Bot[keyBot].x);

		if((Player[key].y < Bot[keyBot].y || Bot[keyBot].collision.right || Bot[keyBot].collision.left) && !Bot[keyBot].status.jump)
		{
			OnClick.up(Bot[keyBot]);
		}
		else if(Player[key].y < Bot[keyBot].y && Bot[keyBot].status.gravity)
		{
			OnClick.up(Bot[keyBot]);
		}

		if(Math.abs(Player[key].x - Bot[keyBot].x) < 8)
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

document.addEventListener('keydown', (e)=> {
	if(e.code == 'KeyA')
		OnClick.left(Player[0],'keydown');

	if(e.code == 'KeyD')
		OnClick.right(Player[0],'keydown');

	if(e.code == 'KeyW')
		OnClick.up(Player[0]);

	if(e.code == 'KeyE')
		OnClick.jerk(Player[0]);
});

document.addEventListener('keyup', (e)=> {
	if(e.code == 'KeyA')
		OnClick.left(Player[0],'keyup');

	if(e.code == 'KeyD')
		OnClick.right(Player[0],'keyup');
});

document.addEventListener('mousemove',(e)=>{
	Player[0].listener.mouse.move(Player[0], e);
});

document.addEventListener('mousedown', (e)=> {
	Player[0].listener.mouse.click(Player[0], e);
});



const Support = {
	getVector(x1,y1,x2,y2)
	{
		let vx = x2 - x1,
			vy = y2 - y1,
			result = {}

		let dist = Math.sqrt(vx * vx + vy * vy);

		result.dx = vx / dist;
		result.dy = vy / dist;

		return result;
	},
	setImage(src)
	{
		let img = new Image();
		img.src = src;
		return img;
	}
}





let Images = 
{
	standing:
	{
		right:
		[
			Support.setImage('img/stopR/1.png'),
			Support.setImage('img/stopR/2.png')
		],
		left:
		[
			Support.setImage('img/stopL/1.png'),
			Support.setImage('img/stopL/2.png')
		]
	},
	run:
	{
		right:
		[
			Support.setImage('img/runR/1.png'),
			Support.setImage('img/runR/2.png')
		],
		left:
		[
			Support.setImage('img/runL/1.png'),
			Support.setImage('img/runL/2.png')
		]
	},
	jump:
	{
		right:
		[
			Support.setImage('img/runR/1.png')
		],
		left:
		[
			Support.setImage('img/runL/1.png')
		]
	},
	jerk:
	{
		right:
		[
			Support.setImage('img/at/right.png')
		],
		left:
		[
			Support.setImage('img/at/left.png')
		]
	},
	gravity:
	{
		right:
		[
			Support.setImage('img/runR/2.png')
		],
		left:
		[
			Support.setImage('img/runL/2.png')
		]
	},
	flip:
	{
		right:
		[
			Support.setImage('img/flipR/1.png'),
			Support.setImage('img/flipR/2.png'),
			Support.setImage('img/flipR/3.png'),
			Support.setImage('img/flipR/4.png'),
			Support.setImage('img/flipR/5.png')
		],
		left:
		[
			Support.setImage('img/flipL/1.png'),
			Support.setImage('img/flipL/2.png'),
			Support.setImage('img/flipL/3.png'),
			Support.setImage('img/flipL/4.png'),
			Support.setImage('img/flipL/5.png')
		]
	}
}

let fieldImg = 
{
	platform1: Support.setImage('img/sp/platform-left.png'),
	platform2: Support.setImage('img/sp/platform.png'),
	platform3: Support.setImage('img/sp/platform-right.png'),
	platform4: Support.setImage('img/sp/platform-up.png'),
	platform5: Support.setImage('img/sp/platform-wall-left-down.png'),
	platform6: Support.setImage('img/sp/platform-wall-right-down.png'),
	platform7: Support.setImage('img/sp/platform-wall-left-up.png'),
	platform8: Support.setImage('img/sp/platform-wall-right-up.png'),
	platform9: Support.setImage('img/sp/platform-wall.png'),
	bg: Support.setImage('img/bg.png'),
	tree: Support.setImage('img/sp/tree.png'),
	pine: Support.setImage('img/sp/pine.png'),
	bush: Support.setImage('img/sp/bush.png'),
}


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
		player.listener[player.animation.current].animation.make(player);

		if(player.animation.stap < Images[player.animation.current][player.animation.direction].length)
			player.animation.stap += 1;
		else
			player.animation.stap = 1;

		this.changesFramesTimeFunction = setTimeout(()=>{
			Animation.changesFrames(player);
		},player.animation.iterationTime);
	},
	rendering()
	{	
		for(key in Player)
			ctx.drawImage(Images[Player[key].animation.current][Player[key].animation.direction][Player[key].animation.stap-1], Player[key].x, Player[key].y);
		for(key in Bot)
			ctx.drawImage(Images[Bot[key].animation.current][Bot[key].animation.direction][Bot[key].animation.stap-1], Bot[key].x, Bot[key].y);
	},
	clearPlayerCanvas()
	{
		ctx.clearRect(0, 0, canv.width, canv.height);
	}
}

for(key in Player)
	Animation.changesFrames(Player[key]);
for(key in Bot)
	Animation.changesFrames(Bot[key]);


setInterval((e)=>{

	for(key in Player)
		Player[key].processing();

	for(key in Bot)
		Bot[key].processing();

	for(key in Bot)
		Follow(Bot[key])

	Animation.processing();
}, 20);
document.oncontextmenu = ()=>{return false}