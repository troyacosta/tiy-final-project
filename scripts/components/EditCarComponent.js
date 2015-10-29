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
					<div className="form-group">					
						<label>Tire Brand</label>
						<input type="text" className="form-control" ref="brand" placeholder="Hoosier" />
					</div>
					<div className="form-group">					
						<label>Tire Model</label>
						<input type="text" className="form-control" ref="tireModel" placeholder="A7" />
					</div>
					<div className="form-group">					
						<label>Front Tire Size</label>
						<input type="text" className="form-control" ref="frontTireSize" placeholder="295/35/18" />
					</div>
					<div className="form-group">					
						<label>Rear Tire Size</label>
						<input type="text" className="form-control" ref="rearTireSize" placeholder="315/30/18" />
					</div>
					<div className="form-group">					
						<label>Tire Set Condition</label>
						<input type="text" className="form-control" ref="tireCondition" placeholder="Scuffed" />
					</div>
					<div className="form-group">					
						<label>Tread Depth</label>
						<input type="text" className="form-control" ref="treadDepth" placeholder="5/32" />
					</div>
					<button type="submit" className="btn btn-default">Save Car Info!</button>
				</form>
			)
	},
	getCarInfo: function() {
		var car = this.refs.carPick.value;
		var query = new Parse.Query(TireSetModel);
		query.include('car');
		query.equalTo('car', new CarModel({objectId: car}))
		query.find().then( (tires) => {
			this.setState({tires: tires});
		}).then( () => {
			var tires = this.state.tires[0];
			var car = this.state.tires[0].get('car');
			this.refs.make.value = car.get('make');
			this.refs.model.value = car.get('model');
			this.refs.year.value = car.get('year');
			this.refs.carClass.value = car.get('carClass');
			this.refs.weight.value = car.get('weight');
			this.refs.color.value = car.get('color');
			this.refs.frontWheelSize.value = car.get('frontWheelSize');
			this.refs.rearWheelSize.value = car.get('rearWheelSize');
			this.refs.brand.value = tires.get('brand');
			this.refs.tireModel.value = tires.get('tireModel');
			this.refs.frontTireSize.value = tires.get('frontTireSize');
			this.refs.rearTireSize.value = tires.get('rearTireSize');
			this.refs.tireCondition.value = tires.get('tireCondition');
			this.refs.treadDepth.value = tires.get('treadDepth');
		})

	},
	saveCarInfo: function() {

	}
})