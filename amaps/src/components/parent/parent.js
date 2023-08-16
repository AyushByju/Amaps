import React, { useState, useEffect } from 'react';
import SearchBox from '../search/search.js';
import Map from '../map/map.js';
import Info from '../information/info.js';
import CheckboxFilter from '../filter/filter.js';

const ParentComponent = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedCFINCategories, setCheckedCFINCategories] = useState([]);
  const [uniqueCFINCategories, setUniqueCFINCategories] = useState([]);
  const [checkedProductServices, setCheckedProductServices] = useState([]);
  const [uniqueProductServices, setUniqueProductServices] = useState([]);
  const [checkedBusinessTypes, setCheckedBusinessTypes] = useState([]);
  const [uniqueBusinessTypes, setUniqueBusinessTypes] = useState([]);
  const [checkedNAICS, setCheckedNAICS] = useState([]);
  const [uniqueNAICS, setUniqueNAICS] = useState([]);
  const [checkedProvince, setCheckedProvince] = useState([]);
  const [uniqueProvince, setUniqueProvince] = useState([]);
  const [checkedCity, setCheckedCity] = useState([]);
  const [uniqueCity, setUniqueCity] = useState([]);
  const [checkedKeyPhrases, setCheckedKeyPhrases] = useState([]);
  const [uniqueKeyPhrases, setUniqueKeyPhrases] = useState([]);

  useEffect(() => {
    const CFINCategories = [...new Set(mapData.map(item => item.CFIN_Category))];
    const productServices = [...new Set(mapData.map(item => item.Product_or_Service))];
    const businessTypes = [...new Set(mapData.map(item => item.Business_Type))];
    const NAICSValues = [...new Set(mapData.map(item => item.NAICS))];
    const provinceValues = [...new Set(mapData.map(item => item.Province))];
    const cityValues = [...new Set(mapData.map(item => item.City))];
    const keyphraseValues = [...new Set(mapData.map(item => item.keyphrases))];

    setUniqueCFINCategories(CFINCategories);
    setCheckedCFINCategories(CFINCategories);
    setUniqueProductServices(productServices);
    setCheckedProductServices(productServices);
    setUniqueBusinessTypes(businessTypes);
    setCheckedBusinessTypes(businessTypes);
    setUniqueNAICS(NAICSValues);
    setCheckedNAICS(NAICSValues);
    setUniqueProvince(provinceValues);
    setCheckedProvince(provinceValues);
    setUniqueCity(cityValues);
    setCheckedCity(cityValues);
    setUniqueKeyPhrases(keyphraseValues);
    setCheckedKeyPhrases(keyphraseValues);
  }, [mapData]);

  const handleDataFetch = (data, query) => {
    setMapData(data);
    setSearchQuery(query);
  };

  const handleToggle = (category, checkedCategories, setCheckedCategories) => {
    setCheckedCategories(prevState => {
      if (prevState.includes(category)) {
        return prevState.filter(c => c !== category);
      } else {
        return [...prevState, category];
      }
    });
  };

  const filteredData = mapData.filter(item =>
    checkedCFINCategories.includes(item.CFIN_Category) &&
    checkedProductServices.includes(item.Product_or_Service) &&
    checkedBusinessTypes.includes(item.Business_Type) &&
    checkedNAICS.includes(item.NAICS) &&
    checkedProvince.includes(item.Province) &&
    checkedCity.includes(item.City) &&
    checkedKeyPhrases.includes(item.keyphrases)
  );

  const [isFilterOpen, setFilterOpen] = useState(true);
  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  return (
    <div className="main-content">
        <Map data={filteredData} onSelectCompany={setSelectedCompany} />
        <SearchBox onFetchData={handleDataFetch} />
        <Info searchQuery={searchQuery} />
        
        {searchQuery && ( // This line ensures filters are displayed only when there's a searchQuery
            <div className="main-filter-container">
                <button onClick={toggleFilter}>
                    Filters {isFilterOpen ? '▲' : '▼'}
                </button>
                {isFilterOpen && (
                    <div className="all-filters">
                        <CheckboxFilter 
                            title="CFIN Category" 
                            categories={uniqueCFINCategories} 
                            checkedCategories={checkedCFINCategories} 
                            onCategoryToggle={(category) => handleToggle(category, checkedCFINCategories, setCheckedCFINCategories)} 
                        />
                        <CheckboxFilter 
                            title="Product or Service" 
                            categories={uniqueProductServices} 
                            checkedCategories={checkedProductServices} 
                            onCategoryToggle={(service) => handleToggle(service, checkedProductServices, setCheckedProductServices)} 
                        />
                        <CheckboxFilter 
                            title="Business Type" 
                            categories={uniqueBusinessTypes} 
                            checkedCategories={checkedBusinessTypes} 
                            onCategoryToggle={(type) => handleToggle(type, checkedBusinessTypes, setCheckedBusinessTypes)} 
                        />
                        <CheckboxFilter 
                            title="NAICS" 
                            categories={uniqueNAICS} 
                            checkedCategories={checkedNAICS} 
                            onCategoryToggle={(naics) => handleToggle(naics, checkedNAICS, setCheckedNAICS)} 
                        />
                        <CheckboxFilter 
                            title="Province" 
                            categories={uniqueProvince} 
                            checkedCategories={checkedProvince} 
                            onCategoryToggle={(province) => handleToggle(province, checkedProvince, setCheckedProvince)} 
                        />
                        <CheckboxFilter 
                            title="City" 
                            categories={uniqueCity} 
                            checkedCategories={checkedCity} 
                            onCategoryToggle={(city) => handleToggle(city, checkedCity, setCheckedCity)} 
                        />
                        <CheckboxFilter 
                            title="Key Phrases" 
                            categories={uniqueKeyPhrases} 
                            checkedCategories={checkedKeyPhrases} 
                            onCategoryToggle={(keyphrase) => handleToggle(keyphrase, checkedKeyPhrases, setCheckedKeyPhrases)} 
                        />
                    </div>
                )}
            </div>
        )}
    </div>
);
};

export default ParentComponent;
