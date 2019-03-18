import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    let stockCards = this.props.stocks.map(stock => stock.owned === true ? <Stock key={stock.id} stock={stock} onClickOfStock={this.props.onClickOfStock}/> : null)
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            stockCards
          }
      </div>
    );
  }

}

export default PortfolioContainer;
