import React from 'react'

const Stock = (props) => (
  <div>
    <div className="card">
      <div className="card-body" onClick={() => props.alterPortfolio(props.stock)}>
        <h5 className="card-title">
          {props.stock.name}
        </h5>
        <p className="card-text">
          {props.stock.type}
        </p>
        <p className="card-text">
          ${props.stock.price}/share
        </p>
      </div>
    </div>
  </div>
);

export default Stock
