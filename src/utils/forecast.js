import request from "request";


export const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3bc0440c203db2df9d13317fb0fdc2b4&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const data = response.body.current;
            callback(undefined, {
                temperature: data.temperature,
                feelslike: data.feelslike,
                weather_descriptions: data.weather_descriptions[0]
            });
        }
    });
};

