import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div>
            <ul>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add</Link></li>
            </ul>
        </div>
    );
  }
}

export default Header;
