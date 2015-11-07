//this component will track and display the life span of a tire set
var React = require('react');
var TireSetModel = require('../models/TireSetModel');

module.exports = React.createClass({
	coponentWillMount: function() {
		var query = new Parse.Query(TireSetModel);
	},
	render: function() {
		return(
			<div className='progress'>
				<div className='progress-bar'
					role='progressbar'
					aria-valuenow='70'
					aria-valuemin='0'
					aria-valuemax='200'
					style={{width: '70%'}}>
					<span className='sr-only'>70% Complete</span>
				</div>
			</div>
		)
	}
})