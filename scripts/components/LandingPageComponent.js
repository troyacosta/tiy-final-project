var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<section>
				<main>
					  <div className="hero">
					    <h1>Track It</h1>
					    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					    <img src="../images/race-track.jpg"/>
					     <div className="bar"></div>
					  </div> 
				</main>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 icons">
						<img src="../images/helmet.png" height="100px" width="100px" />
						<h3>Lorem Ipsum</h3>
						<h4> Let us face it textbooks are not cheap. With PaperBack you can choose to borrow a book then return it when the semester ends.</h4>
						</div>
						<div className="col-md-4 icons">
						<img src="../images/race-car.png" height="100px" width="100px" />
						<h3>Auto Cross Ipsum</h3>
						<h4>This site is for anyone wanting to learn and explore the beauty of literature.</h4>
						</div>
						<div className="col-md-4 icons">
						<img src="../images/tire.png" height="100px" width="100px" />
						<h3>Tire Ipsum</h3>
						<h4>Dont have time to go the bookstore. PaperBack is perfect for you.</h4>
						</div>
					</div>
				</div>
			</section>
		)
	}
})