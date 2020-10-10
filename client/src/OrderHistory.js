import React, {Component} from 'react';
import './App.css';


class OrderHistory extends Component{
constructor(props){
  super(props)
this.state={
  apiResponse: []
}

  this.callAPI = this.callAPI.bind(this)
}
componentDidMount(){
  console.log("Order History page mounted")
  this.callAPI()
}

callAPI(){
  fetch("http://localhost:9000/get/orderhistory")
  .then(res => res.json())
  .then(res => this.setState({ apiResponse: res }))
.catch(err => this.render(<div>{"No order(s) have been made."}</div>))     
}

  render(){
  return(
    <div className="OrderHistory">
    <h1>Order History</h1>
    <div className="orderHistoryDiv">
      
      {this.state.apiResponse.map(i =>(
        <table className="orderHistoryTable">
        <tr>
          <td className="orderHistoryTableTop">Time</td><td>{i.time}</td>
        </tr>
        <tr>
          <td className="orderHistoryTableTop">Date</td><td>{i.date}</td>
        </tr>
        <tr>
          <td className="orderHistoryTableTop"> Restaurant</td><td>{i.name}</td>
        </tr>
        <th>Order item</th><th></th>
          {i.menuItem.map(item => (
            <tr>{item}</tr>
          ))}
        <tr>
          <td className="orderHistoryTableTotal">Total</td>
          <td className="orderHistoryTableTotal">MYR {i.total}</td>
        </tr>
        </table>
      ))
  }
  </div>
    </div>

  )
}
}


export default OrderHistory;
