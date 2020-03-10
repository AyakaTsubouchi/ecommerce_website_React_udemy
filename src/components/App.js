import React, { Component } from 'react';
import Products from './Products';
import Filter from './Filter';
import Basket from './Basket';
import Header from './Header';
import WeatherInfo from './WeatherInfo';

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
      weatherImg: undefined,
      temperature: undefined,
      city: undefined,
      humidity: undefined,
      description: undefined,
      cartItems: []
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleChangeSeason = this.handleChangeSeason.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=bb4a064dd41f6fb2bc662bd5dc3ca0b0`
    ).then(res => {
      if (res.status !== 200) {
        console.log('error');
      }
      res
        .json()
        .then(data => {
          console.log(data);
          this.setState({
            weather: data.weather[0].main,
            temperature: data.main.temp,
            city: data.name,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ''
          });
        })
        .then(state => {
          if (this.state.weather === 'clear') {
            this.setState({ weatherImg: 'sun' });
          } else if (this.state.weather === 'Rain') {
            this.setState({ weatherImg: 'rainy' });
          } else {
            this.setState({ weatherImg: 'cloudy' });
          }
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
  handleAddToCart(e, product) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if (item.id === product.id) {
          productAlreadyInCart = true;
          item.count++;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }
  handleRemoveFromCart(e, item) {
    this.setState(state => {
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      //now cartItems are the itmes which aren't clicked
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // console.log("I'm handleRemove");
      return { cartItems: cartItems };
    });
  }
  render() {
    console.log('weather image' + this.state.weatherImg);
    return (
      <div>
        <Header />

        <div className="container" style={{ marginTop: '30px' }}>
          <h1 style={{ textAlign: 'center' }}>What To Wear</h1>
          <WeatherInfo
            weatherImg={this.state.weatherImg}
            weather={this.state.weather}
            temperature={this.state.temperature}
            city={this.state.city}
            humidity={this.state.humidity}
            description={this.state.description}
          />
          <hr />
          <div className="row">
            <div className="col-lg-9">
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
              <h5>Today's style</h5>
              <Products
                products={this.state.filteredProducts}
                handleAddToCart={this.handleAddToCart}
              />
            </div>
            <div className="col-lg-3">
              <Basket
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
