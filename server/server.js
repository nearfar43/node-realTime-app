const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;



var app = express();
//set socket.io in server
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//register a connection event listener 
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'jenny',
	// 	text: 'hello world',
	// 	createdAt: 11123
	// });

	//handle join room event
	socket.on('join', (params, callback) => {

		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		//socket.emit from Admin
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app !'));
		//socket.broadcast from Admin to New user joined
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined !`)); 


		callback();
	});

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		//emit every singal connection	
		io.emit('newMessage', generateMessage(message.from, message.text));

		//send data back to client
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to().emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
		}
	});

});


server.listen(port, () => {
	console.log(`Server is up on Port ${port}`);
});

//https://peaceful-ocean-78703.herokuapp.com