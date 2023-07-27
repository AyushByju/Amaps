const axios = require('axios');

async function fetchData() {
  const url = "https://cfinassetsmapsearch.search.windows.net/indexes/cfinresourcefindersearchtext-index/docs?api-version=2021-04-30-Preview&search=plant%20based%20meet";
  const apiKey = "uA4Ikw66Po32cGkz6iwOB5cwLoo90LedS99VN93p7LAzSeCj13ho";
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey  // Changed 'Authorization' to 'api-key'
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

fetchData().then(data => console.log(data));
