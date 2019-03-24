import * as React from 'react'
import {Router, Route } from "react-router-dom";
import Index from './component/index/index'
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
          <Route path="/index" component={Index}/>
          <Route path="/signUp" component={Signup}/>
        </div>
      </Router>
    );
  }
}

export default App;
