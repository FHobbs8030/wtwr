import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../blocks/App.css";
import { defaultClothingItems } from "../utils/clothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    // Populate clothing items on component mount
    setClothingItems(defaultClothingItems);
  }, []);

  const weatherData = {
    type: "hot",
    temperature: 88,
  };

  const handleAddClothes = () => {
    console.log("Open modal");
  };

  return (
    <>
      <Header onAddClothes={handleAddClothes} />
      <Main weatherData={weatherData} clothingItems={clothingItems} />
      <Footer />
    </>
  );
}

export default App;
