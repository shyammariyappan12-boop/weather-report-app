import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Weather Report Application</h1>
        <p>Search real-time city weather using OpenWeatherMap and Axios</p>
      </header>

      <main className="app-main">
        <WeatherCard />
      </main>

      <footer className="app-footer">
        <p>Built with React, Axios, and OpenWeatherMap API</p>
      </footer>
    </div>
  );
}

export default App;