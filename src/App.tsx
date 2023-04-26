import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItems";
import SubMenu from "./components/Menu/subMenu";
import Tab from "./components/Tabs/tab";
import TabItem from "./components/Tabs/tabItem";
import Icon from "./components/Icon/Icon";
import Transition from "./components/Transition/transition";
import { useState } from "react";
import Button from "./components/Button/button";
function App() {

  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon={"coffee"} theme={"danger"}></Icon>
        <Menu onSelect={ (index) => console.log(index)} defaultIndex="0" mode="horizontal">
          <MenuItem >Loem</MenuItem>
          <MenuItem  disabled>ipsum</MenuItem>
          <SubMenu title="111">
            <MenuItem >dolor</MenuItem>
            <MenuItem >dolor</MenuItem>
            <MenuItem >dolor</MenuItem>
          </SubMenu>
          <MenuItem >dolor</MenuItem>
        </Menu>
        <Menu onSelect={ (index) => console.log(index)} defaultIndex="0" mode='vartical' defaultOpen={['2']}>
          <MenuItem >Loem</MenuItem>
          <MenuItem  disabled>ipsum</MenuItem>
          <SubMenu title="111">
            <MenuItem >dolor</MenuItem>
            <MenuItem >dolor</MenuItem>
          </SubMenu>
          <MenuItem >dolor</MenuItem>
        </Menu>
        <Tab type='line' onSelect={(e) => {console.log(e)}}>
            <TabItem label="card1"> this is card 1</TabItem>
            <TabItem label="card2"> this is card 2</TabItem>
            <TabItem label="card3" disabled> this is card 3</TabItem>
        </Tab>
        <Button size="lg" btntype="default" onClick={ ()=> { setShow(!show)}}>Show</Button>
        <Transition
          in={show}
          animation="zoom-in-left"
          timeout={300}
        >
          <div>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, explicabo?</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
        </Transition>
        <Transition
          in={show}
          animation="zoom-in-left"
          timeout={300}
          wrapper
        >
         <Button> TEST</Button>
        </Transition>
      </header>
    </div> 
  );
}

export default App;
