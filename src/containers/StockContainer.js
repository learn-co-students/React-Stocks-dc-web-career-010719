import React, { Component } from 'react';
import Stock from '../components/Stock';

class StockContainer extends Component {
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.allStocks.map(stock => (
          <Stock
            key={`stock-${stock.id}`}
            handleClick={this.props.handleClick}
            stock={stock}
          />
        ))}
      </div>
    );
  }
}

export default StockContainer;
