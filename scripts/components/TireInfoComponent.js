//this component will display the choosen tire set's pictures and relevant data
var React = require('react');
var ImageModel = require('../models/ImageModel');
var TireSetModel = require('../models/TireSetModel');
var TireProgressBar = require('./TireProgressBar');

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
		tireQuery.include('user');
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
		var tires = this.state.tires ? this.state.tires.get('brand')+' '+this.state.tires.get('model'): 'loading';
		var user = this.state.tires ? this.state.tires.get('user').get('firstName')+' '+
			this.state.tires.get('user').get('lastName'): 'loading';
		var car = this.state.tires ? this.state.tires.get('car').get('carClass')+ ' '+
			this.state.tires.get('car').get('model'): 'loading';
		var pic = this.state.pictures.map((picture) => {
			return(
				<li key={picture.id} className="col-md-4">
					<div className="panel panel-default">
            			<div className="panel-body">
                			<div className="panel-info">
								<p>Event Location:  {picture.get('event').get('location')}</p>
								<p>Surface:  {picture.get('event').get('surface')}</p>
								<p>Course Length:  {picture.get('event').get('courseLength')} seconds</p>
								<p>Event Runs:  {picture.get('event').get('numberOfRuns')}</p>
								<p>Total Runs On Tire:  {picture.get('tires').get('runs')}</p>
							</div>
							<div className="panel-more1 imageContainer">
								<img className="tireImage" src={picture.get('image').url()} />
							</div>
						</div>
					</div>
				</li>
			)
		})
		return(
			<div className="container-fluid">
				<p>Car: <strong>{car}</strong></p>
				<p>Driver: <strong>{user}</strong></p>
				<h4>Projected life cycle for this set of {tires}</h4>
				<TireProgressBar tiresId={this.props.tiresId}/>
				<div className="container" >
					<ul className="list-group">
						{pic}
					</ul>
				</div>
			</div>
		)
	}
})