import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
    super()

    this.state = {
      allStocks: [],
      stocks: [],
      portfolio: [],
      filter: '',
      sort: ''
    }
  }

  sortChange = (e) => {
    e.persist()
    let stocks = [...this.state.stocks]
    if (e.target.value === 'Alphabetically') {
      stocks.sort((a, b) => {
        a = a.name
        b = b.name
        return a.localeCompare(b)
      })
    } else {
      stocks.sort((a, b) => b.price-a.price)
    }
    this.setState({
      stocks: stocks,
      sort: e.target.value
    })
  }

  filterChange = (e) => {
    e.persist()
    let stocks = [...this.state.allStocks]
    stocks = stocks.filter(s => s.type === e.target.value)
    this.setState({
      stocks: stocks,
      filter: e.target.value
    })
  }

  toggleStock = (stock) => {
    let portfolio = [...this.state.portfolio]
    if (portfolio.includes(stock)) {
      this.setState({
        portfolio: portfolio.filter(s => s !== stock)
      })
    } else {
      this.setState({
        portfolio: [...portfolio, stock]
      })
    }
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => {
      this.setState({
        stocks: data,
        allStocks: data
      })
    })
  }

  render() {
    return (
      <div>
        <SearchBar sort={this.state.sort} filter={this.state.filter} sortChange={this.sortChange} filterChange={this.filterChange} />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={this.state.stocks} toggleStock={this.toggleStock} />

          </div>
          <div className="col-4">

            <PortfolioContainer stocks={this.state.portfolio} toggleStock={this.toggleStock} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
