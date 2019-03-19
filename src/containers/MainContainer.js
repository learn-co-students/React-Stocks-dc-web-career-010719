import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      myStocks: []
    };
  }

  buyStock = stock => {
    this.setState({
      myStocks: [...this.state.myStocks, { ...stock, purchaseDate: Date.now() }]
    });
  };

  sellStock = stock => {
    this.setState({
      myStocks: this.state.myStocks.filter(
        s => s.purchaseDate !== stock.purchaseDate
      )
    });
  };

  render() {
    return (
      <div>
        <SearchBar handleSort={props.handleSort} />

        <div className="row">
          <div className="col-8">
            <StockContainer
              allStocks={this.props.allStocks}
              handleStockClick={this.buyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.state.myStocks}
              handleStockClick={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
