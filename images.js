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
};

let BotImages =
{
	standing:
	{
		right:
		[
			Support.setImage('img/bot/stopR/1.png'),
			Support.setImage('img/bot/stopR/2.png')
		],
		left:
		[
			Support.setImage('img/bot/stopL/1.png'),
			Support.setImage('img/bot/stopL/2.png')
		]
	},
	run:
	{
		right:
		[
			Support.setImage('img/bot/runR/1.png'),
			Support.setImage('img/bot/runR/2.png')
		],
		left:
		[
			Support.setImage('img/bot/runL/1.png'),
			Support.setImage('img/bot/runL/2.png')
		]
	},
	jump:
	{
		right:
		[
			Support.setImage('img/bot/runR/1.png')
		],
		left:
		[
			Support.setImage('img/bot/runL/1.png')
		]
	},
	gravity:
	{
		right:
		[
			Support.setImage('img/bot/runR/2.png')
		],
		left:
		[
			Support.setImage('img/bot/runL/2.png')
		]
	},
	flip:
	{
		right:
		[
			Support.setImage('img/bot/flipR/1.png'),
			Support.setImage('img/bot/flipR/2.png'),
			Support.setImage('img/bot/flipR/3.png'),
			Support.setImage('img/bot/flipR/4.png'),
			Support.setImage('img/bot/flipR/5.png')
		],
		left:
		[
			Support.setImage('img/bot/flipL/1.png'),
			Support.setImage('img/bot/flipL/2.png'),
			Support.setImage('img/bot/flipL/3.png'),
			Support.setImage('img/bot/flipL/4.png'),
			Support.setImage('img/bot/flipL/5.png')
		]
	}
};

let FieldImg = {
	platform1: Support.setImage('img/sp/platform-left.png'),
	platform2: Support.setImage('img/sp/platform.png'),
	platform3: Support.setImage('img/sp/platform-right.png'),
	platform4: Support.setImage('img/sp/platform-up.png'),
	platform5: Support.setImage('img/sp/platform-wall-left-down.png'),
	platform6: Support.setImage('img/sp/platform-wall-right-down.png'),
	platform7: Support.setImage('img/sp/platform-wall-left-up.png'),
	platform8: Support.setImage('img/sp/platform-wall-right-up.png'),
	platform9: Support.setImage('img/sp/platform-wall.png'),
	tree: Support.setImage('img/sp/tree.png'),
	pine: Support.setImage('img/sp/pine.png'),
	bush: Support.setImage('img/sp/bush.png'),
	super_platform: Support.setImage('img/sp/super_platform.png')
};
Field.init();
