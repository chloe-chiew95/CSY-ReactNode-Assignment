/** Name: App.js
 *  Purpose: For routing the home and order history pages
 *  
*/

import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import OrderHistory from "./OrderHistory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
    };
  }

  orderCallback = (data) => {
    this.setState({
      orderList: [...this.state.orderList, data],
    });
  };

  render() {
    return (
      <div>
        <table className="header-table">
          <tr>
            {/*** Links to different pages ***/}
            <td>
              <a href="http://localhost:3000/home">Home</a>
            </td>
            <td>
              <a href="http://localhost:3000/orderhistory">Order History</a>
            </td>
          </tr>
        </table>
        <div className="Header">
          <h1>Movel AI Assignment</h1>
        </div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={Home} />
              <Route path="/orderhistory" component={OrderHistory} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
