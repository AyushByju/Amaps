import React, { useEffect, useRef, useState } from 'react';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css';
import customIcon from '../../images/pin.jpg' // Import your JPEG icon image

const AzureMap = ({ data }) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const mapInstance = new atlas.Map(mapRef.current, {
      center: [-96.818, 55.396],
      zoom: 3,
      style: 'night',
      view: 'Auto',
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'KwjqTa8_DPXtc3DI3I76qExoHp6FbHhHqiaoHyreDbU',
      },
    });

    mapInstance.events.add('ready', async () => {
      // Load custom icon into image sprite and wait for it to complete
      await mapInstance.imageSprite.add('customIcon', customIcon);
      setMap(mapInstance);
    });

  }, []);

  useEffect(() => {
    if (!map || !data || data.length === 0) {
      return;
    }
  
    let dataSource = map.sources.getById('dataSource');
  
    if (!dataSource) {
      dataSource = new atlas.source.DataSource('dataSource');
      map.sources.add(dataSource);
    } else {
      dataSource.clear();
    }
  
    const features = data.map(({ latitude, longitude }) => {
      return new atlas.data.Feature(new atlas.data.Point([longitude, latitude]));
    });
  
    dataSource.add(features);
  
    let symbolLayer = map.layers.getLayerById('symbolLayer');
  
    if (!symbolLayer) {
      symbolLayer = new atlas.layer.SymbolLayer(dataSource, 'symbolLayer', {
        iconOptions: {
          image: 'customIcon',  // Use custom icon in symbol layer
          size: 0.1 // Adjust the size as needed
        }
      });
      
      map.layers.add(symbolLayer);
    }
  
  }, [map, data]);
  
  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
}

export default AzureMap;
