import React, { useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';
import './map.css';

const Map = () => {
  const mapRef = useRef();

  const earthquakeFeed = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

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

      map.events.add('click', clusterBubbleLayer, (e) => {
        if (e.shapes && e.shapes.length > 0 && e.shapes[0].properties.cluster) {
          const cluster = e.shapes[0];
          datasource.getClusterExpansionZoom(cluster.properties.cluster_id)
            .then(zoom => {
              map.setCamera({
                center: cluster.geometry.coordinates,
                zoom: zoom,
                type: 'ease',
                duration: 200
              });
            });
        }
      });

      map.events.add('mouseenter', clusterBubbleLayer, () => {
        map.getCanvasContainer().style.cursor = 'pointer';
      });

      map.events.add('mouseleave', clusterBubbleLayer, () => {
        map.getCanvasContainer().style.cursor = 'grab';
      });

      map.layers.add([
        clusterBubbleLayer,
        new atlas.layer.SymbolLayer(datasource, null, {
          iconOptions: { image: 'none' },
          textOptions: {
            textField: ['get' , 'point_count_abbreviated'],
            offset: [0, 0.4]
          }
        }),
        new atlas.layer.SymbolLayer(datasource, null, {
          filter: ['!', ['has', 'point_count']]
        })
      ]);

      datasource.importDataFromUrl(earthquakeFeed);
    });


  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};

export default Map;
