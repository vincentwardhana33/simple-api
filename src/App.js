import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={List}/>
        <Route path="/add" component={Add}/>
        <Route path="/edit/:product_id" component={Edit}/>
      </div>
    );
  }
}

export default App;
