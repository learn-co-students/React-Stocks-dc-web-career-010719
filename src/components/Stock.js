import React from 'react'

//render a standard stock card for the stock containers. Left stock undestructured in order to pass it back into the event handler later
const Stock = ({stock, handleClick}) => (
  <div onClick={() => handleClick(stock)}>
  
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
        {stock.name}
        </h5>
        <p className="card-text">
        {stock.ticker}: {stock.price}
          </p>
      </div>
    </div>

  </div>
);

export default Stock
