//this component will give the user the ability to edit information about their cars and then save 
//those changes.
var React = require('react');
var CarModel = require('../models/CarModel');
var TireSetModel = require('../models/TireSetModel');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			cars: []
		}
	},
	componentWillMount: function() {
		var query = new Parse.Query(CarModel);
		query.equalTo('user', new Parse.User({objectId: this.props.userId}));
		query.find().then( (cars) => {
			this.setState({cars: cars});
			},
			(err) => {
				console.log(err);
		})
	},
	render: function() {
			var carOptions = this.state.cars.map(function(car) {
			return(
				<option value={car.id} key={car.id}>{car.get('make')+ ' - '+car.get('model')}</option>
			)
		})
		return(
				<form className="addCarForm" onSubmit={this.saveCarInfo}>
					<div className="form-group">
						<label>Select Your Car</label>
						<select className="form-control" onChange={this.getCarInfo} ref="carPick">
							{carOptions}
						</select>
					</div>
					<div className="form-group">					
						<label>Make</label>
						<input type="text" className="form-control" ref="make" placeholder="Ford" />
					</div>
					<div className="form-group">
						<label>Model</label>
						<input type="text" className="form-control" ref="model" placeholder="Mustang" />
					</div>
					<div className="form-group">					
						<label>Year</label>
						<input type="number" className="form-control" ref="year" placeholder="2015" />
					</div>
					<div className="form-group">					
						<label>Car Class</label>
						<input type="text" className="form-control" ref="carClass" placeholder="SSM" />
					</div>
					<div className="form-group">					
						<label>Weight</label>
						<input type="number" className="form-control" ref="weight" placeholder="3250" />
					</div>
					<div className="form-group">					
						<label>Color</label>
						<input type="text" className="form-control" ref="color" placeholder="White" />
					</div>
					<div className="form-group">					
						<label>Front Wheel Size</label>
						<input type="text" className="form-control" ref="frontWheelSize" placeholder="17X10" />
					</div>
					<div className="form-group">					
						<label>Rear Wheel Size</label>
						<input type="text" className="form-control" ref="rearWheelSize" placeholder="18X12" />
					</div>
					<button type="submit" className="btn btn-default">Save Car Info!</button>
				</form>
			)
	},
	getCarInfo: function() {
		var carId = this.refs.carPick.value;
		var car = null;
		this.state.cars.map(function(Car) {
			if(carId === Car.id) {
				car = Car;
			}
		})	
		this.refs.make.value = car.get('make');
		this.refs.model.value = car.get('model');
		this.refs.year.value = car.get('year');
		this.refs.carClass.value = car.get('carClass');
		this.refs.weight.value = car.get('weight');
		this.refs.color.value = car.get('color');
		this.refs.frontWheelSize.value = car.get('frontWheelSize');
		this.refs.rearWheelSize.value = car.get('rearWheelSize');
	},
	saveCarInfo: function() {

	}
})