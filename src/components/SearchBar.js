import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" name="sort" checked={props.sort === 'Alphabetically'} onChange={props.onFilter}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" name="sort" checked={props.sort === 'Price'} onChange={props.onFilter}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select name='filter' onChange={props.onFilter}>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}


export default SearchBar;
