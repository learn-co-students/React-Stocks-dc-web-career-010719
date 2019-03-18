import React, { Component } from "react";
import Stock from "../components/Stock";

class StockContainer extends Component {
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.allStocks.map(stockObj => {
          return (
            <Stock
              key={stockObj.id}
              stock={stockObj}
              handleStockClick={this.props.handleStockClick}
            />
          );
        })}
      </div>
    );
  }
}

export default StockContainer;
