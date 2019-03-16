import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './component/index'
import Signup from './component/signup'
import Login from './component/login'


class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} component={Index} />
          <Route path="/signUp" component={Signup}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
