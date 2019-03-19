import React from 'react';
import Stock from '../components/Stock';

const StockContainer = props => {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.allStocks.map(stock => (
        <Stock
          key={props.title === "Stocks" ? stock.id : stock.purchaseDate}
          handleClick={props.handleClick}
          stock={stock}
        />
      ))}
    </div>
  );
};

export default StockContainer;
