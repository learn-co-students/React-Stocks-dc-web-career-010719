import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

constructor(){
  super()
  this.state = {
    stockArray: [],
    portfolioArray: [],
    filterOption: '',
    sortOption: '',
    sortedArray: []
  }
}
  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stockData => this.setState({
      stockArray: stockData
    }))
  }


  handleSort = (e) => {
    this.setState({
      sortOption: e.target.value.toLowerCase()
    })
}

  sortFunc = () => {
    switch (this.state.sortOption) {
      case 'price':
      return this.state.stockArray.sort((stock1, stock2) =>
         stock1.price - stock2.price,
        console.log('inside price fucn', this.state.stockArray))

      case 'alphabetically':
       return this.state.stockArray.sort((stock1, stock2) =>
         stock1.name.localeCompare(stock2.name),
       console.log('inside alph fucn', this.state.stockArray))

      default:
         return this.state.stockArray
       }
     }



  handleClick = (stock) => {
    this.setState({
      portfolioArray: [...this.state.portfolioArray, stock]
    })
  }

  handleFilter = (e) => {
    this.setState({
      filterOption: e.target.value
    })
  }

  removeStock = (stockObj) => {
    this.setState({
      portfolioArray: this.state.portfolioArray.filter(stock => stock.name !== stockObj.name)
    })
  }

  filterFunc = () => {
    let sorted = this.sortFunc()
    if (this.state.filterOption !== ''){
        return sorted.filter(stock => stock.type === this.state.filterOption)
    } else {
        return sorted
    }
 }

  render() {
    return (
      <div>
        <SearchBar handleFilter={this.handleFilter} handleSort={this.handleSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.filterFunc()}
                handleClick={this.handleClick}
                />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioArray} handleClick={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
