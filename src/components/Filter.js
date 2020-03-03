import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">{this.props.count} products found</div>
          <div className="col-md-3">
            <label>
              order by
              <select
                className="form-control"
                onChange={this.props.handleChangeSort}
                value={this.props.sort}>
                <option value="">Select</option>
                <option value="lowest">lowest to highest</option>
                <option value="highestt">highest to lowest</option>
              </select>
            </label>
          </div>
          <div className="col-md-3">
            <label>
              size
              <select
                className="form-control"
                onChange={this.props.handleChangeSize}
                value={this.props.size}>
                <option value="">ALL</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Season
              <select
                className="form-control"
                onChange={this.props.handleChangeSeason}
                value={this.props.season}>
                <option value="">ALL</option>
                <option value="spring">SUPRING</option>
                <option value="summer">SUMMER</option>
                <option value="autumn">AUTUMN</option>
                <option value="winter">WINTER</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
