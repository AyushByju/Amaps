import axios from 'axios';

export async function fetchData(searchTerm) {
  const url = `https://cfinassetsmapsearch.search.windows.net/indexes/cfinresourcefindersearchtext-index/docs?api-version=2021-04-30-Preview&search=${searchTerm}`;
  const apiKey = "uA4Ikw66Po32cGkz6iwOB5cwLoo90LedS99VN93p7LAzSeCj13ho";
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey  
  };

  try {
    const response = await axios.get(url, { headers });
    const processedData = response.data.value.map(item => {
      const { lon, lat } = extractLatLng(item.Description);
      // Include CFIN_Category and Product_or_Service
      return { 
        latitude: lat, 
        longitude: lon,
        Company_Name: item.Company_Name,
        CFIN_Category: item.CFIN_Category,
        Product_or_Service: item.Product_or_Service,
        Business_Type: item.Business_Type,
        NAICS: item.NAICS,
        Province: item.Province,
        City: item.City,
        keyphrases: item.keyphrases
      };
    });

    return processedData;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}


function extractLatLng(description) {
  const lonMatch = description.match(/lon=([-0-9.]+)/);
  const latMatch = description.match(/lat=([-0-9.]+)/);
  
  const lon = lonMatch ? parseFloat(lonMatch[1]) : null;
  const lat = latMatch ? parseFloat(latMatch[1]) : null;

  return { lon, lat };
}
