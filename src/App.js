import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
// import Basket from './components/Basket';

// import Copyright from './components/Copyright';
// import './scss/Style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      filteredProducts: [],
      size: '',
      sort: '',
      season: '',
      weather: undefined,
      temperature: undefined,
      city: undefined,
      humidity: undefined,
      description: undefined
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleChangeSeason = this.handleChangeSeason.bind(this);
  }
  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=bb4a064dd41f6fb2bc662bd5dc3ca0b0`
    ).then(res => {
      if (res.status !== 200) {
        console.log('error');
      }
      res.json().then(data => {
        console.log(data);
        this.setState({
          weather: data.weather[0].main,
          temperature: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ''
        });
      });
    });

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
  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }
  handleChangeSeason() {
    console.log(this.state.temperature);
    if (this.state.temperature > 293.15) {
      this.setState({ season: 'summer' });
    } else if (this.state.temperature > 283.15) {
      this.setState({ season: 'autumn' });
    } else {
      this.setState({ season: 'winter' });
    }
    this.listProducts();
  }

  listProducts() {
    this.setState(state => {
      console.log(state.season);
      if (state.sort !== '') {
        state.products.sort((a, b) =>
          state.sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      if (state.size !== '' && state.season !== '') {
        return {
          filteredProducts: state.products.filter(function(a) {
            return (
              a.availableSizes.indexOf(state.size.toUpperCase()) >= 0 &&
              a.season.indexOf(state.season.toLowerCase()) >= 0
            );
          })
        };
      } else if (state.size === '' && state.season !== '') {
        return {
          filteredProducts: state.products.filter(function(a) {
            return a.season.indexOf(state.season.toLowerCase()) >= 0;
          })
        };
      } else if (state.size !== '' && state.season === '')
        return {
          filteredProducts: state.products.filter(function(a) {
            return a.availableSizes.indexOf(state.size.toUpperCase()) >= 0;
          })
        };
      else
        return {
          filteredProducts: state.products.filter(function(a) {
            return state.filteredProducts;
          })
        };
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
            <Filter
              size={this.state.sizes}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              handleChangeSeason={this.handleChangeSeason}
              count={this.state.filteredProducts.length}
            />
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
