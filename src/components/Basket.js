import React, { Component } from 'react';

export default class Basket extends Component {
  render() {
    const cartItems = this.props.cartItems;
    console.log('cartItems:' + cartItems);
    return (
      <div className="alert alert-info">
        {cartItems.length === 0
          ? 'Basket is empty'
          : <div>You have {cartItems.length} products in the basket</div> && (
              <ul>
                {cartItems.map(item => (
                  <li>
                    <b>{item.title}</b>
                    {item.count}
                    <button
                      className="btn-sm btn-danger"
                      onClick={e => this.props.handleRemoveFromCart(e, item)}>
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
      </div>
    );
  }
}
