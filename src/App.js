import React, { Component } from "react";
import Header from "./components/Header";
import MainContainer from "./containers/MainContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allStocks: [],
      alphabetically: false,
      price: false,
      filter: ""
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(allStocks => {
        this.setState({
          allStocks
        });
      });
  };

  handleSort = e => {
    e.persist();
    e.target.value === "Alphabetically"
      ? this.setState({
          alphabetically: !this.state.alphabetically,
          price: this.state.alphabetically
        })
      : this.setState({
          alphabetically: this.state.price,
          price: !this.state.price
        });
  };

  sortedStocks = () => {
    return this.state.alphabetically
      ? this.filteredStocks().sort(function(a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        })
      : this.filteredStocks().sort(function(a, b) {
          return a.price - b.price;
        });
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value
    });
  };
  filteredStocks = () => {
    return this.state.allStocks.filter(s => {
      return s.type.includes(this.state.filter);
    });
  };

  render() {
    return (
      <div>
        <Header />
        <MainContainer
          alphabetically={this.state.alphabetically}
          price={this.state.price}
          handleSort={this.handleSort}
          handleFilter={this.handleFilter}
          allStocks={this.sortedStocks()}
        />
      </div>
    );
  }
}

export default App;
