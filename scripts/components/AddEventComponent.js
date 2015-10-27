var React = require('react');
var EventModel = require('../models/EventModel');
var CarModel = require('../models/CarModel');

module.exports = React.createClass({
	render: function() {
		return(
			<form className="loginForm" onSubmit={this.addEvent}>
				<div className="form-group">					
					<label>Event Location</label>
					<input type="text" className="form-control" ref="location" placeholder="Location" />
				</div>
				<div className="form-group">
					<label>Weather Conditions</label>
					<input type="text" className="form-control" ref="weather" placeholder="80 degrees and sunny" />
				</div>
				<input type="filepicker" data-fp-apikey="AttpdoWEyRR2zL1yUKA3Zz" onchange="alert(event.fpfile.url)"/>
				<button type="submit" className="btn btn-default">Add Event!</button>
			</form>			
		)
	},
	addEvent: function(e) {
		e.preventDefault();
		var Event = new EventModel({
			location: this.refs.location.value,
			weather: this.refs.weather.value
		})
		Event.save();
	}
})










