import CustomMap from '../../components/CustomMap';
import '../../styles/dashboard.css'
import RouteBlock from '../../components/RouteBlock';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import PlaceDropdown from '../../components/PlacesDropdown';
import { addCity, addRoute, getRoutes } from '../../redux/actions/RouteActions';
import { connect, useDispatch } from "react-redux";
import { Dispatch } from 'redux';
import { getCoordinates } from '../../utils/helpers';


const Dashboard = ({getRoutes, routes, addRoute}: any) => {
    const [cityCoordinates, setCityCoordinates] = useState<{ lat: number, lng: number }>({
        lat: 51.509865,
        lng: -0.118092,
      });
      const [city, setCity] = useState("");
    const [destinations, setDestinations] = useState<any>([]);
    const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number, lng: number } | null>(null);
    const [routeBlocks, setRouteBlocks] = useState([]);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        async function getAllRoutes() {
          try {
            await getRoutes();
          } catch (error) {
            console.error(error);
          }
        }
        getAllRoutes();
    }, []);

    useEffect(() => {
        if (routes.length > 0) {
            setRouteBlocks(routes)
        }
        // if (routeBlocks.length > 0) {
        // }

    }, [routes])

    const handleCitySelect = (placeDescription: string) => {
        setCity(placeDescription);
        // getCoordinates(placeDescription, setCityCoordinates);
    }

    useEffect(() => {
        if (cityCoordinates) {
            dispatch(addCity(city, cityCoordinates));
        }
    }, [cityCoordinates]);

    const handleAddClick = async() => {
        try {
            await addRoute();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="grid-container">
            <div className='grid-item'>
                <CustomMap 
                city={cityCoordinates} 
                routes={routeBlocks}
                setDestination={setDestinations}
                setDestinationCoordinates={setDestinationCoordinates}/>
            </div>
            <div className='grid-item'>
                <PlaceDropdown
                    label='City' 
                    handleSelect={handleCitySelect} />
                <div className='btn-add-route'>
                    <Button variant='contained' type='button' onClick={handleAddClick}>
                        <AddCircleOutlineIcon />
                        <span style={{paddingLeft: '5px'}}>Add New Route</span>
                    </Button>
                </div>
                {routeBlocks.map((item: any, count: number) => (
                    <RouteBlock 
                    key={item.id ?? 1}
                    startingPoint={item.starting_point ?? ''} 
                    routeId={item.id ?? 1}/> ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
      routes: state.route.routes,
    }
  };
  
  const mapDispatchToProps = {
    getRoutes,
    addRoute,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);