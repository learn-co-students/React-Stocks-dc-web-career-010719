import React, { Component } from 'react';
import StockContainer from './StockContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(){
    super()
    this.state = {
      stocks: [],
      myPortfolio: [],
      filter: 'All',
      sortBy: 'None'
    }
  }

  //fetching all stocks from the server after the component mounts
  componentDidMount(){
    fetch(`http://localhost:3000/stocks`)
    .then(res => res.json())
    .then(stocks => this.setState({stocks: stocks}))
  }

  //Event Handlers//

  //Adding stocks to myPortfolio when the handleClick prop is invoked from the <StockContainer />
  buyStock = stock => {
    const newStock = {...stock, purchaseDate: new Date()}
    this.setState({
      myPortfolio: [...this.state.myPortfolio, newStock]
    })
  }

  //Removing stocks from myPortfolio when the handleClick prop is invoked from the <PortfolioContainer />
  sellStock = stock => {
    this.setState({myPortfolio: this.state.myPortfolio.filter(s => s !== stock)})
  }

  //Sets filter from selected value
  handleFilter = (e) => {
    this.setState({filter: e.target.value})
  }

  //Sets sort by the selected value
  handleSort = e => {
    this.setState({sortBy: e.target.value})
  }

  //Sorts by filterd stocks
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
    } else if (sortBy === "Price") {
      return this.filterStocks().sort((a, b) => a.price - b.price)
    }
    else {
      return this.filterStocks()
    }
  }

  //Filters stocks by current state filter value
  filterStocks() {
    return this.state.filter !== 'All' ? this.state.stocks.filter(stock => stock.type === this.state.filter) : this.state.stocks
  }

  render() {
    return (
      <div>
        {/* Pass in filter and sort event handlers */}
        <SearchBar handleFilter={this.handleFilter} handleSort={this.handleSort} />

          <div className="row">
            <div className="col-8">
              {/* Pass in all sorted stocks after they have been filtered */}
              <StockContainer title="Stocks" stocks={this.sortStocks()} handleClick={this.buyStock} />

            </div>
            <div className="col-4">
              {/* Pass in stocks from myPortfolio only */}
              <StockContainer title="My Portfolio" stocks={this.state.myPortfolio} handleClick={this.sellStock} />
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
