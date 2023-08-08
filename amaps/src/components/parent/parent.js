// ParentComponent.js
import React, { useState, useEffect } from 'react';
import SearchBox from '../search/search.js';
import Map from '../map/map.js';
import Info from '../information/info.js';
import CheckboxFilter from '../filter/filter.js';

const ParentComponent = () => {
  const [mapData, setMapData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedCFINCategories, setCheckedCFINCategories] = useState([]);
  const [uniqueCFINCategories, setUniqueCFINCategories] = useState([]);
  const [checkedProductServices, setCheckedProductServices] = useState([]);
  const [uniqueProductServices, setUniqueProductServices] = useState([]);

  useEffect(() => {
    // Extract unique CFIN_Category and Product_or_Service values from mapData
    const CFINCategories = [...new Set(mapData.map(item => item.CFIN_Category))];
    const productServices = [...new Set(mapData.map(item => item.Product_or_Service))];
    setUniqueCFINCategories(CFINCategories);
    setCheckedCFINCategories(CFINCategories);  // Set all CFIN categories as initially checked
    setUniqueProductServices(productServices);
    setCheckedProductServices(productServices);  // Set all product services as initially checked
  }, [mapData]);
  

  const handleDataFetch = (data, query) => {
    setMapData(data);
    setSearchQuery(query);
  };

  // Toggle a CFIN category's checked state
  const handleCFINCategoryToggle = (category) => {
    setCheckedCFINCategories(prevState => {
      if (prevState.includes(category)) {
        // Remove category from checkedCFINCategories
        return prevState.filter(c => c !== category);
      } else {
        // Add category to checkedCFINCategories
        return [...prevState, category];
      }
    });
  };

  // Toggle a product service's checked state
  const handleProductServiceToggle = (service) => {
    setCheckedProductServices(prevState => {
      if (prevState.includes(service)) {
        // Remove service from checkedProductServices
        return prevState.filter(s => s !== service);
      } else {
        // Add service to checkedProductServices
        return [...prevState, service];
      }
    });
  };

  // Filter mapData based on checkedCFINCategories and checkedProductServices
  const filteredData = mapData.filter(item => checkedCFINCategories.includes(item.CFIN_Category) && checkedProductServices.includes(item.Product_or_Service));

  return (
    <div>
      <Map data={filteredData} />
      <SearchBox onFetchData={handleDataFetch} />
      <Info searchQuery={searchQuery} />
      <CheckboxFilter
        title="CFIN Category"
        categories={uniqueCFINCategories}
        checkedCategories={checkedCFINCategories}
        onCategoryToggle={handleCFINCategoryToggle}
      />

      <CheckboxFilter
        title="Product or Service"
        categories={uniqueProductServices}
        checkedCategories={checkedProductServices}
        onCategoryToggle={handleProductServiceToggle}
      />

    </div>
  );
};

export default ParentComponent;
