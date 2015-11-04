'use strict';
Parse.initialize('u0gLvnJkdRJJehZdZM1yjsdXQ5UBUDpMNYW8XwT2', 'J1ZNtYR0d27pbIEhWIaAE9ZN5OTqwhuqXxaU22QQ');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var App = document.getElementById('app');
var NavigationComponent = require('./components/NavigationComponent');
var HomePageComponent = require('./components/HomePageComponent');
var UserPageComponent = require('./components/UserPageComponent');
var LandingPageComponent = require('./components/LandingPageComponent');
var TireInfoComponent = require('./components/TireInfoComponent');
window.$ = require('jquery');
window.jQuery = $;

var Router = Backbone.Router.extend({
	routes: {
		'': 'landing',
		'home': 'home',
		'tireInfo/:id': 'tireInfo',
		'user/:id': 'userPage',
		'logOut': 'logOut'
	},
	landing: function() {
		ReactDOM.render(
			<LandingPageComponent router={r}/>,
			App
		)
	},
	home: function() {
		ReactDOM.render(
			<HomePageComponent router={r}/>,
			App
		)
	},
	tireInfo: function() {
		ReactDOM.render(
			<TireInfoComponent />
		)
	},
	userPage: function(id) {
		ReactDOM.render(
			<UserPageComponent userId={id}/>,
			App
		)
	},
	logOut: function() {
		Parse.User.logOut();
		this.navigate('', {trigger: true});
	}
})
var r = new Router();
Backbone.history.start();
ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);