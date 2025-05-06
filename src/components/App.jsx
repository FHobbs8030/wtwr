import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../blocks/App.css";

function App() {
  const handleAddClothes = () => {
    console.log("Open modal");
  };

  const weatherData = {
    type: "hot",
    temperature: 88,
  };

  const clothingItems = [
    { _id: "1", name: "T-shirt", weather: "hot" },
    { _id: "2", name: "Sweater", weather: "cold" },
  ];

  return (
    <>
      <Header onAddClothes={handleAddClothes} />
      <Main weatherData={weatherData} clothingItems={clothingItems} />
      <Footer />
    </>
  );
}

export default App;
