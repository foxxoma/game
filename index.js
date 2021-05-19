var express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () =>
{
	console.log('listening on * ' + PORT);
});

app.use(express.static('public'));

app.get('/', (request, respons) =>
{
	respons.sendFile('index.html', {root: __dirname});
});

const messConstructor = (id, player, room) => ({id, player, room});
const damageMessConstructor = (id, damage, room) => ({id, damage, room});

io.on('connection', socket =>
{
	console.log('a user connected');
	socket.on('userJoined', (data, success) =>
	{
		let room = data.room;

		if(!data.name || !data.room_name)
			return success(false);
		if(!data.room)
			room = new Date().getTime() + '' + Math.floor(Math.random() * 1000);

		socket.join(room);

		success({userId: socket.id, room:room, room_name: data.room_name});

		// socket.emit('newMess', messConstructor(socket.id, `hello${data.name}`, room));
		// socket.to(room).emit('newMess', messConstructor(socket.id,`take${data.name}`, room));
	});
	socket.on("disconnect", () =>
	{
		io.emit('disconnectUser', {'id':socket.id});
	});
	socket.on('createMess', (data) =>
	{
		io.in(data.room).emit('newMess', messConstructor(data.id, data.player, data.room));
	});

	socket.on('createDamageMess', (data) =>
	{
		io.in(data.room).emit('damageMess', damageMessConstructor(data.id, data.damage, data.room));
	});
});
