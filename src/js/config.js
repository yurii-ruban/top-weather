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
    temp: TEMP.celsius,
    wind: WINDSPEED.m,
    humidity: HUMIDITY.percent,
    forecastMaxDays: 7,
    imageFolder: '/img/weather',
    imageFormat: 'svg',

    convertTemperature: function (temp) {
        const currentFar = parseFloat(temp);
        return temp === TEMP.farenheit ? currentFar : ((currentFar - 32) / 1.8).toFixed(1);
    },

    getImagePath: function (iconName) {
        return `${this.imageFolder}/${iconName}.${this.imageFormat}`;
    }

};


export { CONFIG };