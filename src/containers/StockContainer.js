import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
          <div>
            {this.props.stockInfo.map(s => <Stock key={s.id} data={s} transferStock={this.props.buyStock} />)}
          </div>
      </div>
    );
  }

}

export default StockContainer;
