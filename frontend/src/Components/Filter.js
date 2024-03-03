
import React from 'react';
// import './filter.css';
const Filter = (props) => {
  let filterData = props.filterData;
  let category = props.category;
  let setCategory = props.setCategory;
console.log("fil",filterData)
  function filterHandler(title) {
    setCategory(title);
  }

  // Get unique categories
  const uniqueCategories = Array.from(new Set(filterData.map((data) => data.categories)));
  //console.log("cat",uniqueCategories);
console.log("uni",uniqueCategories)
  return (
    <div className="container">
      <button
        className="btn"
        onClick={() => filterHandler('All')}
      >
        All
      </button>
      {
      uniqueCategories.map((categoryItem) => (
        <button
          className="btn"
          key={categoryItem}
          onClick={() => filterHandler(categoryItem)}
        >
          {categoryItem}
        </button>
      ))}
    </div>
  );
};

export default Filter;