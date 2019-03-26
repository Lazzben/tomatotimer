import * as React from 'react'
import {Router, Route } from "react-router-dom";
import Home from './component/home/home'
import Signup from './component/signup/signup'
import Login from './component/login/login'
import history from './config/history'


class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" exact={true} component={Login} />
          <Route path="/login" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/signUp" component={Signup}/>
        </div>
      </Router>
    );
  }
}

export default App;
