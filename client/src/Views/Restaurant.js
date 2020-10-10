/** Name: Restaurant.js
 *  Purpose: User gets to choose one of the listed restaurant(s)
 *           that are available according to the selected time and date.cd        
 *           
*/

import React, { Component } from "react";
import "../App.css";

class RestaurantView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restArr: [],
    };

    this.FilterRestaurant = this.FilterRestaurant.bind(this);
  }

  FilterRestaurant(time, date, restArr) {
    var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var d = new Date(date);
    var dayOfDate = days[d.getDay()];
    var selectedTime = time.split(":");
    var arr = [];

    restArr.forEach(function (item, index) {
      var operationTimeRange = item["operationHours"].split(" - ");
      operationTimeRange.forEach(function (item, index) {
        item.includes("am")
          ? (operationTimeRange[index] = parseInt(item.replace("am", "")))
          : (operationTimeRange[index] = parseInt(item.replace("pm", "")) + 12);
      });

      if (
        !item["offDays"].includes(dayOfDate) &&
        operationTimeRange[0] <= selectedTime[0] &&
        operationTimeRange[1] >= selectedTime[0]
      ) {
        if (arr.indexOf(item["name"]) == -1) {
          arr.push(item["name"]);
        }
      }
    });
    this.setState({
      restArr: arr,
    });
  }

  restCallback = (childData) => {
    this.props.restCallback(childData);
  };

  componentDidMount() {
    this.setState({ restArr: [] });
    this.FilterRestaurant(this.props.time, this.props.date, this.props.restArr);
  }

  render() {
    return (
      <div>
        <h2>Select Restaurant</h2>
        <SelectRestaurant
          restCallback={this.restCallback}
          restArr={this.state.restArr}
        />
      </div>
    );
  }
}

class SelectRestaurant extends Component {
  constructor(props) {
    super(props);

    this.onClickListener = this.onClickListener.bind(this);
  }

  onClickListener(e) {
    this.props.restCallback(e.target.value);
  }
  render() {
    return (
      <div className="Restaurant-Tb">
        <table>
          {this.props.restArr.length == 0 ? (
            <p className="alert-msg">
              No restaurants are unavailable at this time!
            </p>
          ) : (
            this.props.restArr.map((item) => (
              <tr>
                <td>
                  <input
                    name="restaurantName"
                    type="radio"
                    onChange={this.onClickListener}
                    value={item}
                  />
                  {item}
                </td>
              </tr>
            ))
          )}
        </table>
      </div>
    );
  }
}

export default RestaurantView;
