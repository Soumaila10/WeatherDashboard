
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const MOCK_DATA = {
  paris: {
    current: {
      temp: 18,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      feelsLike: 17,
      description: "partiellement nuageux",
      icon: "cloud-sun",
    },
    forecast: [
      { day: "Demain", temp: 20, icon: "sun", condition: "Ensoleillé" },
      { day: "Mercredi", temp: 19, icon: "cloud-rain", condition: "Averses" },
      { day: "Jeudi", temp: 17, icon: "cloud", condition: "Nuageux" },
      { day: "Vendredi", temp: 22, icon: "sun", condition: "Grand soleil" },
      { day: "Samedi", temp: 21, icon: "cloud-sun", condition: "Éclaircies" },
    ],
  },
  default: {
    current: {
      temp: 20,
      condition: "Clear",
      humidity: 50,
      windSpeed: 10,
      feelsLike: 20,
      description: "Simulation: Clé API manquante",
      icon: "sun",
    },
    forecast: [
      { day: "Demain", temp: 21, icon: "sun", condition: "Beau" },
      { day: "J+2", temp: 22, icon: "cloud-sun", condition: "Variable" },
      { day: "J+3", temp: 19, icon: "cloud", condition: "Nuageux" },
      { day: "J+4", temp: 20, icon: "rain", condition: "Pluvieux" },
      { day: "J+5", temp: 22, icon: "sun", condition: "Ensoleillé" },
    ],
  },
};

const mapApiIconToInternal = (apiIcon) => {
  // OpenWeatherMap icons mapping
  if (apiIcon.startsWith('01')) return 'sun';
  if (apiIcon.startsWith('02')) return 'cloud-sun';
  if (apiIcon.startsWith('03') || apiIcon.startsWith('04')) return 'cloud';
  if (apiIcon.startsWith('09') || apiIcon.startsWith('10')) return 'rain';
  if (apiIcon.startsWith('11')) return 'rain';
  if (apiIcon.startsWith('13')) return 'cloud'; // snow
  if (apiIcon.startsWith('50')) return 'cloud'; // mist
  return 'sun';
}

const formatForecast = (list) => {
  // OpenWeatherMap returns 3-hour steps. We want daily. 
  // We take one entry per day (around noon).
  const dailyData = list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

  return dailyData.map(item => ({
    day: new Date(item.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'long' }),
    temp: Math.round(item.main.temp),
    icon: mapApiIconToInternal(item.weather[0].icon),
    condition: item.weather[0].description
  }));
};

export const getWeatherData = async (city) => {
  // If no API key or placeholder, fallback to Mock
  if (!API_KEY || API_KEY === 'votre_cle_api_ici') {
    console.warn("Using mock data because no API key was provided.");
    await new Promise(r => setTimeout(r, 500));
    const normalizedCity = city.toLowerCase();
    const mock = MOCK_DATA[normalizedCity] || MOCK_DATA.default;
    return {
      name: city.charAt(0).toUpperCase() + city.slice(1),
      ...mock
    };
  }

  try {
    // 1. Get Current Weather
    const currentRes = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`);
    if (!currentRes.ok) throw new Error("City not found");
    const currentData = await currentRes.json();

    // 2. Get Forecast
    const forecastRes = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`);
    if (!forecastRes.ok) throw new Error("Forecast not found");
    const forecastData = await forecastRes.json();

    return {
      name: currentData.name,
      current: {
        temp: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // m/s to km/h
        feelsLike: Math.round(currentData.main.feels_like),
        description: currentData.weather[0].description,
        icon: mapApiIconToInternal(currentData.weather[0].icon)
      },
      forecast: formatForecast(forecastData.list)
    };

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
