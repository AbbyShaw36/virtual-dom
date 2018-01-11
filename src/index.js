import {el} from "./element";
import component from "./component";
import vm from "./view";

let data = [
	{username: 'Jerry', age: 12, reputation: 200, uid: 'user1'},
	{username: 'Pony', age: 33, reputation: 3000, uid: 'user4'},
	{username: 'Lucy', age: 21, reputation: 99, uid: 'user2'},
	{username: 'Tomy', age: 20, reputation:20, uid: 'user3'},
	{username: 'Funky', age: 49, reputation: 521, uid: 'user5'}
];

let userList = component({
	template: function(data) {
		const rows = [el("tr", {}, [
						el("th", {}, ["id"]),
						el("th", {}, ["Name"]),
						el("th", {}, ["Age"]),
						el("th", {}, ["Reputation"]),
					])];

		data.userList.forEach(function(user) {
			rows.push(el("tr", {}, [
					el("td", {}, [user.uid]),
					el("td", {}, [user.username]),
					el("td", {}, [user.age]),
					el("td", {}, [user.reputation]),
				]));
		});

		const table = el("table", {}, rows);
		const button = el("button", { "v-click": "addUser('newUser')" }, ["Add"]);
		const list = el("div", {}, [table, button]);

		return list;
	},
	data: {
		userList: data
	},
	methods: {
		addUser: function(username) {
			this.data.userList.push({
				username: username,
				age: 11,
				reputation: 222,
				uid: 'user6'
			});
			console.log(this.data.userList);
		}
	}
});

let app = vm({
	el: document.getElementById("app"),
	components: [userList]
});