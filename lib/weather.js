export async function getWeather(location){

console.log("🌦️ getWeather called with location:", location);

try{

if(!location){

console.log("No location");

return null;

}

const geoUrl =
`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${process.env.WEATHER_KEY}`;

console.log("🌍 Geo API URL:", geoUrl);

const geoRes = await fetch(geoUrl);

const geoData = await geoRes.json();

console.log("📍 Geo API response:", geoData);


// FIX HERE

if(!geoData || geoData.length === 0){

console.log("Invalid location");

return null;

}


const lat = geoData[0].lat;
const lon = geoData[0].lon;


const weatherUrl =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`;


const weatherRes = await fetch(weatherUrl);

const data = await weatherRes.json();

console.log("🌤 Weather response:", data);


return {

condition:data.weather?.[0]?.main,
description:data.weather?.[0]?.description

};

}
catch(e){

console.log("Weather error:", e.message);

return null;

}

}
