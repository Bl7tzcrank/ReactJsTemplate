import React, {Component} from 'react';
import {Alert} from 'reactstrap';
import { connect } from 'react-redux';

class FlashMessage extends Component{

	render(){
		return (
			<div>
				<Alert 
                color={this.props.alert.type}
                isOpen={this.props.alert.open}
                >
                {this.props.alert.text}
              </Alert>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	alert: state.alert
});

export default connect(
	mapStateToProps) (FlashMessage);