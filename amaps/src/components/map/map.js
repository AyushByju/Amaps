import React, { useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';
import './map.css';

const Map = () => {
  const mapRef = useRef();

  // Define your own lat/lon data
  const myData = [
    { latitude: 39.9526, longitude: -75.1652 },
    { latitude: 40.7128, longitude: -74.0060 },
  ];

  // Convert to GeoJSON
  const geoJsonData = {
    type: "FeatureCollection",
    features: myData.map((point, index) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.longitude, point.latitude]
      },
      properties: { 
        id: index,
        point_count: 1, // Added placeholder
        point_count_abbreviated: 1 // Added placeholder
      }
    })),
  };

  useEffect(() => {
    const map = new atlas.Map(mapRef.current, {
      center: [-97, 39],
      zoom: 3,
      style: 'night',
      view: 'Auto',
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'KwjqTa8_DPXtc3DI3I76qExoHp6FbHhHqiaoHyreDbU',
      },
    });
  
    map.events.add('ready', () => {
      const datasource = new atlas.source.DataSource(null, {
        cluster: true,
        clusterRadius: 45,
        clusterMaxZoom: 15
      });
  
      map.sources.add(datasource);
  
      const clusterBubbleLayer = new atlas.layer.BubbleLayer(datasource, null, {
        createIndicators: true,
        radius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
        color: ['step', ['get', 'point_count'], 'rgba(0,255,0,0.8)', 100, 'rgba(255,255,0,0.8)', 750, 'rgba(255,0,0,0.8)'],
        strokeWidth: 0,
        filter: ['has', 'point_count']
      });
  
      map.layers.add(clusterBubbleLayer);
  
      const symbolLayer = new atlas.layer.SymbolLayer(datasource, null, {
        filter: ['!', ['has', 'point_count']],
        iconOptions: {
          image: ['concat', ['to-string', ['get', 'icon']], '']
        }
      });
  
      map.layers.add(symbolLayer);
  
      // Replace importData with add
      datasource.add(geoJsonData);
      
    });
  
  }, []);

  return <div ref={mapRef} style={{ }} />;
};

export default Map;
