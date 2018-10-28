import React, { Component } from 'react';
import Login from './Login';
import SecureApp from './components/SecureApp';
import NotFound from './NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router, Route, Redirect} from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import store from './store';
import { authorized } from './utilities/auth';
import FlashMessage from './components/FlashMessage'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authorized() === true
      ? <Component {...props} />
      : <Redirect to='/login'/>
  )} />
)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
              {/*<Redirect from="/" to="/login"/>*/}
              <Route path="/login" component={Login}/>
              <PrivateRoute path="/notfound" component={NotFound}/>
              <PrivateRoute path="/meshloc" component={SecureApp}/>
              <div className="flash">
                <FlashMessage/>
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
