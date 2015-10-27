var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {error: null};
	},
	render: function() {
		return(
				<form className="loginForm" onSubmit={this.addCar}>
					<div className="form-group">					
						<label>Email address</label>
						<input type="email" className="form-control" ref="email" placeholder="Email" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" ref="password" placeholder="Password" />
					</div>
					{errorElement}
					<input type="filepicker" data-fp-apikey="AttpdoWEyRR2zL1yUKA3Zz" onchange="alert(event.fpfile.url)"/>
					<button type="submit" className="btn btn-default">Add Car!</button>
				</form>
			)
	},
	addCar: function(e) {
		e.preventDefault();
		Parse.User.logIn(
			this.refs.email.value,
			this.refs.password.value,
			{
				success: (u) => {
					this.props.router.navigate('blogs', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
				});
			}
		});
	}
})