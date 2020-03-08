import React, { Component } from 'react';
import util from '../util';
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
                  <li key={item.id}>
                    <b>{item.title}</b>
                    {item.count} = $ {item.price * item.count}
                    <button
                      className="small-btn btn-outline-danger"
                      onClick={e => this.props.handleRemoveFromCart(e, item)}>
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
        {/* TODO learn reduce()*/}
        Total:{' '}
        {util.formatCurrency(
          cartItems.reduce((a, c) => a + c.price * c.count, 0)
        )}
        <br />
        <button
          className="small-btn btn-primary"
          onClick={() => alert('checkout')}>
          checkout
        </button>
      </div>
    );
  }
}
