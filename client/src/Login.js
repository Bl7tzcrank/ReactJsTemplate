import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import history from './history';
import { signInAction } from './utilities/auth';
import { validateUser } from './utilities/validate';
import { flash } from './actions/alertActions';
import { connect } from 'react-redux';

class Login extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit= (e) => {
		e.preventDefault();
		const user = {
			username: this.state.username,
			password: this.state.password
		}
		if(validateUser(user)){
			signInAction(user)
			.then(res =>{
				if(res.data.success){
					localStorage.setItem('id_token', res.data.token);
	    			localStorage.setItem('user', JSON.stringify(res.data.user.username));
	    			localStorage.setItem('loggedin', 'true');
	    			this.props.flash({text: res.data.msg, type: "success"}, 3000);
	    			history.push('/meshloc/home');
				} else{
					this.props.flash({text: res.data.msg, type: "danger"} , 3000);
					history.push('/login');
				}
			})
		}else{
			this.props.flash({text: "Invalid input", type: "danger"} , 3000);
		}
	}

	render(){
		return (		
			<Container>
				<div>
	                <h1>Login</h1>
	                <Form onSubmit={this.onSubmit}>
	                    <FormGroup>
	                        <Label for="User">User</Label>
	                        <Input name="username" id="user" placeholder="Username" onChange={this.onChange}/>
	                        <Label for="examplePassword">Password</Label>
	                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}/>
	                    <Button
	                        color="dark"
	                        style={{marginTop: '2rem'}}
	                        block
	                    >
	                        Submit
	                    </Button>
	                    </FormGroup>
	                </Form>
	            </div>		
			</Container>
		)
		
	}
}

const mapStateToProps = (state) => ({
	alert: state.alert
});

export default connect(mapStateToProps, {flash}) (Login);