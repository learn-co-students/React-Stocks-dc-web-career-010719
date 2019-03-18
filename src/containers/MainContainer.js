import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

import {sortBy} from 'lodash'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: [],
      portfolio: [],
      sort: 'Alphabetically',
      filter: ''
    }
  }

  componentDidMount() {
    this.loadStocks()
  }

  loadStocks() {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(stocks => {
        this.setState({stocks})
      })
  }

  buyStock = (stock) => {
    this.setState({
      portfolio: [
        ...this.state.portfolio, 
        {...stock, purchaseDate: Date.now()}]
    })
    // if (!this.state.portfolio.includes(stock)) {
    //   this.setState({portfolio: [...this.state.portfolio, stock]})
    // }
  }

  sellStock = (stock) => {
    this.setState({
      portfolio: this.state.portfolio.filter(s => s.id !== stock.id)
    })
  }

  // onSort = (event) => {
  //   const sortedStocks = this.state.stocks.slice()
  // }
  
  listing(arr) {
    const stocks = arr.slice().filter(s => {
      return s.type.includes(this.state.filter)
    })

    const sort = this.state.sort === 'Price' ? 'price' : 'name'
    return sortBy(stocks, [sort])

    // if (this.state.sort === 'price') {
    //   return stock2.price - stock1.price
    // } else {
    //   return stock1.name.localeCompare(stock2.name)
    // }

    // return stocks.sort((stock1, stock2) => {
    //   if (this.state.sort === 'price') {
    //     return stock2.price - stock1.price
    //   } else {
    //     return stock1.name.localeCompare(stock2.name)
    //   }

    //   // why u break on price???
    //   return stock1[sortBy].toString().localeCompare(stock2[sortBy].toString())
    // })
  }

  stocks() {
    return this.listing(this.state.stocks)
  }

  portfolio() {
    return this.listing(this.state.portfolio)
  }

  onFilter = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({[event.target.name]: value})
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar sort={this.state.sort} filter={this.state.filter} onFilter={this.onFilter} />
        <div className="row">
          <div className="col-8">
            <StockContainer stocks={this.stocks()} onSelectStock={this.buyStock} />
          </div>
          <div className="col-4">
            <PortfolioContainer portfolio={this.portfolio()} onSelectStock={this.sellStock} />
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default MainContainer;
