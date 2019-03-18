import React from 'react'

const Stock = (props) => {
  const {ticker, name, type, price} = props.stock
  return (
    <div className="card" onClick={() => props.onSelectStock(props.stock)}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
      </div>
    </div>
  )
}

export default Stock
