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
              size
              <select
                className="form-control"
                onChange={this.props.handleChangeSize}
                value={this.props.size}>
                <option value="">ALL</option>
                <option value="WOMEN">WOMEN</option>
                <option value="MEN">MEN</option>
                <option value="FORMAL">FORMAL</option>
                <option value="CASUAL">CASUAL</option>
              </select>
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Season
              <button
                className="form-control"
                onClick={this.props.handleChangeSeason}
                value={this.props.season}>
                {/* TODO chenge to selection form Todays weather, supring,summer,autumn,winter*/}
                {/* value={this.props.season} */}
                {/* <option>get season</option> */}
                {/* <option value="summer">SUMMER</option>
                <option value="autumn">AUTUMN</option>
                <option value="winter">WINTER</option> */}
              </button>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
