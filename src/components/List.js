import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Header from './Header';

const cookies = new Cookies();

class List extends Component {
    state = {
        products: [],
        login: false
    }

    componentWillMount(){
        if (cookies.get('jwtToken')) this.setState({login: true});

        axios.get('http://localhost:3001/product')
        .then((result) => {
            this.setState({
                products: result.data
            })
        })
    }

    loginRedirect = () => {
        if (!this.state.login) {
          return <Redirect to='/login' />
        }
    }

    delete_product(product_id){
        const self = this;

        axios.delete(`http://localhost:3001/product/delete/${product_id}`, {
        }).then(function(response){
            if (response.data.success) self.setState({ products: response.data.products });
        }).catch(function(err){
            console.log(err);
        });
    }

    render() {
        const styles = {
            product_image: {
                width: "200px",
                height: "200px"
            }
        }

        const products = this.state.products.map((item, index)=>{
            return <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td><img src={`http://localhost:3001/assets/images/${item.image_filename}`} style={styles.product_image}/></td>
                <td><Link to={`/edit/${item.id}`}><button>Edit</button></Link></td>
                <td><button onClick={() => this.delete_product(item.id)}>Delete</button></td>
            </tr>;
        })          
        return (
            <div>
                {this.loginRedirect()}
                <Header />
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {products}
                </table>
            </div>
        );
    }
}

export default List;
