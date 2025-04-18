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

const inputButton = document.querySelector('.update-weather');
const input = document.querySelector('input');
input.value = 'Kyiv';
input.addEventListener('keyup', (pressEvent) => {
    const code = (pressEvent.keyCode ? pressEvent.keyCode : pressEvent.which);
    if (code === 13) inputButton.dispatchEvent(new Event('click'));

});
document.addEventListener('DOMContentLoaded', inputProcessor);

inputButton.addEventListener('click', inputProcessor);
