import "./App.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import logo from "./assets/LogoNasa.png"
import Figure from "./components/Figure/Figure";

const App = () => {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [apod, setApod] = useState({});
  const [date, setDate] = useState(today);
  const NASA_URL = "https://api.nasa.gov/";
  const NASA_API_KEY = "TyIr0Wtz79BNzZrV10j4mwCn2fFZ1Vsq12esbecr";

  useEffect(() => {
    const getApod = async () => {
      const data = await axios.get(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      );
      setApod(data.data);
    };
    getApod();
  }, [date]);

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };

  return (
    <div className="App">
      <h2 className="title">
        NASA API <img src={logo} className="logo" alt="NASA LOGO" />
      </h2>
      <h1 >Astronomy Picture of the Day</h1>
      <input className="calendario" type="date" id="photo-date" onChange={handleInput} />
      {date > today ? (
        <h2>Please choose a previous date</h2>
      ) : (
        <Figure data={apod} />
      )}
      <div className="standard-dialog center">
        <h1 className="dialog-text">
          @lethamburn - 2022 -{" "}
          <a href="https://api.nasa.gov/">https://api.nasa.gov/</a>
        </h1>
      </div>
    </div>
  );
};

export default App;
