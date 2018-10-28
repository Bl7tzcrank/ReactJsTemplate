import React, {Component} from 'react';
import UserTable from './UserTable';
import {Container} from 'reactstrap';
import UserModal from './UserModal';

class User extends Component{
	render(){
		return (
			<Container>
				<Container>
					<h1>Manage Users</h1>
					<hr/>
				</Container>
				<Container>
					<UserModal/>
				</Container>
				<Container>
					<UserTable/>
				</Container>
			</Container>
		)
	}
}

export default User;