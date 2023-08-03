// ParentComponent.js
import React, { useState, useEffect } from 'react';
import SearchBox from '../search/search.js';
import Map from '../map/map.js';
import Info from '../information/info.js';
import CheckboxFilter from '../filter/filter.js'; // Import the new component

const ParentComponent = () => {
  const [mapData, setMapData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    // Extract unique CFIN_Category values from mapData
    const categories = [...new Set(mapData.map(item => item.CFIN_Category))];
    setUniqueCategories(categories);
    setCheckedCategories(categories);  // Set all categories as initially checked
  }, [mapData]);

  const handleDataFetch = (data, query) => {
    setMapData(data);
    setSearchQuery(query);
  };

  // Toggle a category's checked state
  const handleCategoryToggle = (category) => {
    setCheckedCategories(prevState => {
      if (prevState.includes(category)) {
        // Remove category from checkedCategories
        return prevState.filter(c => c !== category);
      } else {
        // Add category to checkedCategories
        return [...prevState, category];
      }
    });
  };

  // Filter mapData based on checkedCategories
  const filteredData = mapData.filter(item => checkedCategories.includes(item.CFIN_Category));

  return (
    <div>
      <Map data={filteredData} />
      <SearchBox onFetchData={handleDataFetch} />
      <Info searchQuery={searchQuery} />
      <CheckboxFilter
        categories={uniqueCategories}
        checkedCategories={checkedCategories}
        onCategoryToggle={handleCategoryToggle}
      />
    </div>
  );
};

export default ParentComponent;
