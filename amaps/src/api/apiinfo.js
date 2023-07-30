import axios from 'axios';

export const apiinfo = async (searchTerm) => {
  const url = `https://cfinassetsmapsearch.search.windows.net/indexes/cfinresourcefindersearchtext-index/docs?api-version=2021-04-30-Preview&search=${searchTerm}`;
  const apiKey = "uA4Ikw66Po32cGkz6iwOB5cwLoo90LedS99VN93p7LAzSeCj13ho";
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey  
  };

  try {
    const response = await axios.get(url, { headers });
    const infoData = response.data.value; // return the whole item, not just the Information property
    return infoData;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
