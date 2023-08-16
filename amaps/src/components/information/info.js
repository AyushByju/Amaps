import React, { useEffect, useState } from 'react';
import { apiinfo } from '../../api/apiinfo';
import './info.css';

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
    <div className="info-container" style={{ border: '2px solid grey', maxHeight: '50vh', width: '50%', overflowY: 'auto', padding: '10px', marginTop: '10px', marginLeft: '1030px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <h3>{item.Company_Name}</h3>
            <div dangerouslySetInnerHTML={{__html: item.Description}} />
            {item.Thumbnail && <img src={item.Thumbnail} alt={item.Company_Name} style={{width: '100px', height: 'auto'}} />}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Info;
