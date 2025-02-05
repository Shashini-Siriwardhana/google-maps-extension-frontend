import { deleteData, getData, postData, putData } from "../../services/HttpService";
import { Modes } from "../../utils/constants";
import * as api from "../../utils/managers/apiEndpoints";
export const UPDATE_STARTING_POINT = "UPDATE_STARTING_POINT";
export const ADD_CITY = "ADD_CITY";
export const GET_ROUTES = "GET_ROUTES";
export const UPDATE_DESTINATION = "UPDATE_DESTINATION";
export const ADD_POINT_FROM_DESTINATION = "ADD_POINT_FROM_DESTINATION";
export const ADD_ROUTE = "ADD_ROUTE";
export const DELETE_ROUTE = "DELETE_ROUTE";
export const UPDATE_TRANSPORTATION_MODE = "UPDATE_TRANSPORTATION_MODE";

export const addCity = (city: string, coordinates: { lat: number, lng: number }) => ({
    type: ADD_CITY,
    payload: {
        city: {
            address: city,
            coordinates,
        }
    },
});

export const getRoutes = () => {
    return async (dispatch: any) => {
        try {
            const data = await getData(api.GET_ROUTES_API_ENDPOINT, {});
            dispatch({ type: GET_ROUTES, payload: data.routes });
        } catch (error) {
            console.error('error', error);
        }
    };
}

export const addRoute = () => {
    return async (dispatch: any) => {
        const reqBody = {
            destinations: [{
                transportationMode: Modes.DRIVING.name,
            }]
        };

        try {
            const data = await postData(api.ADD_ROUTE_API_ENDPOINT, reqBody);
            dispatch({ type: ADD_ROUTE, payload: data.routes });
        } catch (error) {
            console.error('error', error);
        }
    };
};

export const deleteRoute = (id: number) => {
    return async (dispatch: any) => {
        const reqBody = {
            id: id
        };

        try {
            const response = await deleteData(api.DELETE_ROUTE_API_ENDPOINT, reqBody);
            dispatch({ type: DELETE_ROUTE, payload: response.data });
        } catch (error) {
            console.error('error', error);
        }
    };
};

export const updateStartingPoint = (routeId: number, startingPoint: string, location: { lat: number, lng: number } | null) => {
    return async (dispatch: any) => {
        const reqBody = {
            id: routeId,
            startingPoint,
            location,
        };

        try {
            const response = await putData(api.UPDATE_STARTING_POINT_API_ENDPOINT, reqBody);
            dispatch({ type: UPDATE_STARTING_POINT, payload: response.data });
        } catch (error) {
            console.error('error', error);
        }
    };
};

export const updateDestination = (routeId: number, destinationId: number, destination: string, location: { lat: number, lng: number } | null) => {
    return async (dispatch: any) => {
        const reqBody = {
            id: routeId,
            destination: {
                id: destinationId,
                destination,
                location
            }
        };

        try {
            const response = await putData(api.UPDATE_DESTINATION_API_ENDPOINT, reqBody);
            dispatch({ type: UPDATE_DESTINATION, payload: response.data });
        } catch (error) {
            console.error('error', error);
        }
    };
};

export const addPointFromDestination = (routeId: number) => {
    return async (dispatch: any) => {
        const reqBody = {
            id: routeId,
            destination: {
                transportationMode: Modes.DRIVING.name,
            }
        };
        try {
            const response = await postData(api.ADD_DESTINATION_API_ENDPOINT, reqBody);
            dispatch({ type: ADD_POINT_FROM_DESTINATION, payload: response.data });
        } catch (error) {
            console.error('error', error);
        }
    };
};

export const updateTransportationMode = (routeId: number, destinationId: number, transportationMode: string) => {
    return async (dispatch: any) => {
        const reqBody = {
            id: routeId,
            destination: {
                id: destinationId,
                transportationMode,
            }
        };
        try {
            const response = await putData(api.UPDATE_TRANSPORTATION_MODE_API_ENDPOINT, reqBody);
            dispatch({ type: UPDATE_TRANSPORTATION_MODE, payload: response.data });
        } catch (error) {
            console.error('error', error);
        }
    };
};