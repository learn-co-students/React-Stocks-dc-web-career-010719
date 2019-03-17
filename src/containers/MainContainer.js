import React, { Component } from 'react';
import StockContainer from './StockContainer';
import SearchBar from '../components/SearchBar';

const URL = 'http://localhost:3000/stocks';

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      allStocks: [],
      myPortfolio: [],
      filter: 'All',
      sort: 'name'
    };
  }

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(data => this.setState({ allStocks: data }));
  }

  addStock = stock => {
    const newStock = { ...stock, purchaseDate: new Date() };
    this.setState({
      myPortfolio: [...this.state.myPortfolio, newStock]
    });
  };

  removeStock = stock => {
    this.setState({
      myPortfolio: this.state.myPortfolio.filter(s => s !== stock)
    });
  };

  handleSort = e => {
    this.setState({
      sort: e
    });
  };

  handleFilter = val => {
    this.setState({
      filter: val
    });
  };

  sortStocks = () => {
    return this.state.sort === 'name'
      ? this.filterStocks().sort((a, b) =>
          a[this.state.sort].localeCompare(b[this.state.sort])
        )
      : this.filterStocks().sort((a, b) => a.price - b.price);
  };

  filterStocks = () => {
    return this.state.filter === 'All'
      ? this.state.allStocks
      : this.state.allStocks.filter(stock => stock.type === this.state.filter);
  };

  render() {
    return (
      <div>
        <SearchBar
          handleSort={this.handleSort}
          handleFilter={this.handleFilter}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              title="Stocks"
              handleClick={this.addStock}
              allStocks={this.sortStocks()}
            />
          </div>
          <div className="col-4">
            <StockContainer
              title="My Portfolio"
              handleClick={this.removeStock}
              allStocks={this.state.myPortfolio}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
