/** Name: DateTime.js
 *  Purpose: User selects the time and date for the delivery.
*/


import React, { Component } from "react";

class DateTimeView extends Component {
  constructor(props) {
    super(props);
  }

  dateCallback = (childData) => {
    this.props.dateCallback(childData);
  };

  timeCallback = (childData) => {
    this.props.timeCallback(childData);
  };

  render() {
    return (
      <div>
        <h2>Delivery Date/Time</h2>
        <SelectDate
          parentCallback={this.dateCallback}
          date={this.props.minDate}
          defDate={this.props.date}
        />
        <SelectTime
          parentCallback={this.timeCallback}
          defTime={this.props.time}
        />
      </div>
    );
  }
}

class SelectDate extends Component {
  constructor(props) {
    super(props);
    this.OnChangeListener = this.OnChangeListener.bind(this);
  }

  OnChangeListener = (e) => {
    this.props.parentCallback(e.target.value);
  };

  render() {
    return (
      <div>
        <label for="dateSel">
          <h3>Select date: </h3>
        </label>
        <input
          name="inputDate"
          type="date"
          min={this.props.date}
          defaultValue={this.props.defDate}
          onChange={this.OnChangeListener}
        />
      </div>
    );
  }
}

class SelectTime extends Component {
  constructor(props) {
    super(props);
  }

  OnChangeListener = (e) => {
    this.props.parentCallback(e.target.value);
  };

  render() {
    return (
      <div>
        <label for="timeSel">
          <h3>Select time: </h3>
        </label>
        <input
          type="time"
          onChange={this.OnChangeListener}
          defaultValue={this.props.defTime}
        />
      </div>
    );
  }
}

export default DateTimeView;
