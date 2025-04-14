import { CONFIG as globalConfig } from '../config.js'

function getCurrentFormattedDate() {
    const todayDate = new Date(Date.now());
    let year = todayDate.getFullYear();
    let day = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    const formatted = `${year}-${month}-${day}`;

    return formatted;
}

function getDayName(dateStr) {
    const locale = 'en-US';
    const todayDate = new Date(Date.now());
    if (getCurrentFormattedDate() === dateStr) return 'Today';

    const date = new Date(dateStr);
    return date.toLocaleString(locale, { weekday: "long" });
}

const fillMain = (data) => {
    return {
        city: data.address,
        conditions: data.currentConditions.conditions,
        temp: data.currentConditions.temp,
        iconText: data.currentConditions.icon
    }
}

const fillTodayForecast = (data) => {
    const todayHours = data.days[0].hours;
    const filteredHours = todayHours.filter((hourData) => {
        const hourNum = parseInt(hourData.datetime.slice(0, 2));
        return (hourNum >= 6 && hourNum % 3 === 0);
    });

    const shortened = filteredHours.map((hourData) => {
        const shortInfo = {};
        shortInfo.time = parseInt(hourData.datetime.slice(0, 2));
        shortInfo.iconText = hourData.icon;
        shortInfo.temp = hourData.temp;
        return shortInfo
    });

    return shortened;
}

const fillAirConditions = (data) => {
    return {
        feelslike: data.currentConditions.feelslike,
        windspeed: data.currentConditions.windspeed,
        uvindex: data.currentConditions.uvindex,
        humidity: data.currentConditions.humidity
    }
}

const fillDailyForecast = (data) => {
    const res = [];
    data.days.forEach((day, idx) => {
        if (idx > globalConfig.forecastMaxDays - 1) return;
        let dayname = getDayName(day.datetime);
        const iconText = day.icon;
        const conditions = day.conditions;
        const minMaxTemp = `${day.tempmax}/${day.tempmin}`;

        res.push({
            dayname,
            iconText,
            conditions,
            minMaxTemp
        });
    });

    return res;
}

const weatherComposer = (data) => {
    const weatherInfo = {};
    weatherInfo.main = fillMain(data);
    weatherInfo.forecast = fillTodayForecast(data);
    weatherInfo.airConditions = fillAirConditions(data);
    weatherInfo.dailyForecast = fillDailyForecast(data);
    return weatherInfo;
}

export { weatherComposer };