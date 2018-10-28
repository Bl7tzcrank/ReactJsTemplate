import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import ShoppingList from './ShoppingList';
import Home from './Home';
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.css';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

class SecureApp extends Component {
  render() {
    return (
      
        <div className="App">
          <AppNavbar/>
          <Container>
            <Route path="/meshloc/shoppingList" component={ShoppingList} />
            <Route path="/meshloc/home" component={Home} />
            <Route path="/meshloc/user" component={User} />
          </Container>
        </div>
    );
  }
}

export default SecureApp;
