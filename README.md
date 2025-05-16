# 👗 What to Wear (WTWR)

## 📖 Description

What to Wear (WTWR) is a sleek, weather-based clothing recommendation app that removes the guesswork from your daily outfit decisions. It fetches real-time weather data for your selected location and provides smart temperature-based clothing suggestions. Whether it's a hot day that calls for a t-shirt or a chilly evening that demands a jacket, WTWR helps you make the right call.

## ✨ Key Features

🌤️ Real-time weather updates for your city

🧥 Smart clothing recommendations based on temperature

🃏 Interactive clothing item cards

🔍 Modal popups for detailed item views

🧭 Clean, responsive UI for an intuitive experience

## 🛠️ Technologies Used

💻 Frontend
React (v18.2.0) – Library for building modern, component-based user interfaces

Vite (v6.3.5) – Blazing-fast development server and build tool

normalize.css (v8.0.1) – CSS reset to ensure visual consistency across browsers

🧰 Development Tools
gh-pages (v6.1.1) – Simplifies deployment to GitHub Pages

@vitejs/plugin-react (v4.1.0) – Enables React Fast Refresh and JSX support for Vite

🌐 APIs
OpenWeatherMap API – Supplies current weather data by city name to power outfit suggestions

## 📸 Screenshots
<!-- Add screenshots of your UI here --> <!-- Example: ![WTWR Dashboard Screenshot](./images/screenshot1.png) -->

## 🎥 Demo Video
<!-- Add a hosted video link here --> <!-- Example: [Watch the Demo](https://your-video-link.com) -->

## 🔐 Environment Variables

To run this project, you'll need to add the following environment variables to your .env file:

`REACT_APP_API_KEY` - Your OpenWeatherMap API key
`REACT_APP_WEATHER_URL` - OpenWeatherMap API base URL

## 📦 Setup Instructions

1. Clone the repository:

```bash
   git clone https://github.com/your-username/your-repo-name.git
```

2.Create a .env file at the root level:

```bash
   touch .env

3. Copy contents from .env.example:

   ```bash
   cp .env.example .env
   ...

4. Replace the placeholder value with your OpenWeatherMap API key in the .env file

5. Ensure .env is listed in your .gitignore file to keep your key safe:

   ```bash
   echo ".env" >> .gitignore
   ...
