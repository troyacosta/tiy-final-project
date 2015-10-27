var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<input type="filepicker" data-fp-apikey="AttpdoWEyRR2zL1yUKA3Zz" onchange="alert(event.fpfile.url)"/>
		)
	}
})










