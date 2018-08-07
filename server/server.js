const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;



var app = express();
//set socket.io in server
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//register a connection event listener 
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'jenny',
	// 	text: 'hello world',
	// 	createdAt: 11123
	// });
	
	//socket.emit from Admin
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	//socket.broadcast from Admin to New user joined
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

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
	});

});


server.listen(port, () => {
	console.log(`Server is up on Port ${port}`);
});

//https://peaceful-ocean-78703.herokuapp.com