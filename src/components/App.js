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
      feeling: '',
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
    this.handleChangefeeling = this.handleChangefeeling.bind(this);
    this.handleChangeSeason = this.handleChangeSeason.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentDidMount() {
    const apikey = '791989e83043288616d30ac61fc806e7';
    const darkSky = 'https://api.darksky.net/forecast';
    const openweather =
      'api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}';
    const cityname = 'Vancouver';
    const opAPIkey = 'a9d26cdce59f235872922cf298bfdd24';
    const cnt = '1';
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=London&appid=a9d26cdce59f235872922cf298bfdd24'
      // `https://api.darksky.net/forecast/791989e83043288616d30ac61fc806e7/37.8267,-122.4233/`
    ).then(res => {
      if (res.status !== 200) {
        console.log('error');
      }
      res
        .json()
        .then(data => {
          console.log('Its dar sky ' + data);
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
  handleChangefeeling(e) {
    this.setState({ feeling: e.target.value });
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
      if (state.feeling !== '' && state.season !== '') {
        return {
          filteredProducts: state.products.filter(function(a) {
            return (
              a.feeling.indexOf(state.feeling.toUpperCase()) >= 0 &&
              a.season.indexOf(state.season.toLowerCase()) >= 0
            );
          })
        };
      } else if (state.feeling === '' && state.season !== '') {
        return {
          filteredProducts: state.products.filter(function(a) {
            return a.season.indexOf(state.season.toLowerCase()) >= 0;
          })
        };
      } else if (state.feeling !== '' && state.season === '')
        return {
          filteredProducts: state.products.filter(function(a) {
            return a.feeling.indexOf(state.feeling.toUpperCase()) >= 0;
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
        <br />
        <div className="container" style={{ marginTop: '30px' }}>
          <h1>What To Wear</h1>
          <hr />
          <WeatherInfo
            weatherImg={this.state.weatherImg}
            weather={this.state.weather}
            temperature={this.state.temperature}
            city={this.state.city}
          />
          <hr />
          <div className="row">
            <div className="col-lg-9">
              <hr />
              <Filter
                feeling={this.state.feeling}
                sort={this.state.sort}
                handleChangefeeling={this.handleChangefeeling}
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
