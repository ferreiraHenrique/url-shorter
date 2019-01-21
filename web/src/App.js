import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';
import Unshorter from './components/unshorter';
import Login from './components/login';
import Register from './components/register';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
        <Router>
          <Route exact path="/login" component={Login} />
        </Router>
        <Router>
          <Route exact path="/register" component={Register} />
        </Router>
        <Router>
          <Route path="/:short" component={Unshorter} />
        </Router>
      </div>
    );
  }
}

export default App;
