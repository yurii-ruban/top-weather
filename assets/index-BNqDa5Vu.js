(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();const g="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";async function T(e){try{const t=await fetch(`${g}/${e}?`+new URLSearchParams({unitGroup:"us",key:"CH7CWNUXAD2N4PU8NPDSEXCPR",contentType:"json"}).toString());if(!t.ok)throw new Error(`Network error: ${t.statusText}`);return await t.json()}catch(t){throw t}}const d={celsius:"℃",farenheit:"℉"},f={kmh:"km/h",ms:"m/s"},S={percent:"%"},u={h12:12,h24:24},c={temp:d.celsius,wind:f.ms,humidity:S.percent,forecastMaxDays:7,imageFolder:"../../public/img/weather",imageFormat:"svg",timeFormat:u.h12,convertTemperature:function(e){const t=parseFloat(e);return this.temp===d.farenheit?t:((t-32)/1.8).toFixed(1)},convertSpeed:function(e){const t=parseFloat(e);return this.wind===f.kmh?(t*3.6).toFixed(1):t},getImagePath:function(e){return new URL(`${this.imageFolder}/${e}.${this.imageFormat}`,import.meta.url).href},getTimeString:function(e){let t="";return this.timeFormat===u.h24?t=`${e}:00`:e<u.h12?t=`${e}:00 AM`:e>u.h12?t=`${e-u.h12}:00 PM`:t=`${e}:00 PM`,t}};function x(){const e=new Date(Date.now());let t=e.getFullYear(),o=e.getDate(),i=e.getMonth()+1;return o=o<10?"0"+o:o,i=i<10?"0"+i:i,`${t}-${i}-${o}`}function w(e){const t="en-US";return x()===e?"Today":new Date(e).toLocaleString(t,{weekday:"long"})}const C=e=>({city:e.address,conditions:e.currentConditions.conditions,temp:e.currentConditions.temp,iconText:e.currentConditions.icon}),F=e=>e.days[0].hours.filter(n=>{const r=parseInt(n.datetime.slice(0,2));return r>=6&&r%3===0}).map(n=>{const r={};return r.time=parseInt(n.datetime.slice(0,2)),r.iconText=n.icon,r.temp=n.temp,r}),v=e=>({feelslike:e.currentConditions.feelslike,windspeed:e.currentConditions.windspeed,uvindex:e.currentConditions.uvindex,humidity:e.currentConditions.humidity}),q=e=>{const t=[];return e.days.forEach((o,i)=>{if(i>c.forecastMaxDays-1)return;let n=w(o.datetime);const r=o.icon,s=o.conditions,l=`${o.tempmax}/${o.tempmin}`;t.push({dayname:n,iconText:r,conditions:s,minMaxTemp:l})}),t},I=e=>{const t={};return t.main=C(e),t.forecast=F(e),t.airConditions=v(e),t.dailyForecast=q(e),t},a="--",$=function(e){const t=document.querySelector(".main"),o=t.querySelector(".city-name"),i=t.querySelector(".conditions"),n=t.querySelector(".temp"),r=t.querySelector("img");o.innerText=e.main.city||a,i.innerText=e.main.conditions||a,n.innerText=c.convertTemperature(e.main.temp)+c.temp||a,r.src=c.getImagePath(e.main.iconText)},P=function(e){const t=document.querySelector(".forecast-container");Array.from(t.children).forEach((o,i)=>{const n=o.querySelector(".time-text"),r=o.querySelector("img"),s=o.querySelector(".temp");n.innerText=c.getTimeString(e.forecast[i].time),r.src=c.getImagePath(e.forecast[i].iconText),s.innerText=c.convertTemperature(e.forecast[i].temp)+c.temp||a})},M=function(e){const t=document.querySelector(".conditions-container"),o=t.querySelector(".real-feel"),i=t.querySelector(".hummidity"),n=t.querySelector(".wind"),r=t.querySelector(".uv-index");o.innerText=c.convertTemperature(e.airConditions.feelslike)+c.temp||a,i.innerText=e.airConditions.humidity+c.humidity,n.innerText=`${c.convertSpeed(e.airConditions.windspeed)} ${c.wind}`,r.innerText=e.airConditions.uvindex},D=function(e){const t=document.querySelector(".daily-forecast-container");Array.from(t.children).forEach((o,i)=>{const n=o.querySelector(".day-name"),r=o.querySelector("img"),s=o.querySelector("span"),l=o.querySelector(".temp"),m=e.dailyForecast[i].dayname;n.innerText=m==="Today"?"Today":m.slice(0,3),r.src=c.getImagePath(e.dailyForecast[i].iconText),s.innerText=e.dailyForecast[i].conditions,l.innerText=c.convertTemperature(e.dailyForecast[i].minMaxTemp)+c.temp||error})},E={fillInfo:function(e){$(e),P(e),M(e),D(e)}},y=async function(e){const o=document.querySelector("input").value,i=await T(o).catch(n=>console.log(n));if(i){const n=I(i);E.fillInfo(n),console.log(n)}},p=document.querySelector(".update-weather"),h=document.querySelector("input");h.value="Kyiv";h.addEventListener("keyup",e=>{(e.keyCode?e.keyCode:e.which)===13&&p.dispatchEvent(new Event("click"))});document.addEventListener("DOMContentLoaded",y);p.addEventListener("click",y);
