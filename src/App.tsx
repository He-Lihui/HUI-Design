import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItems";
import SubMenu from "./components/Menu/subMenu";
import Tab from "./components/Tabs/tab";
import TabItem from "./components/Tabs/tabItem";
import Icon from "./components/Icon/Icon";
import Transition from "./components/Transition/transition";
import { useState } from "react";
import Button from "./components/Button/button";
import Input from "./components/Input/input";
import Upload from "./components/upload/upload";
import Alert from "./components/Alert";
import React from "react";
function App() {
  const handleClose = () => {
    console.log('alert is close')
  }
  return (
    <div className="App">
      <header className="App-header">
        111
        <Alert message="message" onClose={handleClose} closable></Alert>
      </header>
    </div> 
  );
}

export default App;
