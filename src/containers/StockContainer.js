import React from 'react';
import Stock from '../components/Stock'


export default props => (
  <div>
    <h2>{props.title}</h2>
    {/* Conditionally set keys based on whether or not the stock has been purchased */}
    {props.stocks.map(stock => <Stock key={!stock.purchaseDate ? stock.id : stock.purchaseDate} stock={stock} handleClick={props.handleClick}/>)}
  </div>
);
