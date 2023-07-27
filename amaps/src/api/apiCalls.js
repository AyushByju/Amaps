import axios from 'axios';
export const fetchData = async () => {
    try {
        const response = await axios.get('https://cfinassetsmapsearch.search.windows.net/indexes/cfinresourcefindersearchtext-index/docs?api-version=2021-04-30-Preview&search=plant%20based%20meet', {
            headers: {
                'Authorization': `Bearer ${uA4Ikw66Po32cGkz6iwOB5cwLoo90LedS99VN93p7LAzSeCj13ho}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw error;
    }
}
