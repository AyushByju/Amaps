import React, { useEffect, useRef, useState } from 'react';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css';

const AzureMap = ({ data, onSelectCompany }) => {
    const [map, setMap] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null); // Store selected company data
    const mapRef = useRef();

    useEffect(() => {
        const mapInstance = new atlas.Map(mapRef.current, {
            center: [-96.818, 53.396],
            zoom: 3.5,
            style: 'grayscale_light',
            view: 'Auto',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: 'KwjqTa8_DPXtc3DI3I76qExoHp6FbHhHqiaoHyreDbU',
            },
        });

        mapInstance.events.add('ready', () => {
            setMap(mapInstance);
        });

    }, []);

    useEffect(() => {
        if (!map || !selectedCompany) return;

        const popup = new atlas.Popup({
            position: [selectedCompany.longitude, selectedCompany.latitude],
            content: `<div style="padding:8px">${selectedCompany.Company_Name}</div>`,
        });

        popup.open(map);

        return () => {
            // Cleanup the popup when the component is unmounted or if selectedCompany changes
            popup.close();
        };
    }, [map, selectedCompany]);

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
    
        const features = data.map((item) => {
            const feature = new atlas.data.Feature(
                new atlas.data.Point([item.longitude, item.latitude]),
                { Company_Name: item.Company_Name } // Store company name to the feature
            );
            return feature;
        });
    
        dataSource.add(features);
    
        let symbolLayer = map.layers.getLayerById('symbolLayer');
    
        if (!symbolLayer) {
            symbolLayer = new atlas.layer.SymbolLayer(dataSource, 'symbolLayer', {
                iconOptions: {
                    image: 'marker-blue',  // Use built-in blue marker
                    size: 1 // Adjust the size as needed
                }
            });
            
            map.layers.add(symbolLayer);

            // Attach click event to the symbol layer
            map.events.add('click', symbolLayer, (event) => {
                const clickedFeatures = event.shapes;
                if (clickedFeatures[0] && typeof clickedFeatures[0].getProperties === 'function') {
                    const companyData = clickedFeatures[0].getProperties();
                    setSelectedCompany({
                        Company_Name: companyData.Company_Name,
                        longitude: clickedFeatures[0].getCoordinates()[0],
                        latitude: clickedFeatures[0].getCoordinates()[1],
                    });
                    onSelectCompany && onSelectCompany(companyData.Company_Name);
                }
            });
        }
    
    }, [map, data, onSelectCompany]);
    
    return <div ref={mapRef} style={{ height: '650px', width: '100%' }} />;
}

export default AzureMap;
