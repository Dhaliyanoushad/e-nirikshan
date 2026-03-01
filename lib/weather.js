export async function getWeather(location) {
  if (!location) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${process.env.WEATHER_KEY}`;
    const geoRes = await fetch(geoUrl, { signal: controller.signal });
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) return null;

    const { lat, lon } = geoData[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`;
    const weatherRes = await fetch(weatherUrl, { signal: controller.signal });
    const data = await weatherRes.json();
    
    clearTimeout(timeout);

    return {
      condition: data.weather?.[0]?.main,
      description: data.weather?.[0]?.description
    };
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("Weather error:", error.message);
    }
    return null;
  }
}
