import * as actions from "../actions/RouteActions";

const initialState = {
    city: {
        address: "",
        coordinates: null
    },
    routes: [{
        id: null,
        startingPoint: {
            coordinates: null,
            address: "",
        },
        destinations: [{
            id: null,
            coordinates: null,
            address: "",
        }]
    }],
  };

const RouteReducer = (state=initialState, action: any) => {
    switch (action.type) {
        case actions.ADD_CITY:
            return {
                ...state,
                city: action.payload.city,
            };
        case actions.GET_ROUTES:
            return {
                routes: action.payload
            }
        case actions.ADD_ROUTE:
            return {
                ...state,
                routes: [
                    ...state.routes,
                    action.payload,
                ],
            };
        case actions.DELETE_ROUTE:
            const deletedData = action.payload; 
            const updatedData = [...state.routes].filter((route) => route.id !== deletedData.id)
            return {
            ...state,
            routes: [...updatedData],
            };
        case actions.UPDATE_STARTING_POINT:
            return {
                ...state,
                routes: 
                    state.routes.map(route => 
                        route.id === action.payload.id 
                            ? {...route, 
                                starting_point: action.payload.startingPoint,
                                location: action.payload.location} 
                            : route
                    )
            };
        case actions.UPDATE_DESTINATION:
            return {
                ...state,
                routes: 
                    state.routes.map(route => route.id === action.payload.id 
                    ? {
                        ...route,
                        destinations: 
                            route.destinations.map(destination => destination.id === action.payload.destination.id 
                                ? {
                                    ...destination,
                                    destination: action.payload.destination.destination,
                                    location: action.payload.destination.location,
                                }
                                : destination)
                    }
                    : route
                ),
            };
        case actions.ADD_POINT_FROM_DESTINATION:
            return {
                ...state,
                routes: 
                    state.routes.map(route => route.id === action.payload.id 
                    ? {
                        ...route, 
                        destinations: [
                            ...route.destinations,
                            action.payload.destination
                        ],
                    }
                    : route
                ),
            };
        case actions.UPDATE_TRANSPORTATION_MODE:
            return {
                ...state,
                routes: 
                    state.routes.map(route => route.id === action.payload.id 
                    ? {
                        ...route,
                        destinations: 
                            route.destinations.map(destination => destination.id === action.payload.destination.id 
                            ? {
                                ...destination,
                                transportation_mode: action.payload.destination.transportation_mode,
                            }
                            : destination
                        ),
                    }
                    : route
                ),
            };
        default:
            return state;

    }

}

export default RouteReducer;