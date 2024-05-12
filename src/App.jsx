import React, { useState } from "react";
// import { VideoItems } from "./Youtube/VideoItems.jsx";
import Home from "./Youtube/Home.jsx";
import Header from "./Youtube/Components/Header.jsx";
import dotenv from 'dotenv';

dotenv.config();

function App() {
  return (
    <div>
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
