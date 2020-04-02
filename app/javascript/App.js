import React, {Component} from 'react';
import Dashboard from './hoc/Dashboard/Dashboard';
import Quiz from './components/Quiz/Quiz';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import QuestionCreator from './components/QuestionCreator/QuestionCreator';
import SignUpForm from './components/UserForm/SignUpForm';
import LogIn from './components/UserForm/LogIn';
import ShowUsers from './components/UserForm/ShowUsers';
import axios from 'axios';

const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('api/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
      console.log(this.state.user);
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  render() {
    return (
      <div className="App">
        <Dashboard handleLogout={this.handleLogout} 
          loggedInStatus={this.state.isLoggedIn}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/questions" exact component={Quiz} />
            <Route path="/questions/new" exact 
              render={props => (
                <QuestionCreator {...props}
                  loggedInStatus={this.state.isLoggedIn}/>
              )} 
            />
            <Route path="/users" exact 
              render={props => (
                <ShowUsers {...props}
                  loggedInStatus={this.state.isLoggedIn}/>
              )} 
            />
            {/* <Route path="/users" exact component={ShowUsers} /> */}
            <Route exact path='/login' 
              render={props => (
                <LogIn {...props} 
                  handleLogin={this.handleLogin} 
                  loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route exact path='/signup' 
              render={props => (
                <SignUpForm {...props} 
                  handleLogin={this.handleLogin} 
                  loggedInStatus={this.state.isLoggedIn}/>
              )} 
            />

          </Switch>
        </Dashboard>
      </div>
    );
  }
}

export default App;
