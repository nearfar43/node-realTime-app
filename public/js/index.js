var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    // 	from: 'andrew',
    // 	text: 'Hi'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
	console.log('New Message', message);
	var li = $('<li class="list-group-item list-group-item-action" id="listItem"></li>');
	li.text(`${message.from}: ${message.text}`);
	//$('#listItem').attr('class', 'list-group-item list-group-item-action disabled');
	$('#messageList').append(li);
});

socket.on('newLocationMessage', function(message) {
	var li = $('<li class="list-group-item list-group-item-action list-group-item-secondary"></li');
	var a = $('<a target="_blank">My current location</a>');
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messageList').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Jeff',
// 	text: 'Hey'
// }, function (data) {
// 	console.log('Received:', data);
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[id=message]').val()
	}, function() {

	});
});

//handle send location button event
var locationButton = $('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function () {
		alert('Unable to fetch location')
	});
});
