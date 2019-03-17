import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (

      <div>
        <h2>Stocks</h2>
        {
          this.props.filteredStocks.map((stock,idx)=> {
            console.log(stock)
            return <Stock key={idx} stockObj={stock} buySell={this.props.buySell}/>
          })
        }
      </div>
    );
  }

}

export default StockContainer;
