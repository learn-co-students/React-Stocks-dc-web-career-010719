import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {
  constructor(){
    super()
    this.state = {
      purchasedStocks: []
    }
  }

  handleStockBuy = (stock)=>{
    this.setState({...this.state.purchasedStocks, stock})
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.stocks.map(stock => <Stock key={stock.id}
                                                            stock={stock}
                                                            handleStockClick={this.props.handleStockClick}/>)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
