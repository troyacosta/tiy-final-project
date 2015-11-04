//this component will be the home page for users once they're logged in. It will display the latest 
//events that have been added, regardless of who added them.
var React = require('react');
var EventModel = require('../models/EventModel');

module.exports = React.createClass({
	getInitialState: function() {
	    return ({
	    	cars: [],
	        events: [],
	        tires: [],
	    });
	},
	//queries all the events that have been saved and includes the cars and tires that were part of each event.
	componentWillMount: function() {
		var query = new Parse.Query(EventModel);
		query.include('car');
		query.include('tires');
		query.include('user');
		query.limit(10);
		query.find().then( (events) => {
			this.setState({events: events});
		})
	},
	render: function() {
		var eventInfo = this.state.events.map( (Event) => {
			var car = Event.get('car');
			var tires = Event.get('tires');
			var poster = Event.get('user');
			var date = Event.get('createdAt').toString().slice(0, 15);
			return(
					<div className="container homePage">
						<div className="row">
							<div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 homePageEvent">
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
				<h2>Events</h2>
				{eventInfo}
			</div>
		)
	}
})