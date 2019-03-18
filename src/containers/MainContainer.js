import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      stocks: [],
      filter: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => {
      stocks.forEach(stock => stock.owned = false)
      this.setState({stocks: stocks})
    })
  }

  handleClickOfStock = id => {
    let stocks = this.state.stocks
    stocks.forEach(stock => stock.id === id ? stock.owned = !stock.owned : null)
    this.setState({stocks: stocks})
  }

  handleSortByAlpha = () => {
    this.setState({stocks: this.state.stocks.sort((a, b) => a.ticker.localeCompare(b.ticker))})
  }

  handleSortByPrice = () => {
    this.setState({stocks: this.state.stocks.sort((a, b) => a.price - b.price)})
  }

  handleFilter = event => {
    this.setState({filter: event.target.value})
  }

  render() {
    let desiredStocks = this.state.stocks.filter(stock => stock.type.includes(this.state.filter))
    return (
      <div>
        <SearchBar
          onSortAlpha={this.handleSortByAlpha}
          onPriceSort={this.handleSortByPrice}
          onFilter={this.handleFilter}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={desiredStocks} onClickOfStock={this.handleClickOfStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={desiredStocks} onClickOfStock={this.handleClickOfStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
