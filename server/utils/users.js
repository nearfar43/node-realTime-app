//ES6 classes

class Users {

	constructor() {
		this.usersArray = [];
	}

	//add user 
	addUser(id, name, room) {
		var user = {id, name, room};
		this.usersArray.push(user);
		return user;
	}
	//remove user
	removeUser(id) {
		var user = this.getUser(id);

		if (user) {
			this.usersArray = this.usersArray.filter((user) => user.id !== id);
		}

		return user;
	}

	//get user
	getUser(id) {
		return this.usersArray.filter((user) => user.id === id)[0];
	}

	//get user list
	getUserList(room) {
		var users = this.usersArray.filter((user) => {
			return user.room === room;
		});

		var namesArray = users.map((user) => {
			return user.name;
		});

		return namesArray;
	}

}





module.exports = {
	Users: Users
}