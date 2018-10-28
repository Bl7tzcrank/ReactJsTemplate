import React, {Component} from 'react';
import {Button, Table, Container} from 'reactstrap';
import { getUsers, deleteUser } from '../actions/userActions';
import { connect } from 'react-redux';
import { flash } from '../actions/alertActions';

class UserTable extends Component{
	
	componentDidMount(){
		this.props.getUsers();
	}

	onDeleteClick = (id) => {
		this.props.deleteUser(id)
		.then(res => {
			if(res.data.success){
				this.props.flash({text: res.data.msg, type: "success"}, 3000);
			} else{
				this.props.flash({text: res.data.msg, type: "danger"}, 3000);
			}
		})	
	}

	render(){
		const { users } = this.props.user;
		return (
			<Container>
				<Table hover>
                    <thead>
	                    <tr>
	                    	<th>User</th>
	   						<th className="w-25">Actions</th>
	                    </tr>
                    </thead>
                    <tbody>
	                    {users.map(({ _id, username }) => (
	                    <tr key={_id}>
		                    <td>{username}</td>
		                    <td>
		                        <Button 
									color="danger"
									size="sm"
									onClick={this.onDeleteClick.bind(this, _id)
									}
								>Delete
								</Button>
							</td>
	                    </tr>
	                    ))} 
                    </tbody>
                </Table>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	alert: state.alert
});

export default connect(
	mapStateToProps, 
	{ getUsers, deleteUser, flash }
) (UserTable);