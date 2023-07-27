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


"<table style=\"width:100%\"><tr><td style=\"width:25%\"> Food processing company Potatoes: fresh Seed potato Warehouse</td></tr><tr><th>Business Type:</th><td> Distributor Wholesaler</td></tr><tr><th>Location: </th><td>12220 170 St NW, Edmonton, AB T5V1L7</td></tr><tr><th>Telephone:</th><td>780-447-1860</td></tr><tr><td><a target=\"_blank\" href=\"http://www.epg.ab.ca/\"> Website </a></td><td><a href=\"#\" onclick=\"window.open('https://cfinsearchresource.azurewebsites.net/cfinmap.html?lon=-113.617000&lat=53.577000&bustyp= Distributor Wholesaler&proser= Food processing company Potatoes: fresh Seed potato Warehouse&loc=12220 170 St NW, Edmonton, AB T5V1L7&tel=780-447-1860&comnam=Edmonton Potato Growers&website=www.epg.ab.ca/', 'winname','directories=no,titlebar=no,location=no,status=no,toolbar=no,menubar=no,scrollbars=no,resizable=no,width=700,height=630 ');return false;\">Map</a></td></tr></table>"