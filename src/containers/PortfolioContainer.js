import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
          this.props.myPortfolio.map(stock => <Stock key={stock.purchaseDate} handleClick={this.props.handleClick} stock={stock} />)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
