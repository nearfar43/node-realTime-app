const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'Jeff';
		var text = 'Hello World!';

		var message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({
			from: from,
			text: text
		});
	});
});

describe('generateLocationMessage', () => {
	it('should generate corret location object', () => {
		var from = 'Jeff';
		var latitude = 30.5;
		var longitude = 16.4;
		var url = 'https://www.google.com/maps?q=30.5,16.4';

		var location = generateLocationMessage(from, latitude, longitude);

		expect(typeof location.createdAt).toBe('number');
		expect(location).toMatchObject({
			from: from,
			url: url
		});
	});
});