import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {portfolio: [], sorted: 'id', filter: ""}
  }

  // Alter portfolio
  addToPortfolio = (stock) => {
    let newStock = {...stock, id: Date.now()}
    this.setState({portfolio: [...this.state.portfolio, newStock]})
  }

  removeFromPortfolio = (stock) => {
    let newPortfolio = this.state.portfolio.filter(s => s.id != stock.id)
    this.setState({portfolio: newPortfolio})
  }

  // Handle sort
  handleSort = (val) => {
    this.setState({sorted: val})
  }

  // Handle filter
  handleFilter = (e) => {
    this.setState({filter: e.target.value})
  }

  // Render page
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-3">
            <SearchBar handleSort={this.handleSort} handleFilter={this.handleFilter}/>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <StockContainer addToPortfolio={this.addToPortfolio} sorted={this.state.sorted} filtered={this.state.filter}/>
          </div>
          <div className="col-6">
          <PortfolioContainer portfolio={this.state.portfolio} removeFromPortfolio={this.removeFromPortfolio}/>
          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer
