import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

class Edit extends Component {
  state = {
    selectedFile: null,
    redirect: false,
    product: {}
  };

    componentWillMount(){
        const { match: { params } } = this.props;

        axios.get(`http://localhost:3001/product/${params.product_id}`)
        .then((result) => {
            this.setState({
                product: result.data
            })
        })
    }

  onFileChange = event => { 
    this.setState({ selectedFile: event.target.files[0] });
  };

  kirim_update(refs){
    const { match: { params } } = this.props;

    const self = this;
    const formData = new FormData(); 
  
    formData.append('name', refs.name.value);
    formData.append('price', refs.price.value);
    formData.append('description', refs.description.value);
    formData.append("product_image", this.state.selectedFile);

    axios.patch(`http://localhost:3001/product/edit/${params.product_id}`, formData, {
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
                {this.renderRedirect()}
                <Header />
                <form id="simple-form" action="#">
                <input type="text" placeholder="Product Name" defaultValue={this.state.product.name} ref="name" required /><br/>
                <input type="number" placeholder="Price" defaultValue={this.state.product.price} ref="price" required /><br/>
                <input type="text" placeholder="Description" defaultValue={this.state.product.description} ref="description" required /><br/>
                <input type="file" accept="image/*" onChange={this.onFileChange} /><br/>
                <input type="button" onClick={() => this.kirim_update(this.refs)} value="Submit" />
                </form>
            </div>
        );
  }
}

export default Edit;
