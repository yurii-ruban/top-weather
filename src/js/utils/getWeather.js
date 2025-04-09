const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'

async function getWeather(city) {
    try {
        const response = await fetch(`${url}/${city}?` + new URLSearchParams({
            unitGroup: 'us',
            key: 'CH7CWNUXAD2N4PU8NPDSEXCPR',
            contentType: 'json'
        }).toString()
        );
        if (!response.ok) {
            throw new Error(`Network error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export { getWeather };