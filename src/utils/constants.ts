export const GOOGLE_MAPS_API_KEY=import.meta.env.VITE_MAPS_API_KEY
export const MAP_ID=import.meta.env.VITE_MAP_ID

export const API_BASE_URL=import.meta.env.VITE_BACKEND_HOST_URL

export const Modes = {
    DRIVING: { name: "driving", id: 1 },
    WALKING: { name: "walking", id: 2 },
  };

export enum TravelMode {
    /**
     * Specifies a bicycling directions request.
     */
    BICYCLING = 'BICYCLING',
    /**
     * Specifies a driving directions request.
     */
    DRIVING = 'DRIVING',
    /**
     * Specifies a transit directions request.
     */
    TRANSIT = 'TRANSIT',
    /**
     * Specifies a walking directions request.
     */
    WALKING = 'WALKING',
  }