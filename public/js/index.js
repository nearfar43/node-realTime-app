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

socket.emit('createMessage', {
	from: 'Jeff',
	text: 'Hey'
}, function (data) {
	console.log('Received:', data);
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[id=message]').val()
	}, function() {

	});
});
