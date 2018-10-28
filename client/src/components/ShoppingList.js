import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import ItemModal from './ItemModal';

class ShoppingList extends Component{

	componentDidMount(){
		this.props.getItems();
	}

	onDeleteClick = (id) => {
		this.props.deleteItem(id);
	}

	onReload(){
		//this.props.getItems();
		//console.log(this.props.getItems())
		console.log(this.props)
	}

	render(){
		const { items } = this.props.item;
		return(
			<Container>
				<ItemModal/>
				<Button
					className=""
					color="danger"
					size="sm"
					onClick={() => this.onReload()}
				> Action
				</Button>
				<hr/>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ _id, name }) => (
							<CSSTransition classNames="fade" key={_id} timeout={500}>
								<ListGroupItem>
									{name}
									<Button
										className="remove-items-btn"
										color="danger"
										size="sm"
										onClick={this.onDeleteClick.bind(this, _id)
										}
									> &times;
									</Button>
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

/*ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}*/


const mapStateToProps = (state) => ({
	item: state.item
});

export default connect(
	mapStateToProps, 
	{ getItems, deleteItem }
)(ShoppingList);









