var React = require('react');
var AddCarComponent = require('./AddCarComponent');
var AddEventComponent = require('./AddEventComponent');
var EditCarComponent = require('./EditCarComponent');
var Backbone = require('backbone');
var _ = require('../../node_modules/backbone/node_modules/underscore/underscore-min.js');

module.exports = React.createClass({
	componentWillMount: function() {
		this.dispatcher = {};
		_.extend(this.dispatcher, Backbone.Events);
		this.dispatcher.on('carAdded', () => {
			this.onCarAdded();
		});
		this.dispatcher.on('eventAdded', () => {
			this.onEventAdded();
		});
	},
	render: function() {
		return(
			<div>
				<div className="col-xs-6 col-sm-3 col-md-4">
					<h3></h3>
	                <button type="button" className="btn btn-primary" onClick={this.onAddCarModal}>Add Car</button>
	                <div ref="addCarBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	                    <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <AddCarComponent dispatcher={this.dispatcher}/>
                            </div>
	                    </div>
	                </div>      
		        </div>
		        <div className="col-xs-6 col-sm-3 col-md-4">
		            <h3></h3>
		            <button type="button" className="btn btn-primary" onClick={this.onAddEventModal}>Add Event</button>
                    <div ref="addEventBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <AddEventComponent dispatcher={this.dispatcher} userId={this.props.userId}/>
                            </div>
                        </div>
                    </div>     
		        </div>
		        <div className="col-xs-6 col-sm-3 col-md-4">
		            <h3></h3>
		            <button type="button" className="btn btn-primary" onClick={this.onEditCarModal}>Edit Car Info</button>
                    <div ref="editCarBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <EditCarComponent dispatcher={this.dispatcher} userId={this.props.userId}/>
                            </div>
                        </div>
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
    onCarAdded: function() {
    	$(this.refs.addCarBox).modal('hide');
    },
    onEventAdded: function() {
    	$(this.refs.addEventBox).modal('hide');
    }
    
})