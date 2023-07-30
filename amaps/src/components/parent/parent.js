import React, { useState } from 'react';
import SearchBox from '../search/search.js';
import Map from '../map/map.js';
import Info from '../information/info.js'; // Adjust this import as necessary based on your folder structure

const ParentComponent = () => {
  const [mapData, setMapData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDataFetch = (data, query) => {
    setMapData(data);
    setSearchQuery(query);
  };

  return (
    <div>
      <Map data={mapData} />
      <SearchBox onFetchData={handleDataFetch} />
      <Info searchQuery={searchQuery} />
    </div>
  );
};

export default ParentComponent;
