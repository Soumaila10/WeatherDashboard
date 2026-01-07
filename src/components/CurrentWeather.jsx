import React from 'react';
import { Cloud, CloudRain, CloudSun, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

const getWeatherIcon = (iconName) => {
    switch (iconName) {
        case 'sun': return <Sun className="w-24 h-24 text-yellow-400 animate-pulse-slow" />;
        case 'cloud-sun': return <CloudSun className="w-24 h-24 text-orange-400" />;
        case 'cloud-rain': return <CloudRain className="w-24 h-24 text-blue-400" />;
        case 'rain': return <CloudRain className="w-24 h-24 text-blue-600" />;
        case 'cloud': return <Cloud className="w-24 h-24 text-gray-400" />;
        default: return <Sun className="w-24 h-24 text-yellow-400" />;
    }
};

const CurrentWeather = ({ data }) => {
    const { current, name } = data;

    return (
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg border border-white/30 w-full max-w-md mx-auto transform transition-all hover:scale-105 duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold tracking-wider">{name}</h2>
                    <p className="text-lg opacity-80 mt-1">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-xl">
                    <span className="font-semibold px-2">Live</span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center my-8">
                <div className="drop-shadow-2xl filter">
                    {getWeatherIcon(current.icon)}
                </div>
                <h1 className="text-8xl font-black mt-4 tracking-tighter">{current.temp}°</h1>
                <p className="text-xl font-medium mt-2 capitalize">{current.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-black/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Wind className="w-6 h-6 mb-2 opacity-70" />
                    <span className="text-lg font-bold">{current.windSpeed} km/h</span>
                    <span className="text-xs opacity-60">Vent</span>
                </div>
                <div className="bg-black/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Droplets className="w-6 h-6 mb-2 opacity-70" />
                    <span className="text-lg font-bold">{current.humidity}%</span>
                    <span className="text-xs opacity-60">Humidité</span>
                </div>
                <div className="bg-black/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Thermometer className="w-6 h-6 mb-2 opacity-70" />
                    <span className="text-lg font-bold">{current.feelsLike}°</span>
                    <span className="text-xs opacity-60">Ressenti</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
