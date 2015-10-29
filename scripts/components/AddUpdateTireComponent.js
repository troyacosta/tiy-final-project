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
			<form className="addTireForm" onSubmit={this.saveTireInfo}>
				<div className="form-group">
					<label>Select Your Car</label>
					<select className="form-control" onChange={this.getCarTireInfo} ref="carPick">
						{carOptions}
					</select>
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
				<button type="submit" className="btn btn-default">Save Tire Info!</button>
			</form>
		)
	},
	getCarTireInfo: function(e) {
		e.preventDefault();
		var car = this.refs.carPick.value;
		var query = new Parse.Query(TireSetModel);
		query.include('car');
		query.equalTo('car', new CarModel({objectId: car}))
		query.find().then( (tires) => {
			this.setState({tires: tires});
		}).then( () => {
			var tires = this.state.tires[0];
			this.refs.brand.value = tires.get('brand');
			this.refs.tireModel.value = tires.get('model');
			this.refs.frontTireSize.value = tires.get('frontTireSize');
			this.refs.rearTireSize.value = tires.get('rearTireSize');
			this.refs.tireCondition.value = tires.get('tireCondition');
			this.refs.treadDepth.value = tires.get('treadDepth');
		})	
	}	
})