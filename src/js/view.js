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

const filler = {
    fillInfo: function (data) {
        fillMainSection(data);
        // fillTodaysForecast(data);
        // fillAirConditions(data);
        // fillWeekForecast(data);
    }
};

export { filler };