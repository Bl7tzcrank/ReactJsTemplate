import React, {Component} from 'react';
import {Button} from 'reactstrap';

class Home extends Component{

	action(){
		console.log(this.props)
	}

	render(){
		return (
			<div>
				<Button
					className=""
					color="danger"
					size="sm"
					onClick={() => this.action()}
				> Action
				</Button>
				<h1>Home.</h1>
			</div>
		)
	}
}

export default Home;