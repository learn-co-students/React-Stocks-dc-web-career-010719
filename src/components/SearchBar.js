import React from 'react';

class SearchBar extends React.Component {
  state = {alphabetChecked: false, priceChecked:false}

  alphabetChange = () => {
    this.props.sortAlphabetically(!this.state.alphabetChecked)
    this.setState({alphabetChecked: !this.state.alphabetChecked, priceChecked:false})
  }

  priceChange = () => {
    this.props.sortByPrice(!this.state.alphabetChecked)
    this.setState({priceChecked: !this.state.priceChecked,alphabetChecked: false})
  }


  render() {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" name="sort" checked={this.state.alphabetChecked} onChange={this.alphabetChange}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" name="sort" checked={this.state.priceChecked} onChange={this.priceChange}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={this.props.filter}>
        <option value="No Filter">None</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}
}


export default SearchBar;
