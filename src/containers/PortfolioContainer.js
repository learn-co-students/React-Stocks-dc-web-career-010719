import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.portfolio.map(stock => {
          return <Stock key={`${stock.id}-${stock.purchaseDate}`} stock={stock} onSelectStock={this.props.onSelectStock} />
        })}
      </div>
    );
  }

}

export default PortfolioContainer;
