import React, { Component } from 'react';
import Products from './components/Products';
// import Filter from './components/Filter';
// import Basket from './components/Basket';

// import Copyright from './components/Copyright';
// import './scss/Style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      filteredProducts: []
    };
  }
  componentWillMount() {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data,
          filteredProducts: data
        });
        console.log(data);
      });
  }

  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>
          E-commerce Shopping Cart Application
        </h1>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <hr />
            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default App;
