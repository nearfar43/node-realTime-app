const expect = require('expect');

var {generateMessage} = require('./message.js');

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