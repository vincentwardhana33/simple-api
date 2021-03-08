import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
    state = {
        redirect: false,
        login_failed: false,
        error_message: ''
    }

    login(refs){
        const self = this;
        const formData = new FormData(); 
      
        formData.append('username', refs.username.value);
        formData.append('password', refs.password.value);
    
        axios.post('http://localhost:3001/auth/login', formData, {
        }).then(function(response){
            console.log(response.data);
    
            if (response.data.success){
                cookies.set('jwtToken', response.data.token, { path: '/' });
                self.setState({ redirect: true });
            }
            else {
                self.setState({
                    login_failed: true,
                    error_message: response.data.message
                });
            }
        }).catch(function(err){
            console.log(err);
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    renderLoginFailed = () => {
        if (this.state.login_failed) {
          return <h6>{this.state.error_message}</h6>
        }
    }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        {this.renderLoginFailed()}
        <input type="text" placeholder="Username" ref="username" /><br/>
        <input type="password" placeholder="Password" ref="password" /><br/>
        <Link to="/register">Register account here</Link><br/>
        <input type="button" onClick={() => this.login(this.refs)} value="Submit" />
      </div>
    );
  }
}

export default Login;
