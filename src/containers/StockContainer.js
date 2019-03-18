import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    let stockCards = this.props.stocks.map(stock => stock.owned === false ? <Stock key={stock.id} stock={stock} onClickOfStock={this.props.onClickOfStock}/> : null)
    return (
      <div>
        <h2>Stocks</h2>
        {
          stockCards
        }
      </div>
    );
  }

}

export default StockContainer;
