import request from 'request';

export const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5hYmM1NiIsImEiOiJjbWRoejk1d2gwNnk3MmpvbnZ6NGRwZjFuIn0.Iy5koFzx4D9H3Cnnn-s7JQ`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const data = response.body.features[0];
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            });
        }
    });
}