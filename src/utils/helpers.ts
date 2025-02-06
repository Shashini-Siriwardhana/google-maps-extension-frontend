export const getCoordinates = async (placeDescription: string): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: placeDescription }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                resolve({ lat, lng });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
                reject(null);
            }
        });
    });
};