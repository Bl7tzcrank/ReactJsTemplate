import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { signOutAction } from './../utilities/auth';
import { connect } from 'react-redux';
import { flash } from '../actions/alertActions';

class AppNavbar extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		isOpen: false
    	}
	}
	toggle = () => {
		this.setState({
      		isOpen: !this.state.isOpen
    	});
	}

	onLogout(){
		signOutAction();
		this.props.flash({text: "Logged out.", type: "success"}, 3000);
	}	

	render(){
		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/meshloc/home">ShoppingList</NavbarBrand>
						<NavbarToggler onClick={this.toggle}/>
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink tag={Link} to="/meshloc/home">
										Home
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/meshloc/shoppingList">
										ShoppingList
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/meshloc/user">
										User
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to="/login" onClick={() => this.onLogout()}>
										Logout
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		)	
	}
}

const mapsStateToProps = state => ({
	alert: state.alert
})

export default connect(mapsStateToProps, {flash}) (AppNavbar);