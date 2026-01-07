
import React from 'react';
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';

const getSmallIcon = (iconName) => {
    const props = { className: "w-8 h-8 mb-2" };
    switch (iconName) {
        case 'sun': return <Sun {...props} className={props.className + " text-yellow-400"} />;
        case 'cloud-sun': return <CloudSun {...props} className={props.className + " text-orange-400"} />;
        case 'cloud-rain': return <CloudRain {...props} className={props.className + " text-blue-400"} />;
        case 'rain': return <CloudRain {...props} className={props.className + " text-blue-600"} />;
        default: return <Cloud {...props} className={props.className + " text-gray-300"} />;
    }
};

const Forecast = ({ data }) => {
    return (
        <div className="w-full max-w-md mx-auto mt-6">
            <h3 className="text-white text-lg font-semibold mb-3 ml-2">Prévisions 5 jours</h3>
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30 text-white flex justify-between overflow-x-auto gap-4 custom-scrollbar">
                {data.forecast.map((day, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[70px] p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-sm font-medium mb-1">{day.day}</span>
                        {getSmallIcon(day.icon)}
                        <span className="text-lg font-bold">{day.temp}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
