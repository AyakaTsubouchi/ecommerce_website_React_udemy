import React, { Component } from 'react';
import util from '../util';
// import '..scss/Style.css';

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map(product => (
      <div className="col-md-4" key={product.id} style={{ marginTop: '15px' }}>
        <div className="thumbnail text-center">
          <a
            href={`#${product.id}`}
            onClick={e => this.props.handleAddToCart(e, product)}>
            <img
              src={`products/${product.sku}_2.jpg`}
              alt={product.title}
              style={{ marginTop: '10px', width: '170px' }}
            />
            <p>{product.title}</p>
          </a>
          <b>{util.formatCurrency(product.price)}</b>
          <br />
          <button
            className="small-btn btn-primary"
            onClick={e => this.props.handleAddToCart(e, product)}>
            Add to cart
          </button>
        </div>
      </div>
    ));

    return <div className="row">{productItems}</div>;
  }
}
