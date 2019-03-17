import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(){
    super()
    this.state= {
    allStocks: [],
    myPortfolio: [],
    filteredStocks: [],
    myPortfolioFiltered: []

    }
  }

    componentDidMount(){
      fetch('http://localhost:3000/stocks')
      .then((response)=>{
        return response.json()
      })
      .then((stocks)=>{
        console.log(stocks)
        //store stocks in allStocks state
        this.setState({allStocks: stocks})
        this.setState({filteredStocks: stocks})
      })
    }

    buyStocks = (stockObj) => {
      //Add stock obj to my portfolio, without mutating state directly!!

            //USING PUSH
      // let portfolio = this.state.myPortfolio;
      // portfolio.push(stockObj);

          //USING SPREAD
            //spread operator makes a copy of the state,
            //therefore you don't mutate it directly
            //can be used on objects as well,
              // exposes all the keys and allows you to add another
              // key value pair to the object

        let portfolio = [...this.state.myPortfolio, stockObj]
        this.setState({myPortfolio: portfolio})

      // if(!this.state.myPortfolio.includes(stockObj)){
      //   let portfolio = [...this.state.myPortfolio, stockObj]
      //   this.setState({myPortfolio: portfolio})
      //
      // } else {
      //   alert("You already have this stock!")
      // }

      //
      console.log("buyStocks function invoked!", stockObj)

      //State is supposed to be immutable, that is why we must not
      // modify state directly

    }

    sellStocks = (stockObj) => {

      let currentPortfolio = this.state.myPortfolio;
      let updatedPortfolio = currentPortfolio.filter((stock)=>{
        return stockObj.name !== stock.name
      })

      this.setState({myPortfolio: updatedPortfolio})
      console.log("sellStocks function invoked");
    }

    buySellStock = (stockObj) => {
      //if the clicked stock object IS NOT in portfolio...
      if(!this.state.myPortfolio.includes(stockObj)){
        //add it to the portfolio using buyStocks method
        this.buyStocks(stockObj)
      } else{
        console.log("sellStocks method should be invoked")
        //remove it from portfolio using sellStocks method
        this.sellStocks(stockObj)
      }

    }

    resetStocks = ()=> {
      fetch('http://localhost:3000/stocks')
      .then((response)=>{
        return response.json()
      })
      .then((stocks)=>{
        console.log(stocks)
        //store stocks in allStocks state
        this.setState({allStocks: stocks})
      })
    }

    filterStocks = (event) => {
      this.resetStocks()
      console.log("filter stocks function invoked!");
      //
      // get all the Stocks
      let allStocks = this.state.allStocks
      let filterTerm = event.currentTarget.value
      // filter array of all stocks by filterTerm

      if(filterTerm === "All"){
        this.setState({filteredStocks: allStocks})
      } else{
        let filteredStocks = allStocks.filter((stock)=> {
          return stock.type === filterTerm
          //
        })
        //

        this.setState({filteredStocks: filteredStocks})
      }


    }

    sortBy = (event) => {
      console.log('sortBy function invoked!')
      let sortStyle = event.currentTarget.value
      let currentStocks = this.state.filteredStocks
      let tickersArr = currentStocks.map(stock=> stock.ticker);
      // let result = [];
      let result;

      if(sortStyle === "Alphabetically"){
        //   //THERE HAS TO BE AN EASIER WAY TO DO THIS
        // tickersArr.sort().map((ticker, idx) => {
        //   currentStocks.forEach(stockObj => {
        //
        //     if(stockObj.ticker === ticker){
        //       result.push(stockObj)
        //     }
        //   })
        //   //
        // })

        // BETTER WAY

        result = currentStocks.sort((a,b)=> {
          let stockA = a.ticker.toUpperCase();
          let stockB = b.ticker.toUpperCase();
          if(stockA < stockB){
            return -1;
          }
          if (stockA > stockB) {
            return 1;
          }

          return 0;
        })

        
        this.setState({filteredStocks: result})
      } else{

        result = currentStocks.sort((a,b)=>{
          return a.price - b.price
        })

        console.log("sortBy price invoked!");
        this.setState({filteredStocks: result})

      }

      //

    }


  render() {
    return (
      <div>
        <SearchBar
          sortBy={this.sortBy}
          filterTerm={this.state.filterTerm}
          filterStocks={this.filterStocks}
          />

          <div className="row">
            <div className="col-8">

              <StockContainer
                buySell={this.buySellStock}
                allStocks={this.state.allStocks}
                filteredStocks={this.state.filteredStocks}
                />

            </div>
            <div className="col-4">

              <PortfolioContainer
                buySell={this.buySellStock}
                portfolioStocks={this.state.myPortfolio}
                />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
