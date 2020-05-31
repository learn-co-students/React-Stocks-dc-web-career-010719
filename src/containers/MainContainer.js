import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {stocks: [], portfolio: [], filteredStocks: [], filteredPortfolio: []}

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(res=>res.json())
    .then(stocks=>this.setState({stocks:stocks, filteredStocks: stocks}))
  }

  buyStock = (stock) => {
    this.setState({portfolio: [...this.state.portfolio, stock], filteredPortfolio: [...this.state.filteredPortfolio, stock], stocks: this.state.stocks.filter((stox)=> stox !== stock), filteredStocks: this.state.filteredStocks.filter((stox)=> stox !== stock)})
  }

  sellStock = (stock) => {
    this.setState({stocks: [...this.state.stocks, stock],filteredStocks: [...this.state.filteredStocks, stock], portfolio: this.state.portfolio.filter((stox)=> stox !== stock), filteredPortfolio: this.state.filteredPortfolio.filter((stox)=> stox !== stock)})
  }

  sortAlphabetically = (checked) => {
    checked ?
    this.setState({filteredStocks: this.state.stocks.sort((stocka,stockb)=>stocka.name.localeCompare(stockb.name)), filteredPortfolio: this.state.portfolio.sort((stocka,stockb)=>stocka.name.localeCompare(stockb.name))}) :
    this.setState({filteredStocks: this.state.stocks, filteredPortfolio: this.state.portfolio})
  }

  sortByPrice = (checked) => {
    if (checked)
    {this.setState({filteredStocks: this.state.stocks.sort((stocka,stockb)=>stocka.price-stockb.price), filteredPortfolio: this.state.portfolio.sort((stocka,stockb)=>stocka.price-stockb.price)})}
    else {
      this.setState({filteredStocks: this.state.stocks, filteredPortfolio: this.state.portfolio})}
  }

  filterByIndustry = (event) => {
    let stockType = event.target.value
    if (stockType !== "No Filter"){
    this.setState({filteredStocks: this.state.stocks.filter((stock)=>stock.type === stockType), filteredPortfolio: this.state.portfolio.filter((stock)=>stock.type === stockType)})}
    else {this.setState({filteredStocks: this.state.stocks, filteredPortfolio: this.state.portfolio})}
  }

  boop = () => {alert('boop!')}


  render() {
    return (
      <div>
        <SearchBar sortAlphabetically={this.sortAlphabetically} sortByPrice={this.sortByPrice} filter={this.filterByIndustry}/>
          <div className="row">
            <div className="col-8">
              <StockContainer stocks={this.state.filteredStocks} buyStock={this.buyStock}/>
            </div>
            <div className="col-4">
              <PortfolioContainer stocks={this.state.filteredPortfolio} sellStock={this.sellStock}/>
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
