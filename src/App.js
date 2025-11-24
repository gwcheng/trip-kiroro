import React, { useState, useEffect } from "react";
import {
  Plane,
  Bus,
  Snowflake,
  MapPin,
  Calendar,
  Clock,
  Hotel,
  Coffee,
  ArrowRight,
  Mountain,
  Home,
  Wind,
  Thermometer,
} from "lucide-react";

// 行程資料結構
const itineraryData = [
  {
    day: 1,
    date: "2026.3.4 (三)",
    title: "出發 & 前往小樽",
    highlight: "新千歲空港 -> 小樽",
    events: [
      {
        time: "05:00",
        icon: <Home className="w-4 h-4" />,
        title: "集合：星都心社區大門",
      },
      {
        time: "05:30",
        icon: <Home className="w-4 h-4" />,
        title: "集合：食品工業發展研究所門口",
      },
      {
        time: "05:35",
        icon: <Home className="w-4 h-4" />,
        title: "集合：富宇文匯社區大門",
      },
      {
        time: "08:35",
        icon: <Plane className="w-4 h-4" />,
        title: "華航 CI130 起飛",
        desc: "桃機二航廈 -> 13:10 抵達新千歲",
      },
      {
        time: "14:50",
        icon: <Bus className="w-4 h-4" />,
        title: "搭乘 JR 快速エアポート",
        desc: "新千歲 -> 16:04 抵達小樽車站",
      },
      {
        time: "Check-in",
        icon: <Hotel className="w-4 h-4" />,
        title: "入住 OMO5 Otaru",
        mapLink:
          "https://maps.app.goo.gl/XHJooktCgHEUQgXu7?g_st=com.google.maps.preview.copy",
      },
    ],
  },
  {
    day: 2,
    date: "2026.3.5 (四)",
    title: "移動至 Kiroro 滑雪渡假村",
    highlight: "開始滑雪行程",
    events: [
      {
        time: "08:25",
        icon: <Bus className="w-4 h-4" />,
        title: "巴士出發",
        desc: "From OMO5 Otaru (車資 2000JPY)",
      },
      {
        time: "09:35",
        icon: <MapPin className="w-4 h-4" />,
        title: "抵達 Club Med Kiroro Grand",
      },
      {
        time: "AM/PM",
        icon: <Snowflake className="w-4 h-4" />,
        title: "整裝、租借器材、滑雪",
      },
      {
        time: "Stay",
        icon: <Hotel className="w-4 h-4" />,
        title: "宿 Club Med Kiroro Grand",
      },
    ],
  },
  {
    day: 3,
    date: "2026.3.6 (五)",
    title: "Kiroro 全日滑雪",
    highlight: "Powder Snow Day",
    events: [
      {
        time: "All Day",
        icon: <Snowflake className="w-4 h-4" />,
        title: "全日滑雪活動",
      },
      {
        time: "Relax",
        icon: <Coffee className="w-4 h-4" />,
        title: "度假村設施 / 溫泉",
      },
      {
        time: "Stay",
        icon: <Hotel className="w-4 h-4" />,
        title: "宿 Club Med Kiroro Grand",
      },
    ],
  },
  {
    day: 4,
    date: "2026.3.7 (六)",
    title: "Kiroro 全日滑雪",
    highlight: "Enjoy the Slopes",
    events: [
      {
        time: "All Day",
        icon: <Snowflake className="w-4 h-4" />,
        title: "全日滑雪活動",
      },
      {
        time: "Stay",
        icon: <Hotel className="w-4 h-4" />,
        title: "宿 Club Med Kiroro Grand",
      },
    ],
  },
  {
    day: 5,
    date: "2026.3.8 (日)",
    title: "滑雪半日 & 移動至札幌",
    highlight: "滑雪至 15:00 -> 札幌成吉思汗",
    events: [
      {
        time: "Morning",
        icon: <Coffee className="w-4 h-4" />,
        title: "早餐後先退房 (寄放行李)",
      },
      {
        time: "15:00",
        icon: <Snowflake className="w-4 h-4" />,
        title: "結束滑雪",
      },
      {
        time: "16:15",
        icon: <Bus className="w-4 h-4" />,
        title: "巴士出發往札幌",
        desc: "車資 2500JPY",
      },
      {
        time: "18:30",
        icon: <Hotel className="w-4 h-4" />,
        title: "抵達 Sapporo Excel Hotel Tokyu",
        mapLink:
          "https://maps.app.goo.gl/Vz2DwSEimPqwApNq8?g_st=com.google.maps.preview.copy",
      },
      {
        time: "Dinner",
        icon: <Coffee className="w-4 h-4" />,
        title: "晚餐：成吉思汗燒肉",
        mapLink: "https://maps.app.goo.gl/j7mGAMryivxvYdf38?g_st=ipc",
      },
    ],
  },
  {
    day: 6,
    date: "2026.3.9 (一)",
    title: "返台",
    highlight: "札幌 -> 甜蜜的家",
    events: [
      {
        time: "Morning",
        icon: <Coffee className="w-4 h-4" />,
        title: "自由活動 / 前往機場",
      },
      {
        time: "14:40",
        icon: <Plane className="w-4 h-4" />,
        title: "華航 CI131 起飛",
        desc: "新千歲 -> 18:20 抵達桃機二航廈",
      },
    ],
  },
];

