import React, { Component } from 'react';

export default class WeatherInfo extends Component {
  render() {
    console.log('img' + this.props.weather);
    return (
      <div>
        <div className="container WeatherInfo">
          <div className="row">
            <div className="col">
              <h3>{this.props.city}</h3>
              <img
                src={`/weatherImages/${this.props.weatherImg}.png`}
                alt={this.props.weather}
              />
              <h5>{this.props.weather}</h5>
            </div>
            <div className="col-md">
              <div
                className="card border-primary mb-3"
                style={{ maxWidth: '20rem;' }}>
                <div className="card-body">
                  <h4 className="card-title">
                    Temperature: {this.props.temperature}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}