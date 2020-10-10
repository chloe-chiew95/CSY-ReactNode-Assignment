/** Name: Home.js
 *  Purpose: The main page where users can order food from.
 *           Different views get swapped in and out here as user
 *           progresses by clicking on the navigation buttons.
*/


import React, { Component } from "react";
import "./App.css";
import DateTimeView from "./Views/DateTime";
import RestaurantView from "./Views/Restaurant";
import MenuItemView from "./Views/MenuItem";
import CheckoutView from "./Views/Checkout";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: [],
      viewId: 1,
      order: {
        time: GetCurrentDateTime("hour") + ":" + GetCurrentDateTime("min"),
        date: GetCurrentDateTime("date"),
        name: null,
        menuItem: [],
        total: 0,
      },
    };
    this.removeElement = this.removeElement.bind(this);
    this.NavButtonClick = this.NavButtonClick.bind(this);
  }

  //***              Fetch restaurant and menu data               ***/
  callAPI() {
    fetch("http://localhost:9000/restaurant")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  dateCallback = (childData) => {
    this.setState({
      order: {
        time: this.state.order["time"],
        date: childData,
        name: this.state.order["name"],
        menuItem: [...this.state.order["menuItem"]],
        total: this.state.order["total"],
      },
    });
  };

  timeCallback = (childData) => {
    this.setState({
      order: {
        time: childData,
        date: this.state.order["date"],
        name: this.state.order["name"],
        menuItem: [...this.state.order["menuItem"]],
        total: this.state.order["total"],
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/post/orderhistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: this.state.order }),
    })
    .then(alert('Your order has been confirmed! Redirecting to Order History...'))
    .then(window.location.href = "http://localhost:3000/orderhistory")
    .catch(err => console.log(err))
    
    
  };

  restaurantCallback = (childData) => {
    this.setState({
      order: {
        time: this.state.order["time"],
        date: this.state.order["date"],
        name: childData,
        menuItem: [...this.state.order["menuItem"]],
        total: this.state.order["total"],
      },
    });
  };

  menuCallback = (childData) => {
    this.setState({
      order: {
        time: this.state.order["time"],
        date: this.state.order["date"],
        name: this.state.order["name"],
        menuItem: [...childData[0]],
        total: [childData[1]],
      },
    });
  };

  removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  //***                  Navigation button function               ***/

  NavButtonClick(e) {
    switch (e.target.id) {
      case "nextButton":
        if (this.state.viewId == 2 && this.state.order["name"] == null) {
          alert("Please select a restaurant!");
        } else {
          this.setState({
            viewId: this.state.viewId + 1,
          });
        }
        break;
      case "backButton":
        this.setState({
          viewId: this.state.viewId - 1,
        });
        break;
      case "checkoutButton":
        if (this.state.order["menuItem"].length == 0) {
          alert("The cart is empty!");
        } else {
          this.setState({
            viewId: this.state.viewId + 1,
          });
        }
    }
  }

  render() {
    return (
      <div>
        <div className="App">

        {/***                 Views are displayed here               ***/  } 
          <div className="View-Window">
            {this.state.viewId === 1 ? (
              <DateTimeView
                dateCallback={this.dateCallback}
                minDate={GetCurrentDateTime("date")}
                date={this.state.order["date"]}
                timeCallback={this.timeCallback}
                time={this.state.order["time"]}
              />
            ) : null}

            {this.state.viewId === 2 ? (
              <RestaurantView
                restCallback={this.restaurantCallback}
                date={this.state.order["date"]}
                time={this.state.order["time"]}
                restArr={this.state.apiResponse}
              />
            ) : null}

            {this.state.viewId === 3 ? (
              <MenuItemView
                menuCallback={this.menuCallback}
                totalCallback={this.totalCallback}
                restArr={this.state.apiResponse}
                name={this.state.order["name"]}
                date={this.state.order["date"]}
                time={this.state.order["time"]}
                menuItem={this.state.order["menuItem"]}
                total={this.state.order["total"]}
              />
            ) : null}

            {this.state.viewId === 4 ? (
              <CheckoutView
                order={this.state.order}
                time={ConvertTo12HourFormat(this.state.order["time"])}
              />
            ) : null}
          </div>
          {/***                  Navigation buttons               ***/}
          <div className="Navigation-Bar">
            {this.state.viewId >= 2 && this.state.viewId != 4 ? (
              <button
                className="Nav-Button"
                id="backButton"
                onClick={this.NavButtonClick}
              >
                Back
              </button>
            ) : null}
            {this.state.viewId < 3 ? (
              <button
                className="Nav-Button"
                id="nextButton"
                onClick={this.NavButtonClick}
              >
                Next
              </button>
            ) : null}
            {this.state.viewId == 3 ? (
              <button
                className="Nav-Button"
                id="checkoutButton"
                onClick={this.NavButtonClick}
              >
                Checkout
              </button>
            ) : null}
            {this.state.viewId == 4 ? (
              <div>
                <button
                  className="Nav-Button"
                  id="confirmButton"
                  onClick={this.handleSubmit}
                >
                  Confirm
                </button>
                <button
                  className="cancelCheckoutBtn"
                  id="backButton"
                  onClick={this.NavButtonClick}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        </div>

        
        {/***                  Cart is shown here               ***/}
        {this.state.viewId == 4 ? null : (
          <div className="Order-Detail">
            <h3>Order Detail</h3>
            <div>
              <h4>Time: {ConvertTo12HourFormat(this.state.order["time"])}</h4>
              <h4>Date: {this.state.order["date"]}</h4>
              <h4>Restaurant: {this.state.order["name"]}</h4>
            </div>
            <div>
              {this.state.order["menuItem"].map((item) => (
                <li>{item}</li>
              ))}
            </div>
            <p>Total: MYR {this.state.order["total"]}</p>
          </div>
        )}
      </div>
    );
  }
}



function ConvertTo12HourFormat(timeData) {
  var timeArr = timeData.split(":");
  if (timeArr[0] >= 12) {
    return (
      (timeArr[0] == 12 ? timeArr[0] : timeArr[0] - 12) +
      ":" +
      timeArr[1] +
      "pm"
    );
  } else {
    return (
      (timeArr[0] === "00" ? 12 : parseInt(timeArr[0])) +
      ":" +
      timeArr[1] +
      "am"
    );
  }
}

function GetCurrentDateTime(i) {
  const NOW = new Date();
  const CURRENT_DATE =
    NOW.getFullYear() +
    "-" +
    (NOW.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    NOW.getDate().toString().padStart(2, "0");

  const CURRENT_HOUR = NOW.getHours().toString().padStart(2, "0");
  const CURRENT_MIN = NOW.getMinutes().toString().padStart(2, "0");

  switch (i) {
    case "hour":
      return CURRENT_HOUR;
    case "min":
      return CURRENT_MIN;
    case "date":
      return CURRENT_DATE;
  }
}

export default Home;
