//this component will be the home page for users once they're logged in. It will display the latest 
//events that have been added, regardless of who added them.
var React = require('react');
var EventModel = require('../models/EventModel');
var TireSetModel = require('../models/TireSetModel')

module.exports = React.createClass({
	getInitialState: function() {
	    return ({
	        events: [],
	        tires:[]
	    });
	},
	//queries all the events that have been saved and includes the cars and tires that were part of each event.
	componentWillMount: function() {
		var eventQuery = new Parse.Query(EventModel);
		var tireSetQuery = new Parse.Query(TireSetModel);
		eventQuery.include('car');
		eventQuery.include('tires');
		eventQuery.include('user');
		eventQuery.limit(10);
		eventQuery.find().then((events) => {
			this.setState({events: events});
		})
		tireSetQuery.find().then((tires) => {
			this.setState({tires: tires});
		})
	},
	render: function() {
		var activeTires = this.state.tires.map((tireSet) => {
			if(tireSet.get('retired') === false) {
				return(
					<a href={'#tireInfo/'+tireSet.id}>{tireSet.get('brand')+' - '+tireSet.get('model')}</a>
				)
			}
		})
		var retiredTires = this.state.tires.map((tireSet) => {
			if(tireSet.get('retired') === true) {
				return(
					<a href={'#tireInfo/'+tireSet.id}>{tireSet.get('brand')+' - '+tireSet.get('model')}</a>
				)
			}
		})
		var eventInfo = this.state.events.map((Event) => {
			var car = Event.get('car');
			var tires = Event.get('tires');
			var poster = Event.get('user');
			var date = Event.get('createdAt').toString().slice(0, 15);
			return(
				<div className="container homePage">
					<div className="row">
						<div className="homePageEvent col-md-9">
							<h4>Event Location: {Event.get('location')}</h4>
							<div>Car - {car.get('carClass')+' - '+car.get('make')+' '+car.get('model')}</div>
							<div>Tires - {tires.get('model')}</div>
							<div>{Event.get('eventComments')}</div>
							<h6><i>Added by {poster.get('firstName')+' '+poster.get('lastName')} on {date}</i></h6>
						</div>
					</div>
				</div>
			)
		})
		return(
			<div className="homePage">
				<div className="col-md-2">
					<h4>Active Tire Sets</h4>
					{activeTires}
					<h4>Retired Tire Sets</h4>
					{retiredTires}
				</div>
				<div className="col-md-8">
					<h2>Events</h2>
					{eventInfo}
				</div>
			</div>
		)
	}
})