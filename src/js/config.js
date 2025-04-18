const TEMP = {
    celsius: '℃',
    farenheit: '℉'
};

const WINDSPEED = {
    kmh: "km/h",
    ms: "m/s"
};

const HUMIDITY = {
    percent: '%'
};

const TIMEFORMAT = {
    h12: 12,
    h24: 24
};

const CONFIG = {
    temp: TEMP.celsius,
    wind: WINDSPEED.ms,
    humidity: HUMIDITY.percent,
    forecastMaxDays: 7,
    imageFolder: '../../public/img/weather',
    imageFormat: 'svg',
    timeFormat: TIMEFORMAT.h12,

    convertTemperature: function (temp) {
        const currentFar = parseFloat(temp);
        return this.temp === TEMP.farenheit ? currentFar : ((currentFar - 32) / 1.8).toFixed(1);
    },

    convertSpeed: function (speed) {
        const currentSpeed = parseFloat(speed);
        return this.wind === WINDSPEED.kmh ? (currentSpeed * 3.6).toFixed(1) : currentSpeed;
    },

    getImagePath: function (iconName) {
        return new URL(`${this.imageFolder}/${iconName}.${this.imageFormat}`, import.meta.url).href;
    },

    getTimeString: function (time) {
        let timestr = '';
        if (this.timeFormat === TIMEFORMAT.h24) {
            timestr = `${time}:00`;
        } else {
            if (time < TIMEFORMAT.h12) {
                timestr = `${time}:00 AM`;
            } else if (time > TIMEFORMAT.h12) {
                timestr = `${time - TIMEFORMAT.h12}:00 PM`;
            } else {
                timestr = `${time}:00 PM`;
            }
        }
        return timestr;
    }

};


export { CONFIG };