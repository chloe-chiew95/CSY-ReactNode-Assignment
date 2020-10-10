/** Name: MenuItem.js
 *  Purpose: User gets to choose whichever menu item to add
 *           into the cart.
 *           
*/


import React, { Component } from "react";

class MenuItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuArr: [],
    };

    this.FilterMenu = this.FilterMenu.bind(this);
  }

  FilterMenu(time, date, menuArr, name) {
    const PATTERN = /(MYR)\w+/g;
    var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var numInText = ["One", "Two", "Three", "Four", "Five"];
    var d = new Date(date);
    var dayOfDate = days[d.getDay()];
    var selectedTime = time.split(":");
    var arr = [];

    menuArr.forEach(function (item, index) {
      var operationTimeRange = item["operationHours"].split(" - ");
      operationTimeRange.forEach(function (item, index) {
        item.includes("am")
          ? (operationTimeRange[index] = parseInt(item.replace("am", "")))
          : (operationTimeRange[index] = parseInt(item.replace("pm", "")) + 12);
      });

      if (
        !item["offDays"].includes(dayOfDate) &&
        operationTimeRange[0] <= selectedTime[0] &&
        operationTimeRange[1] >= selectedTime[0] &&
        item["name"] == name
      ) {
        for (var x = 0; x < 5; x++) {
          var foodItem = [
            item["set" + numInText[x]].replace(/( - MYR)\w+/g, ""),
            item["set" + numInText[x]].match(PATTERN),
          ];
          foodItem[1] = (foodItem[1] + "").replace("MYR", "");

          arr.push([foodItem[0], foodItem[1]]);
        }
      }
    });
    this.setState({
      menuArr: arr,
    });
  }

  menuCallback = (childData) => {
    this.props.menuCallback(childData);
  };

  componentDidMount() {
    this.props.menuCallback([[], 0]);
    this.setState({ menuArr: [] });
    this.FilterMenu(
      this.props.time,
      this.props.date,
      this.props.restArr,
      this.props.name
    );
  }

  render() {
    return (
      <div>
        <h2>Select Menu Item</h2>
        <SelectMenuItem
          menuArr={this.state.menuArr}
          menuItem={this.props.menuItem}
          total={this.props.total}
          menuCallback={this.menuCallback}
        />
      </div>
    );
  }
}

class SelectMenuItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeListener = this.onChangeListener.bind(this);
    this.removeElement = this.removeElement.bind(this);
  }

  onChangeListener(e) {
    var newItem = e.target.id + " - MYR" + e.target.value;

    if (e.target.checked != true) {
      var newTotal = parseInt(this.props.total) - parseInt(e.target.value);
      this.props.menuCallback([
        this.removeElement([...this.props.menuItem], newItem),
        newTotal,
      ]);
    } else {
      var newTotal = parseInt(this.props.total) + parseInt(e.target.value);
      this.props.menuCallback([[...this.props.menuItem, newItem], newTotal]);
    }
  }

  removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  render() {
    return (
      <div className="Restaurant-Tb">
        {
          <table>
            <th>Set</th>
            <th>Price</th>
            {this.props.menuArr.map((item) => (
              <tr>
                <td>{item[0]}</td>
                <td>MYR{item[1]}</td>
                <td>
                  {this.props.menuItem.indexOf(item[0] + " - MYR" + item[1]) ==
                  -1 ? (
                    <input
                      type="checkbox"
                      onChange={this.onChangeListener}
                      value={item[1]}
                      id={item[0]}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={this.onChangeListener}
                      value={item[1]}
                      id={item[0]}
                    />
                  )}
                </td>
              </tr>
            ))}
          </table>
        }{" "}
      </div>
    );
  }
}

export default MenuItemView;
