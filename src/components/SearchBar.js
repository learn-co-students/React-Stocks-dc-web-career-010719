import React from 'react';

const SearchBar = (props) => {
  console.log(props);
  return (
    <div>

        <strong>Sort by:</strong>
        <label>
          <input  name="sortBy" type="radio" value="Alphabetically" checked={null} onChange={props.sortBy}/>
          Alphabetically
        </label>
        <label>
          <input  name="sortBy" type="radio" value="Price" checked={null} onChange={props.sortBy}/>
          Price
        </label>
        <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.filterStocks}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
