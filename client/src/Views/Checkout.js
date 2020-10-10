import React, { Component } from "react";
import "../App.css";

class CheckoutView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DisplayCheckout order={this.props.order} time={this.props.time} />
      </div>
    );
  }
}

const DisplayCheckout = (props) => {
  return (
    <div className="Display-Checkout">
      <h1>Checkout</h1>
      <h3>Time: {props.time}</h3>
      <h3>Date: {props.order["date"]}</h3>
      <h3>Restaurant name: {props.order["name"]}</h3>
      <h4>Order list:</h4>
      {props.order["menuItem"].map((i) => (
        <li>{i}</li>
      ))}
      <h2 className="totalCheckout">Total: MYR{props.order["total"]}</h2>
    </div>
  );
};

export default CheckoutView;
