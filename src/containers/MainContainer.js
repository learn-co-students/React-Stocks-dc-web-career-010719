import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor() {
    super()
    this.state = {
      originalStocks: [],
      allStocks: [],
      portfolioStocks: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(allStocks => {
      this.setState({allStocks})
      this.setState({originalStocks: allStocks})
    })
  }

  displayAvailableStocks = () => {
    return this.state.allStocks.filter(s => !this.state.portfolioStocks.includes(s))
  }

  buyStock = (stock) => {
    this.setState({portfolioStocks: [...this.state.portfolioStocks, stock]})
  }

  sellStock = (stock) => {
    this.setState({portfolioStocks: this.state.portfolioStocks.filter(s => s.id !== stock.id)})
  }

  sortStocks = (sortBy) => {
    let sortedStocks = this.state.allStocks.slice()
    sortBy === 'alpha' ?
    this.setState({ allStocks: sortedStocks.sort((a,b) => {return a.name.localeCompare(b.name)}) })
    :
    this.setState({ allStocks: sortedStocks.sort((a,b) => {return a.price - b.price }) })
  }

  filterStocks = (e) => {
    let filteredStocks = this.state.originalStocks.slice()
    this.setState({ allStocks: filteredStocks.filter(s => s.type === e.target.value) })
  }

  render() {
    return (
      <div>
        <SearchBar sortStocks={this.sortStocks} filterStocks={this.filterStocks} />

          <div className="row">
            <div className="col-8">

              <StockContainer stockInfo={this.displayAvailableStocks()} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks={this.state.portfolioStocks} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
