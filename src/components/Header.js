import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Header extends Component {
  state = {
    login: true,
    user_detail: {}
  }

  componentWillMount(){
    const token = cookies.get('jwtToken');

    axios.get(`http://localhost:3001/auth/token/decode/${token}`)
    .then((result) => {
      console.log(result);
        this.setState({
          user_detail: result.data.user_detail
        })
    })
  }

  logout(){
    cookies.remove('jwtToken');

    this.setState({
        login: false
    })
  }

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
        <div>
            {this.loginRedirect()}
            <ul>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add</Link></li>
            </ul>
            Welcome, {this.state.user_detail.name}<br/>

            <input type="button" onClick={() => this.logout()} value="Logout" />
        </div>
    );
  }
}

export default Header;
