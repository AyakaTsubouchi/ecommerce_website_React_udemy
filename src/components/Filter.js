import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    console.log("I'm count from filter" + this.props.count);
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
              Situation
              <select
                className="form-control"
                onChange={this.props.handleChangeSize}
                value={this.props.size}>
                <option value="">ALL</option>
                <option value="S">Formal</option>
                <option value="M">Casual</option>
                <option value="L">Men</option>
                <option value="XL">Women</option>
<<<<<<< HEAD
=======

>>>>>>> 9808db529ee8cd06746ffd727dc402b488b4e5ed
              </select>
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Season
              <button
                className="form-control"
                onClick={this.props.handleChangeSeason}
                value={this.props.season}></button>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
