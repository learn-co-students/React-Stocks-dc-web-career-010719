import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.portfolioStocks.map((stock,idx)=> {
              console.log(stock)
              return <Stock key={idx} stockObj={stock} buySell={this.props.buySell}/>
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
