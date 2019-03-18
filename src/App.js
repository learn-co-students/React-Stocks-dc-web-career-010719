import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <MainContainer/>
      </React.Fragment>
    );
  }
}

export default App;
