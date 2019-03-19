import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons" id="sort-buttons">
        <label className="btn btn-secondary active sort-button" onClick={() => props.handleSort("id")}>
          <input type="radio" value="id" checked={null} />
          No sort
        </label>
        <label className="btn btn-secondary sort-button" onClick={() => props.handleSort("name")}>
          <input type="radio" value="name" checked={null} />
          Sort by name
        </label>
        <label className="btn btn-secondary sort-button" onClick={() => props.handleSort("price")}>
          <input type="radio" value="price" checked={null} />
          Sort by price
        </label>
      </div>
      <label id="filter-menu">
        <strong>Filter: </strong>
        <select onChange={(e) => props.handleFilter(e)}>
          <option value="">Show All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
