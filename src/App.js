import React, { Component } from "react";
import Header from "./components/Header";
import MainContainer from "./containers/MainContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allStocks: []
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

  render() {
    return (
      <div>
        <Header />
        <MainContainer allStocks={this.state.allStocks} />
      </div>
    );
  }
}

export default App;
