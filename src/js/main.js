import '../scss/style.scss'
import { getWeather } from './utils/getWeather.js';
import { weatherComposer } from './utils/weatherComposer.js'
import { CONFIG as globalConfig } from './config.js'

const fullData = await getWeather('Kyiv').catch(err => console.log(err));
const minified = weatherComposer(fullData);
console.log(minified);