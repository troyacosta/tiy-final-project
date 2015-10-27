var React = require('react');
var CarModel = require('../models/CarModel');
var TireSetModel = require('../models/TireSetModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {error: null};
	},
	render: function() {
		return(
				<form className="addCarForm" onSubmit={this.addCar}>
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
					<input type="filepicker" data-fp-apikey="AttpdoWEyRR2zL1yUKA3Zz" onchange="alert(event.fpfile.url)"/>
					<button type="submit" className="btn btn-default">Add Car!</button>
				</form>
			)
	},
	addCar: function(e) {
		e.preventDefault();
		var carYear = parseInt(this.refs.year.value);
		var carWeight = parseInt(this.refs.weight.value);
		var Car = new CarModel({
			make: this.refs.make.value,
			model: this.refs.model.value,
			year: carYear,
			carClass: this.refs.carClass.value,
			weight: carWeight,
			color: this.refs.color.value,
			frontWheelSize: this.refs.frontWheelSize.value,
			rearWheelSize: this.refs.rearWheelSize.value,
			user: Parse.User.current()
		});
		Car.save(null, {
			success: (Car) => {
				var Tires = new TireSetModel({
					brand: this.refs.brand.value,
					model: this.refs.tireModel.value,
					frontTireSize: this.refs.frontTireSize.value,
					rearTireSize: this.refs.rearTireSize.value,
					car: Car
				});
				Tires.save();			
			},
			error: (Car, error) => {
				console.log(error);
			}
		});
	}
})