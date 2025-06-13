import '../blocks/WeatherCard.css';
import { getBackgroundImage } from '../utils/getBackgroundImage'; 

function WeatherCard({ weatherData, isCelsius }) {
  const rawTemp = weatherData?.temp ?? null;
  const condition = weatherData?.condition ?? '';
  const timestamp = weatherData?.dt;
  const sunrise = weatherData?.sys?.sunrise;
  const sunset = weatherData?.sys?.sunset;

  const backgroundImage = getBackgroundImage(condition, timestamp, sunrise, sunset);

  if (rawTemp === null || !backgroundImage) {
    return (
      <section className="weather-card">
        <p className="weather-card__temp">--</p>
      </section>
    );
  }

  const displayTemp = isCelsius
    ? Math.round((rawTemp - 32) * 5 / 9)
    : Math.round(rawTemp);

  const unit = isCelsius ? '°C' : '°F';

  const cardStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <section className="weather-card" style={cardStyle}>
      <p className="weather-card__temp">{displayTemp}{unit}</p>
    </section>
  );
}

export default WeatherCard;