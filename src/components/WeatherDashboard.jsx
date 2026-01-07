
import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { getWeatherData } from "../services/weatherService";

const WeatherDashboard = () => {
  const [city, setCity] = useState("Paris");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(searchCity);
      setWeatherData(data);
    } catch (err) {
      setError("Impossible de récupérer les données météo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("Paris");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCity(searchTerm);
      fetchData(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-md relative mb-8">
        <input
          type="text"
          placeholder="Rechercher une ville (ex: Paris, London, New York)..."
          className="w-full h-12 rounded-full pl-12 pr-4 bg-white/20 backdrop-blur-md border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3 text-white/80 w-6 h-6" />
      </form>

      {/* Content */}
      <div className="w-full flex-1 flex flex-col items-center justify-start">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-white">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-lg">Chargement de la météo...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/80 backdrop-blur text-white p-4 rounded-xl shadow-lg border border-red-300">
            {error}
          </div>
        ) : weatherData ? (
          <>
            <CurrentWeather data={weatherData} />
            <Forecast data={weatherData} />
          </>
        ) : null}
      </div>

      <div className="mt-8 text-white/50 text-xs">
        Weather Dashboard • Premium Edition
      </div>
    </div>
  );
};

export default WeatherDashboard;
