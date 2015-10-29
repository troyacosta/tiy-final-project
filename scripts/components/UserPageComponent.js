var React = require('react');
var AddCarComponent = require('./AddCarComponent');
var AddEventComponent = require('./AddEventComponent');
var EditCarComponent = require('./EditCarComponent');

module.exports = React.createClass({
	render: function() {
		return(
			<div>
				<div className="col-xs-6 col-sm-3 col-md-4">
					<h3></h3>
	                <button type="button" className="btn btn-primary" onClick={this.onAddCarModal}>Add Car</button>
	                <div ref="addCarBox" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	                    <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <AddCarComponent />
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
                                    <AddEventComponent userId={this.props.userId}/>
                                </div>
                            </div>
                        </div>     
		            </div>
		        </div>
		)
	},
	onAddCarModal: function() {
        $(this.refs.addCarBox).modal('show')       
    },
    onAddEventModal: function() {
        $(this.refs.addEventBox).modal('show')       
    }
    
})