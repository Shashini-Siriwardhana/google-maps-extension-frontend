import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Modes } from "../utils/constants";

interface DirectionsProps {
    routeBlocks: any;
}

const Directions = (props: DirectionsProps) => {
    const {routeBlocks} = props;
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
      useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
      useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes.length > 0 ? routes[routeIndex] : undefined;
    const leg = selected?.legs?.[0];
    const[destinations, setDestinations] = useState<{ lat: number, lng: number }[][]>([]);

    const walkingPathOptions = {
        strokeColor: '#448EF6',  // Blue color for walking path
            strokeOpacity: 1.0,
            strokeWeight: 3,
            icons: [{
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 3,
              },
              offset: '0',
              repeat: '11px',  // Dash pattern for walking path
            }],
    }

    useEffect(() => {
      const updateDestinations = () => {
        if (!routeBlocks) return;
      
        let newDestinations: any[][] = [];
      
        for (const route of routeBlocks) {
          let newStops: { lat: number, lng: number }[] = [];
          let transportationModes: string[] = [];
          newStops.push(route.location);
      
          for (const destination of route.destinations) {
            newStops.push(destination.location);
            if (destination.location) {
              console.log(destination.transportation_mode)
              transportationModes.push(destination.transportation_mode);     
            }     
          }

          const groupedLocations = groupLocations(newStops, transportationModes)
          newDestinations.push(groupedLocations);
        }
      
        setDestinations(newDestinations);
      };
      updateDestinations();
    }, [routeBlocks])

    const groupLocations = (locations: { lat: number, lng: number }[], transportationModes: string[]) => {
      // Filter for null values
      const filteredLocations = locations.filter(item => item !== null);
      const groupedLocations = [];
      for (let i = 0; i < filteredLocations.length - 1; i++) {
        groupedLocations.push({
          startingPoint: filteredLocations[i],
          destination: filteredLocations[i + 1],
          transportation_mode: transportationModes[i]
        });
      }
      return groupedLocations;
    }
  
    // Initialize directions service and renderer
    useEffect(() => {
      if (!routesLibrary || !map) return;
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
    }, [routesLibrary, map, destinations]);
  

    useEffect(() => {
      if (!directionsService || !directionsRenderer) return;
    
      const renderers: any[] = []; // Store renderers for multiple routes
    
      for (const route of destinations ) {
        for (const path of route) {
          
          if (!(path.startingPoint && path.destination)) continue;
    
          const newDirectionsRenderer = new google.maps.DirectionsRenderer(); // Create a new instance
          newDirectionsRenderer.setMap(directionsRenderer.getMap()); // Attach to the existing map
    
          directionsService
            .route({
              origin: path.startingPoint,
              destination: path.destination,
              travelMode: google.maps.TravelMode[(path.transportation_mode).toUpperCase()],
              provideRouteAlternatives: true
            })
            .then(response => {
              newDirectionsRenderer.setDirections(response);
              renderers.push(newDirectionsRenderer);
              setRoutes(prevRoutes => [...prevRoutes, response.routes]); // Append new routes
              
              if (path.transportation_mode === Modes.WALKING.name) {
                newDirectionsRenderer.setOptions({ polylineOptions: walkingPathOptions });
              } else {
                newDirectionsRenderer.setOptions({ polylineOptions: {strokeColor: '#207DFF', strokeWeight: 4} });
              }
            })
            .catch(error => console.error("Error fetching directions:", error));
        }
      }
    
      return () => {
        renderers.forEach(renderer => renderer.setMap(null)); // Cleanup all renderers
      };
    }, [directionsService, directionsRenderer, destinations]);
    
  
    // Update direction route
    useEffect(() => {
      if (!directionsRenderer) return;
      directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;
  
  }
  
  export default Directions;