import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    state = {
        redirect: false,
        register_failed: false,
        error_message: ''
    }

    register(refs){
        const self = this;
        const formData = new FormData(); 
      
        formData.append('username', refs.username.value);
        formData.append('password', refs.password.value);
        formData.append('name', refs.name.value);
        formData.append('email', refs.email.value);
        formData.append('phonenumber', refs.phonenumber.value);
    
        axios.post('http://localhost:3001/auth/register', formData, {
        }).then(function(response){
            console.log(response.data);
    
            if (response.data.success) self.setState({ redirect: true });
            else {
                self.setState({
                    register_failed: true,
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

    renderRegisterFailed = () => {
        if (this.state.register_failed) {
          return <h6>{this.state.error_message}</h6>
        }
    }

    render() {
        return (
        <div>
            {this.renderRedirect()}
            {this.renderRegisterFailed()}
            <form>
                <input type="text" placeholder="Username" ref="username" /><br/>
                <input type="password" placeholder="Password" ref="password" /><br/>
                <input type="text" placeholder="Name" ref="name" /><br/>
                <input type="text" placeholder="Email" ref="email" /><br/>
                <input type="text" placeholder="Phone Number" ref="phonenumber" /><br/>
                <input type="button" onClick={() => this.register(this.refs)} value="Submit" />
            </form>
        </div>
        );
    }
}

export default Register;
