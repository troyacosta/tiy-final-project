'use strict';
Parse.initialize('u0gLvnJkdRJJehZdZM1yjsdXQ5UBUDpMNYW8XwT2', 'J1ZNtYR0d27pbIEhWIaAE9ZN5OTqwhuqXxaU22QQ');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var App = document.getElementById('app');
var NavigationComponent = require('./components/NavigationComponent');
var HomePageComponent = require('./components/HomePageComponent');
var RegisterLoginComponent = require('./components/RegisterLoginComponent');
var UserPageComponent = require('./components/UserPageComponent');
window.$ = require('jquery');
window.jQuery = $;

var Router = Backbone.Router.extend({
	routes: {
		'home': 'home',
		'register': 'registerLogin',
		'login': 'resgisterLogin',
		'user/:id': 'userPage'
	},
	home: function() {
		ReactDOM.render(
			<HomePageComponent router={r}/>,
			App
		)
	},
	registerLogin: function() {
		ReactDOM.render(
			<RegisterLoginComponent router={r}/>,
			App
		)
	},
	userPage: function(id) {
		ReactDOM.render(
			<UserPageComponent userId={id}/>,
			App
		)
	}
})
var r = new Router();
Backbone.history.start();
ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);