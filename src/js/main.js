import '../scss/style.scss'
import { getWeather } from './utils/getWeather.js';
import { weatherComposer } from './utils/weatherComposer.js'
import { CONFIG as globalConfig } from './config.js'
import { filler } from './view.js'

const inputProcessor = async function (event) {
    const input = document.querySelector('input');
    const city = input.value;
    const fullData = await getWeather(city).catch(err => console.log(err));

    if (fullData) {
        const minified = weatherComposer(fullData);
        filler.fillInfo(minified);
        console.log(minified);
    }
}

const input = document.querySelector('input');
input.value = 'Kyiv';
document.addEventListener('DOMContentLoaded', inputProcessor);

const inputButton = document.querySelector('.update-weather');
inputButton.addEventListener('click', inputProcessor);
