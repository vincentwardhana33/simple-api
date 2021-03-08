import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Header from './Header';

const cookies = new Cookies();

class Add extends Component {
  state = {
    selectedFile: null,
    redirect: false,
    login: false
  };

  componentWillMount(){
    if (cookies.get('jwtToken')) this.setState({login: true});
  }

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to='/login' />
    }
  }

  onFileChange = event => { 
    this.setState({ selectedFile: event.target.files[0] });
  };

  kirim(refs){
    const self = this;
    const formData = new FormData(); 
  
    formData.append('name', refs.name.value);
    formData.append('price', refs.price.value);
    formData.append('description', refs.description.value);
    formData.append("product_image", this.state.selectedFile);

    axios.post('http://localhost:3001/product/add', formData, {
    }).then(function(response){
        console.log(response.data);
        document.getElementById("simple-form").reset();

        if (response.data.success) self.setState({ redirect: true, });
    }).catch(function(err){
        console.log(err);
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
        <div>
            {this.loginRedirect()}
            {this.renderRedirect()}
            <Header />
            <form id="simple-form" action="#">
                <input type="text" placeholder="Product Name" ref="name" /><br/>
                <input type="number" placeholder="Price" ref="price" /><br/>
                <input type="text" placeholder="Description" ref="description" /><br/>
                <input type="file" accept="image/*" onChange={this.onFileChange} /><br/>
                <input type="button" onClick={() => this.kirim(this.refs)} value="Submit" />
            </form>
        </div>
    );
  }
}

export default Add;
