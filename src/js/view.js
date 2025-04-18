import { CONFIG as globalConfig } from './config.js'

const errorStr = '--';

const fillMainSection = function (data) {
    const main = document.querySelector('.main');
    const cityText = main.querySelector('.city-name');
    const conditionsText = main.querySelector('.conditions');
    const tempText = main.querySelector('.temp');
    const weatherImage = main.querySelector('img');

    cityText.innerText = data.main.city || errorStr;
    conditionsText.innerText = data.main.conditions || errorStr;
    tempText.innerText = globalConfig.convertTemperature(data.main.temp) + globalConfig.temp || errorStr;
    weatherImage.src = globalConfig.getImagePath(data.main.iconText);
}

const fillTodaysForecast = function (data) {
    const forecastContainer = document.querySelector('.forecast-container');
    Array.from(forecastContainer.children).forEach((forecastItem, index) => {
        const timeTextItem = forecastItem.querySelector('.time-text');
        const iconItem = forecastItem.querySelector('img');
        const tempItem = forecastItem.querySelector('.temp');

        timeTextItem.innerText = globalConfig.getTimeString(data.forecast[index].time);
        iconItem.src = globalConfig.getImagePath(data.forecast[index].iconText);
        tempItem.innerText = globalConfig.convertTemperature(data.forecast[index].temp) + globalConfig.temp || errorStr;
    });
}

const fillAirConditions = function (data) {
    const conditionsContainer = document.querySelector('.conditions-container');
    const realFeel = conditionsContainer.querySelector('.real-feel');
    const hummidity = conditionsContainer.querySelector('.hummidity');
    const wind = conditionsContainer.querySelector('.wind');
    const uvIndex = conditionsContainer.querySelector('.uv-index');

    realFeel.innerText = globalConfig.convertTemperature(data.airConditions.feelslike) + globalConfig.temp || errorStr;
    hummidity.innerText = data.airConditions.humidity + globalConfig.humidity;
    wind.innerText = `${globalConfig.convertSpeed(data.airConditions.windspeed)} ${globalConfig.wind}`;
    uvIndex.innerText = data.airConditions.uvindex;
}

const fillWeekForecast = function (data) {
    const forecastContainer = document.querySelector('.daily-forecast-container');
    Array.from(forecastContainer.children).forEach((item, index) => {
        const dayName = item.querySelector('.day-name');
        const icon = item.querySelector('img');
        const condition = item.querySelector('span');
        const temp = item.querySelector('.temp');

        const day = data.dailyForecast[index].dayname;
        dayName.innerText = day === 'Today' ? 'Today' : day.slice(0, 3);
        icon.src = globalConfig.getImagePath(data.dailyForecast[index].iconText);
        condition.innerText = data.dailyForecast[index].conditions;
        temp.innerText = globalConfig.convertTemperature(data.dailyForecast[index].minMaxTemp) + globalConfig.temp || error;
    });

}

const filler = {
    fillInfo: function (data) {
        fillMainSection(data);
        fillTodaysForecast(data);
        fillAirConditions(data);
        fillWeekForecast(data);
    }
};

export { filler };