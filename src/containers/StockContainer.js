import React from 'react';
import Stock from '../components/Stock'

class StockContainer extends React.Component {

  render() {
    console.log("stock container",this.props.stocks);
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.stocks.map(stock => <Stock key={stock.id} stock={stock} handleClick={this.props.handleClick}/>)
        }
      </div>
    );
  }

}

export default StockContainer;
