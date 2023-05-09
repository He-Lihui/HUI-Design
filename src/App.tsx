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
function App() {

  return (
    <div className="App">
      <header className="App-header">
       <Input prefixes="123"icon={"search"}></Input>
       <Input suffixes="456" size="lg" placeholder="1233"></Input>
       <Input size="sm"></Input>
      </header>
    </div> 
  );
}

export default App;
