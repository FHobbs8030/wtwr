import sunnyDay from "../images/sunny-day.jpg";
import clearNight from "../images/clear-night.jpg";
import rainyDay from "../images/rainy-day.jpg";
import rainyNight from "../images/rainy-night.jpg";
import snowyDay from "../images/snowy-day.jpg";
import snowyNight from "../images/snowy-night.jpg";
import defaultBackground from "../images/default.jpg";

export function getBackgroundImage(condition, timestamp, sunrise, sunset) {
  const isDay = timestamp >= sunrise && timestamp < sunset;
  const backgrounds = {
    Clear: {
      day: sunnyDay,
      night: clearNight,
    },
    Rain: {
      day: rainyDay,
      night: rainyNight,
    },
    Snow: {
      day: snowyDay,
      night: snowyNight,
    },
  };

  return (
    backgrounds[condition]?.[isDay ? "day" : "night"] || defaultBackground
  );
}

