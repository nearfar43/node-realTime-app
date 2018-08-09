const expect = require('expect');

var {isRealString} = require('./validation.js');

describe('isRealString', () => {
	it('it should reject non-string value', () => {
		var res = isRealString(100);
		expect(res).toBe(false);
	});

	it('should reject string with only spece', () => {
		var res = isRealString('');
		expect(res).toBe(false);
	});

	it('should allow string with non-space characters', () => {
		var res = isRealString('Hello World');
		expect(res).toBe(true);
	});
});