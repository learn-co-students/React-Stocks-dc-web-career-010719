import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  constructor() {
    super()
    this.state = {stocks: []}
  }

  // Fetch stocks
  componentDidMount = () => {
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => this.setState({stocks}))
  }

  // Sort by name, price and id
  sorted() {
    switch (this.props.sorted) {
      case 'id':
        return this.sortByID()
        break
      case 'name':
        return this.sortByName()
        break
      case 'price':
        return this.sortByPrice()
    }
  }

  sortByName() {
    return this.filtered().sort((s1, s2) => s1.name.localeCompare(s2.name))
  }

  sortByPrice() {
    return this.filtered().sort((s1, s2) => s1.price - s2.price)
  }

  sortByID() {
    return this.filtered().sort((s1, s2) => s1.id - s2.id)
  }

  // Filter by stock type
  filtered() {
    return this.state.stocks.filter(s => s.type.includes(this.props.filtered))
  }

  // Render page
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.sorted().map((s) => <Stock key={s.id} stock={s} alterPortfolio={this.props.addToPortfolio}/>)}
      </div>
    );
  }

}

export default StockContainer;
