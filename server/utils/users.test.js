const expect = require('expect');

const {Users} = require('./users.js');


describe('Users', () => {
	
	var users;

	beforeEach(() => {
		users = new Users();
		users.usersArray = [{
			id: '1',
			name: 'Mike',
			room: 'Test Room'
		}, {
			id: '2',
			name: 'Jenny',
			room: 'Null Room'			
		}, {
			id: '3',
			name: 'Bryant',
			room: 'Test Room'			
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Jeff',
			room: 'Test Room'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.usersArray).toEqual([user]);

	});

	it('should remove a user', () => {

		var userId = '1';
		var user = users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.usersArray.length).toBe(2);

	});

	it('should not remove a user', () => {
		var userId = '5';
		var user = users.removeUser(userId);
		expect(user).toBeFalsy();
		expect(users.usersArray.length).toBe(3);
	});

	it('should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);
	});

	it('shoud not find user', () => {
		var userId = '5';
		var user = users.getUser(userId);
		expect(user).toBeFalsy();
	});

	it('should return names for Test Room', () => {
		var userList = users.getUserList('Test Room');
		expect(userList).toEqual(['Mike', 'Bryant']);
	});

	it('should return names for Null Room', () => {
		var userList = users.getUserList('Null Room');
		expect(userList).toEqual(['Jenny']);
	});


});