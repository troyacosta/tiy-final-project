//this component will track and display the life span of a tire set
var React = require('react');
var TireSetModel = require('../models/TireSetModel');

module.exports = React.createClass({
	getInitialState: function() {
	    return ({
	      	percentage: null   	
	    })
	},
	componentWillMount: function() {
		var query = new Parse.Query(TireSetModel);
		query.get(this.props.tiresId).then((tires) => {
			var wearPercentage = null;
			//calculation will be based on whether the tires are street or race tires
			if(tires.get('raceTires') === true) {
				wearPercentage = Math.floor((tires.get('runs')/75)*100);
				this.setState({percentage: wearPercentage});
			}
			else {
				wearPercentage = Math.round((tires.get('runs')/130)*100);
				this.setState({percentage: wearPercentage});
			}
		})
	},
	render: function() {
		var wearPercentage = this.state.percentage;
		return(
			<div className='progress'>
				<div className='progress-bar'
					role='progressbar'
					aria-valuemin='0'
					aria-valuemax='100'
					style={{width: wearPercentage+'%'}}>
					{wearPercentage}% Complete
				</div>
			</div>
		)
	}
})