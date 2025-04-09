const TEMP = {
    celsius: '℃',
    farenheit: '℉'
};

const WINDSPEED = {
    km: "km/h",
    m: "m/s"
};

const HUMIDITY = {
    percent: '%'
};

const CONFIG = {
    temp: TEMP.farenheit,
    wind: WINDSPEED.m,
    humidity: HUMIDITY.percent,
    forecastMaxDays: 7
};


export { CONFIG };