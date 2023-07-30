import React, { useEffect, useState } from 'react';
import { apiinfo } from '../../api/apiinfo'; // adjust path as necessary

const Info = ({ searchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiinfo(searchQuery);
      setData(result);
    }

    if (searchQuery) {
      fetchData();
    }

  }, [searchQuery]);

  if (!data) return null;

  return (
    <div>
      {/* Display data here */}
      {/* You can use `data` to display its information as needed */}
      {data.map((item, index) => (
        <div key={index} dangerouslySetInnerHTML={{__html: item.Description}}></div>
      ))}
    </div>
  )
}

export default Info;
