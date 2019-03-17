import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(){
    super()
    this.state = {
      stocks: [],
      myPortfolio: [],
      filter: 'All',
      sortBy: 'Alpha'
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/stocks`)
    .then(res => res.json())
    .then(stocks => this.setState({stocks: stocks}))
  }

  buyStock = stock => {
    const newStock = {...stock, purchaseDate: new Date()}
    this.setState({
      myPortfolio: [...this.state.myPortfolio, newStock]
    })
  }

  sellStock = stock => {
    this.setState({myPortfolio: this.state.myPortfolio.filter(s => s !== stock)})
  }

  handleFilter = (e) => {
    this.setState({filter: e.target.value})
  }

  handleSort = e => {
    this.setState({sortBy: e.target.value})
  }

  sortStocks() {
  const {sortBy} = this.state

    if (sortBy === "Alpha") {
     return this.filterStocks().sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else if (a.name < b.name) {
          return -1
        } return 0
      })
    } else {
      return this.filterStocks().sort((a, b) => a.price - b.price)
    }
  }

  filterStocks() {
    return this.state.filter !== 'All' ? this.state.stocks.filter(stock => stock.type === this.state.filter) : this.state.stocks
  }

  render() {
    return (
      <div>
        <SearchBar handleFilter={this.handleFilter} handleSort={this.handleSort} checked={this.state.sortAlpha}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.sortStocks()} handleClick={this.buyStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.myPortfolio} handleClick={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
