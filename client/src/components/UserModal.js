import React, {Component} from 'react';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	Form,
	FormGroup,
	Label,
	Input 
} from 'reactstrap';
import { connect } from 'react-redux';
import { addUser } from '../actions/userActions';
import { flash } from '../actions/alertActions';

class UserModal extends Component{
	constructor(props){
		super(props);
		this.state = {
			modal: false,
			username: '',
			password: ''
		}
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit= (e) => {
		e.preventDefault();
		const newUser = {
			username: this.state.username,
			password: this.state.password
		}
		this.props.addUser(newUser)
			.then(res => {
				if(res.data.success){
					this.props.flash({text: res.data.msg, type: "success"}, 3000);
					this.toggle();
				} else{
					this.props.flash({text: res.data.msg, type: "danger"}, 3000);
				}
			})		
	}

	render(){
		return (
			<div>
				<Button
					color="dark"
					style={{marginBottom: '2rem'}}
					onClick={this.toggle}
				>Create User</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Create a User</ModalHeader>
					<ModalBody> 
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="username">Username</Label>
								<Input
									type="text"
									name="username"
									id="username"
									onChange={this.onChange}
								/>
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									onChange={this.onChange}
								/>
								<Button
									color="dark"
									style={{marginTop: '2rem'}}
									block
								>Add User</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapsStateToProps = state => ({
	//item: state.item do this to load items in here!!! --> purpose of redux
	user: state.user,
	alert: state.alert
})

export default connect(mapsStateToProps, { addUser, flash }) (UserModal);