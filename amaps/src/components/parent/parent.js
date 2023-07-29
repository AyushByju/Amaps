import React, { useState } from 'react';
import SearchBox from '../search/search.js';
import Map from '../map/map.js';

const ParentComponent = () => {
  const [mapData, setMapData] = useState([]);

  const handleDataFetch = (data) => {
    setMapData(data);
  };

  return (
    <div>
      <Map data={mapData} />
      <SearchBox onFetchData={handleDataFetch} />
    </div>
  );
};

export default ParentComponent;