// 模擬天氣數據生成器
const generateMockWeatherData = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }

  return dates.map((date, index) => ({
    date: date,
    temp: -2 - Math.floor(Math.random() * 8), // -2 到 -10
    snowfall: index === 0 ? 15 : Math.floor(Math.random() * 30), // 隨機降雪 cm
    wind: Math.floor(Math.random() * 20) + 5, // 風速
    condition: Math.random() > 0.3 ? "Powder Snow" : "Cloudy",
    base: 240 + Math.floor(Math.random() * 20), // 積雪深度
  }));
};

// 主要 App 元件
export default function KiroroSkiApp() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [weatherData, setWeatherData] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [daysUntilTrip, setDaysUntilTrip] = useState(0);

  // 初始化計算倒數日
  useEffect(() => {
    const targetDate = new Date("2026-03-04T00:00:00");
    const now = new Date();
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilTrip(diffDays);
  }, []);

  // 模擬獲取天氣資料
  const fetchWeather = () => {
    setLoadingWeather(true);
    // 模擬 API 延遲
    setTimeout(() => {
      setWeatherData(generateMockWeatherData());
      setLoadingWeather(false);
    }, 1200);
  };

  useEffect(() => {
    if (activeTab === "weather") {
      fetchWeather();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 pb-12 rounded-b-3xl shadow-lg shrink-0 z-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              2026 Kiroro 滑雪行
            </h1>
            <p className="text-cyan-100 text-sm mt-1">Hokkaido, Japan</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
            <span className="text-xs font-semibold">Day 1-6</span>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-cyan-200" />
          </div>
          <div>
            <p className="text-xs text-cyan-200 uppercase tracking-wider">
              倒數計時
            </p>
            <p className="text-xl font-bold">
              {daysUntilTrip > 0 ? `${daysUntilTrip} 天` : "旅程中 / 已結束"}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto -mt-6 px-4 pb-20 z-20">
        {/* 行程 Tab */}
        {activeTab === "itinerary" && (
          <div className="space-y-4">
            {itineraryData.map((day) => (
              <div
                key={day.day}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-700">{day.date}</span>
                  <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                    Day {day.day}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    {day.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{day.highlight}</p>

                  <div className="space-y-4 relative pl-2">
                    {/* Timeline Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

                    {day.events.map((event, idx) => (
                      <div key={idx} className="flex items-start relative z-10">
                        <div className="bg-white border-2 border-cyan-500 rounded-full p-1 w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                          {React.cloneElement(event.icon, {
                            className: "w-3 h-3 text-cyan-600",
                          })}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-baseline">
                            <p className="text-sm font-semibold text-slate-800">
                              {event.title}
                            </p>
                            <span className="text-xs font-mono text-slate-400 shrink-0 ml-2">
                              {event.time}
                            </span>
                          </div>
                          {event.desc && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              {event.desc}
                            </p>
                          )}
                          {event.mapLink && (
                            <a
                              href={event.mapLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center mt-2 text-xs text-blue-500 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded transition-colors"
                            >
                              <MapPin className="w-3 h-3 mr-1" /> 開啟地圖導航
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 天氣 Tab */}
        {activeTab === "weather" && (
          <div className="space-y-4 pt-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold flex items-center">
                  <Snowflake className="w-6 h-6 mr-2 animate-pulse" />
                  Kiroro 雪況報告
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  目前顯示為模擬數據 (供測試)
                </p>

                <div className="mt-6 flex justify-between text-center">
                  <div>
                    <p className="text-blue-200 text-xs">積雪深度</p>
                    <p className="text-3xl font-bold">
                      260<span className="text-sm">cm</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">24h 降雪</p>
                    <p className="text-3xl font-bold">
                      15<span className="text-sm">cm</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">山頂溫度</p>
                    <p className="text-3xl font-bold">
                      -8<span className="text-sm">°C</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Background Decoration */}
              <Snowflake className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
            </div>

            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-700">過去 5 日紀錄</h3>
              <button
                onClick={fetchWeather}
                className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1 rounded-full transition-colors"
              >
                {loadingWeather ? "更新中..." : "重新整理"}
              </button>
            </div>

            {loadingWeather ? (
              <div className="p-8 text-center text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p>連線至氣象站...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {weatherData.map((day, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-lg border border-slate-100 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {day.date}
                        </p>
                        <p className="text-xs text-slate-400">
                          {day.condition}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-right">
                      <div>
                        <div className="flex items-center text-xs text-slate-500">
                          <Snowflake className="w-3 h-3 mr-1" />
                          {day.snowfall}cm
                        </div>
                        <div className="flex items-center text-xs text-slate-500">
                          <Thermometer className="w-3 h-3 mr-1" />
                          {day.temp}°C
                        </div>
                      </div>
                      <div className="w-1 h-8 bg-slate-100 rounded-full relative">
                        {/* Visual Bar for Snowfall */}
                        <div
                          className="absolute bottom-0 w-full bg-blue-400 rounded-full"
                          style={{
                            height: `${Math.min(day.snowfall * 3, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 住宿資訊 Tab */}
        {activeTab === "hotels" && (
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-slate-700 px-1">本次住宿清單</h3>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src="/api/placeholder/400/200"
                alt="OMO5 Otaru"
                className="w-full h-32 object-cover bg-gray-200"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg">OMO5 Otaru</h4>
                <p className="text-xs text-slate-500 mb-3">Day 1 (3/4)</p>
                <a
                  href="https://maps.app.goo.gl/XHJooktCgHEUQgXu7?g_st=com.google.maps.preview.copy"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full block text-center bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200"
                >
                  Google Map 導航
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <div className="bg-red-600 h-32 flex items-center justify-center text-white font-bold text-xl tracking-widest">
                CLUB MED
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg">Club Med Kiroro Grand</h4>
                <p className="text-xs text-slate-500 mb-3">
                  Day 2-4 (3/5 - 3/7)
                </p>
                <button className="w-full block text-center bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200">
                  度假村詳情
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src="/api/placeholder/400/200"
                alt="Sapporo Excel Hotel"
                className="w-full h-32 object-cover bg-gray-200"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg">Sapporo Excel Hotel Tokyu</h4>
                <p className="text-xs text-slate-500 mb-3">Day 5 (3/8)</p>
                <a
                  href="https://maps.app.goo.gl/Vz2DwSEimPqwApNq8?g_st=com.google.maps.preview.copy"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full block text-center bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200"
                >
                  Google Map 導航
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200 shrink-0 z-30 pb-safe">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "itinerary" ? "text-cyan-600" : "text-slate-400"
            }`}
          >
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">行程</span>
          </button>

          <button
            onClick={() => setActiveTab("weather")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "weather" ? "text-cyan-600" : "text-slate-400"
            }`}
          >
            <Snowflake className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">雪況</span>
          </button>

          <button
            onClick={() => setActiveTab("hotels")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "hotels" ? "text-cyan-600" : "text-slate-400"
            }`}
          >
            <Hotel className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">住宿</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
