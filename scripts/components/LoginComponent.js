var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	getInitialState: function() {
		return {error: null};
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
			return(
				<form className="loginForm" onSubmit={this.onLogin}>
					<div className="form-group">					
						<label>Email address</label>
						<input type="email" className="form-control" ref="email" placeholder="Email" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" ref="password" placeholder="Password" />
					</div>
					{errorElement}
					<button type="submit" className="btn btn-default">Log On!</button>
				</form>
			)
	},
	onLogin: function(e) {
		e.preventDefault();
		Parse.User.logIn(
			this.refs.email.value,
			this.refs.password.value,
			{
				success: (u) => {
					this.props.router.navigate('home', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
				});
			}
		});
	}
});