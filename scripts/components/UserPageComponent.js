// this component has several other components passed into it for rendering. It will also display most of the user's information.
var React = require('react');
var EventModel = require('../models/EventModel');
var ImageModel = require('../models/ImageModel');
var CarModel = require('../models/CarModel');
var TireSetModel = require('../models/TireSetModel')
var AddCarComponent = require('./AddCarComponent');
var AddEventComponent = require('./AddEventComponent');
var EditCarComponent = require('./EditCarComponent');
var AddUpdateTireComponent = require('./AddUpdateTireComponent');
var Backbone = require('backbone');
var _ = require('../../node_modules/backbone/node_modules/underscore/underscore-min.js');

module.exports = React.createClass({
	getInitialState: function() {
	    return ({
	    	cars: [],
	        events: [],
	        images: []
	    });
	},
	componentWillMount: function() {
		var eventQuery = new Parse.Query(EventModel);
		var imageQuery = new Parse.Query(ImageModel);
		eventQuery.include('tires');
		eventQuery.include('car');
		eventQuery.equalTo('user', new Parse.User({objectId: this.props.userId}));
		eventQuery.find().then( (events) => {
			this.setState({events: events});
		})
		imageQuery.find().then((images) => {
			this.setState({images: images});
		})
		this.dispatcher = {};
		_.extend(this.dispatcher, Backbone.Events);
		this.dispatcher.on('carAdded', () => {
			this.onCarAdded();
		})
		this.dispatcher.on('eventAdded', () => {
			this.onEventAdded();
		})
		this.dispatcher.on('carEdited', () => {
			this.onCarEdited();
		})
		this.dispatcher.on('tiresUpdated', () => {
			this.onTiresUpdated();
		})
	},
	render: function() {
		var events = this.state.events.map((Event) => {
			var car = Event.get('car');
			var tires = Event.get('tires');
			var user = Event.get('user');
			var date = Event.get('createdAt').toString().slice(0, 15);
			return(
				<div className="eventBox">
					<h4>Event Location:{Event.get('location')}</h4>
					<div>{date}</div>
					<div>{car.get('carClass')+' - '+car.get('make')+' '+car.get('model')}</div>
					<div>Tires - {tires.get('model')}</div>
					<div>{Event.get('eventComments')}</div>
				</div>
			)
		})
		return(
			<div className="container userContainer">
				<div className="row">
					<div className="col-md-4">
		                <button type="button" className="btn btn-primary userButton" onClick={this.onAddCarModal}>Add Car</button>
		                <div ref="addCarBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
		                    <div className="modal-dialog modal-sm">
		                        <div className="modal-content">
		                            <AddCarComponent dispatcher={this.dispatcher}/>
		                        </div>
		                    </div>
		                </div> <br />    
			            <button type="button" className="btn btn-primary userButton" onClick={this.onAddEventModal}>Add Event</button>
		                <div ref="addEventBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
		                    <div className="modal-dialog modal-lg">
		                        <div className="modal-content">
		                            <AddEventComponent dispatcher={this.dispatcher} userId={this.props.userId}/>
		                        </div>
		                    </div> 
		                </div>  <br />   
			            <button type="button" className="btn btn-primary userButton" onClick={this.onEditCarModal}>Edit Car Info</button>
		                <div ref="editCarBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
		                    <div className="modal-dialog modal-sm">
		                        <div className="modal-content">
		                            <EditCarComponent dispatcher={this.dispatcher} userId={this.props.userId}/>
		                        </div>
		                    </div>
		                </div>   <br /> 
			            <button type="button" className="btn btn-primary userButton" onClick={this.onUpdateTiresModal}>Add Tire Info</button>
		                <div ref="updateTiresBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
		                    <div className="modal-dialog modal-sm">
		                        <div className="modal-content">
		                            <AddUpdateTireComponent dispatcher={this.dispatcher} userId={this.props.userId}/>
		                        </div>
		                    </div>
		                </div>     
			        </div>
			        <div className="col-md-8">
						{events}
					</div>
				</div>
			</div>
		)
	},
	onAddCarModal: function() {
        $(this.refs.addCarBox).modal('show');       
    },
    onAddEventModal: function() {
        $(this.refs.addEventBox).modal('show');       
    },
    onEditCarModal: function() {
        $(this.refs.editCarBox).modal('show');       
    },
    onUpdateTiresModal: function() {
    	$(this.refs.updateTiresBox).modal('show'); 
    },
    onCarAdded: function() {
    	$(this.refs.addCarBox).modal('hide');
    },
    onEventAdded: function() {
    	$(this.refs.addEventBox).modal('hide');
    },
    onCarEdited: function() {
    	$(this.refs.editCarBox).modal('hide');
    },
    onTiresUpdated: function() {
    	$(this.refs.updateTiresBox).modal('hide');
    }
})