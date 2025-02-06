import { AdvancedMarker, Map, MapMouseEvent, Pin, useMap} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import '../styles/customMap.css';
import { MAP_ID} from "../utils/constants";
import Directions from "./Directions";

interface CustomMapProps {
    city: { lat: number, lng: number },
    routes: any
    setDestination: any,
    setDestinationCoordinates: any,
  }

const CustomMap = (props: CustomMapProps) => {
    const {city, routes, setDestination, setDestinationCoordinates} = props;
    const [zoom, setZoom] = useState(13);
    const [center, setCenter] = useState(city);
    const [routeBlocks, setRouteBlocks] = useState([]);
    const map = useMap();
    // const zoomControlPosition = google.maps.ControlPosition.LEFT_TOP;

    // useEffect(() => {
    //     async function getAllRoutes() {
    //         try {
    //           await getRoutes();
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       }
    //       getAllRoutes();
    // }, [])

    
    useEffect(() => {
        setRouteBlocks(routes)
    }, [routes])


    // useEffect(() => {
    //     if (!map) return;
    //     const markers = [city, startingPoint, destination].filter(Boolean);;
    //     if (markers.length === 0 || !markers[0]) return;
    //     const bounds = map.getBounds();
    //     if (!bounds) return;
    //     markers.map(marker => {
    //         if (marker) {
    //             bounds.extend({
    //             lat: marker.lat,
    //             lng: marker.lng,
    //             });
    //         }
    //     });

    //     if (markers.length > 1) {
    //         map.fitBounds(bounds);
    //     } else {
    //         map.setCenter(markers[0]); 
    //     }
    // }, [city, startingPoint, destination])

      const getAddress = (e: any) => {
        const location = {lat: e.latLng.lat(), lng:e.latLng.lng()}
        var latlng = new google.maps.LatLng(location);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status == 'OK' && results) {
                console.log(results[0])
                setDestinationCoordinates(location)
                setDestination(results[0].formatted_address);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
                }
        });
    }



    return (
        <div className="map-container">
            <Map
                zoom={zoom}
                onZoomChanged={ev => setZoom(ev.detail.zoom)}
                onCenterChanged={ev => setCenter(ev.detail.center)}
                center={center}
                mapId= {MAP_ID}
                mapTypeControl={false}
                streetViewControl={false}
                zoomControlOptions= {{position: window.google?.maps?.ControlPosition?.LEFT_TOP}}
                gestureHandling= "greedy">
                {/* {routes[0].location && <AdvancedMarker
                key={1}
                position={{lat: routes[0].location.lat, lng: routes[0].location.lng}}>
                </AdvancedMarker>}
                {routes[0].destination[0].location && <AdvancedMarker
                key={2}
                draggable={true}
                onDragEnd={(e) => getAddress(e)}
                position={{lat: routes[0].destination[0].location.lat, lng: routes[0].destination[0].location.lng}}>
                </AdvancedMarker>} */}
                 <Directions routeBlocks={routeBlocks} />
                 {routeBlocks && routeBlocks.map((route: any, routeIndex: number) => (
                    route.destinations.map((point: any, pointIndex: number) => (
                        <AdvancedMarker position={point.location} key={`${route.id}-${point.id}`}>
                            <Pin
                            glyphColor={'white'}
                            glyph={String.fromCharCode(66 + pointIndex)}
                            />
                        </AdvancedMarker>
                    ))))}
            </Map>
        </div>
    );
    
}

export default CustomMap;