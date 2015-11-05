//this component will display the choosen tire set's pictures and relevant data
var React = require('react');
var ImageModel = require('../models/ImageModel');
var TireSetModel = require('../models/TireSetModel');

module.exports = React.createClass({
	getInitialState: function() {
		return({
			pictures: [],
			tires: null
		})
	},
	//queries for the pictures and tire data
	componentWillMount: function() {
		var imageQuery = new Parse.Query(ImageModel);
		var tireQuery = new Parse.Query(TireSetModel);
		tireQuery.include('car');
		imageQuery.include('tires');
		imageQuery.include('event');
		imageQuery.equalTo('tires', new TireSetModel({objectId: this.props.tiresId}));
		imageQuery.find().then((pictures) => {
			this.setState({pictures: pictures});
		})
		tireQuery.get(this.props.tiresId).then((tires) => {
			this.setState({tires: tires})
		})
	},
	render: function() {
		var pic = this.state.pictures.map((picture) => {
			return(
				<div className="col-md-4">
					<ul>
						<li>Car:  {this.state.tires.get('car').get('carClass')+ ' '+this.state.tires.get('car').get('model')}</li>
						<li>Tires:  {picture.get('tires').get('brand')+' '+picture.get('tires').get('model')}</li>
						<li>Event Location:  {picture.get('event').get('location')}</li>
						<li>Surface:  {picture.get('event').get('surface')}</li>
						<li>Course Length:  {picture.get('event').get('courseLength')} seconds</li>
						<li>Number Of Runs:  {picture.get('event').get('numberOfRuns')}</li>
						<li>Total Runs On Tire:  {picture.get('tires').get('runs')}</li>
					</ul>
					<img className="tireImage" src={picture.get('image').url()} />
				</div>
			)
		})
		return(
			<div className="container-fluid">
				<h2>Tire Data Page</h2>
				{pic}
			</div>
		)
	}
})