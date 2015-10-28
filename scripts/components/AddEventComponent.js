var React = require('react');
var EventModel = require('../models/EventModel');
var CarModel = require('../models/CarModel');
var ImageModel = require('../models/ImageModel');
var TireSetModel = require('../models/TireSetModel');

module.exports = React.createClass({
	getIntialState: function() {
		return({
			cars: [],
			tires: []
		})
	},
	componentWillMount: function() {
		
	},
	render: function() {
		return(
			<form className="loginForm" onSubmit={this.addEvent}>
				<div className="form-group">
					<label>Select Your Car</label>
					<select>
						<option></option>
					</select>
				</div>
				<div className="form-group">					
					<label>Event Location</label>
					<input type="text" className="form-control" ref="location" placeholder="Location" />
				</div>
				<div className="form-group">
					<label>Weather Conditions</label>
					<input type="text" className="form-control" ref="weather" placeholder="80 degrees and sunny" />
				</div>
				<div className="form-group">
					<label>Surface Type</label>
					<input type="text" className="form-control" ref="surface" placeholder="Concrete" />
				</div>
				<div className="form-group">
					<label>Course Length</label>
					<input type="text" className="form-control" ref="courseLength" placeholder="56 seconds" />
				</div>
				<div className="form-group">
					<label>Number Of Runs</label>
					<input type="number" className="form-control" ref="numberOfRuns" placeholder="5" />
				</div>
				<div className="form-group">
					<label>Video Link</label>
					<input type="url" className="form-control" ref="videoLink" placeholder="http://videolink" />
				</div>
				<input type="file" ref="tirePic"/>
				<button type="submit" className="btn btn-default">Add Event!</button>
			</form>			
		)
	},
	addEvent: function(e) {
		e.preventDefault();
		var NumberOfRuns = parseInt(this.refs.numberOfRuns.value);
		var CourseLength = parseInt(this.refs.courseLength.value);
		var image = this.refs.tirePic.files[0];
		var file = new Parse.File('photo.jpg', image);
		var imageModel = new ImageModel();
		var Event = new EventModel({
			location: this.refs.location.value,
			weather: this.refs.weather.value,
			surface: this.refs.surface.value,
			courseLength: CourseLength,
			numberOfRuns: NumberOfRuns
			
		})
		imageModel.set('image', file);
		imageModel.save();
		Event.save();
	},

})










