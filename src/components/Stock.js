import React from 'react'

const Stock = (props) => (
  <div>

    <div className="card" onClick={()=>props.transferStock(props.data)}>
      <div className="card-body">
        <h5 className="card-title">{
            props.data.name
          }</h5>
        <p className="card-text">{
            `Ticker: ${props.data.price}`
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
