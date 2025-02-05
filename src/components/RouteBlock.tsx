
import { useEffect, useState } from 'react';
import '../styles/routeBlock.css';
import CustomKebabMenu from './CustomKebabMenu';
import TravelModeDropDown from './TravelModeDropDown';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import PlaceDropdown from './PlacesDropdown';
import { connect } from 'react-redux';
import { addPointFromDestination, deleteRoute, updateDestination, updateStartingPoint } from '../redux/actions/RouteActions';
import { getCoordinates } from '../utils/helpers';

interface RouteBlockProps {
    startingPoint:  string,
    routeId: number,
    deleteRoute: any,
    addPointFromDestination: any,
    routes: any,
    updateStartingPoint: any,
    updateDestination: any,
}

const RouteBlock = (props: RouteBlockProps) => {
    const {startingPoint, routeId, deleteRoute, addPointFromDestination, routes, updateStartingPoint, updateDestination} = props;
    const [destinationsPerRoute, setDestinationsPerRoute] = useState([])
    const [startingPointAddress, setStartingPointAddress] = useState('');    

    useEffect(() => {
        setStartingPointAddress(startingPoint);
    }, [startingPoint])

    useEffect(() => {
        routes.forEach((route: any) => {
            if (route.id === routeId) {
                setDestinationsPerRoute(route.destinations);
            }
        });
    }, [routes, routeId])

    const handleStartingPointSelect = async(placeDescription: string) => {
        setStartingPointAddress(placeDescription);

        try {
            const coordinates = await getCoordinates(placeDescription);
            if (coordinates) {
                await updateStartingPoint(routeId, placeDescription, coordinates);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDestinationSelect = async(placeDescription: string, destinationId: number) => {
        try {
            const coordinates = await getCoordinates(placeDescription);
            if (coordinates) {
                await updateDestination(routeId, destinationId, placeDescription, coordinates);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteClick = async() => {
        try {
            await deleteRoute(routeId)
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddPointClick = async() => {
        try {
            await addPointFromDestination(routeId)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='route-block-container'>
            <div className='route-block-items'>
                <div className='destination-block'>
                    <div className='locaton-icon'>
                        <LocationOnTwoToneIcon color='primary'/>
                    </div>
                    <div>
                        <PlaceDropdown
                        label='Starting Point' 
                        value={startingPointAddress}
                        handleSelect={handleStartingPointSelect} />
                    </div>
                </div>
                {destinationsPerRoute.map((destination: any, count: number) => (
                    <div className='destination-block' key={`${routeId}-${destination.id}`}>
                        <div className='locaton-icon'>
                            <LocationOnTwoToneIcon color='error'/>
                        </div>
                        <div>
                        <PlaceDropdown
                        label='Destination' 
                        value={destination.destination ?? ''}
                        handleSelect={(place: string) => handleDestinationSelect(place, destination.id)} />
                        </div>
                        <div>
                            <TravelModeDropDown routeId={routeId} destinationId={destination.id}/>
                        </div>
                    </div> ))}
            </div>
            <div style={{alignSelf: 'start'}}>
                <CustomKebabMenu 
                handleAddPointClick={handleAddPointClick}
                handleDeleteClick={handleDeleteClick}/>
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
    deleteRoute,
    addPointFromDestination,
    updateStartingPoint,
    updateDestination,
  };

export default connect(mapStateToProps, mapDispatchToProps)(RouteBlock);

