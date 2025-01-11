import { useState, createContext, useContext } from 'react'
import './App.css'

const BulbContext = createContext();



function App() {
  const [bulbOn, setBulbOn] = useState(true);
  return <div>
    <BulbContext.Provider value={{
      bulbOn: bulbOn,
      setBulbOn: setBulbOn
    }}>
    <LightBulb />
    </BulbContext.Provider>
  </div>
}

function LightBulb() {
  

  return <div>
    <BulbState />
    <ToggleBulbState />
  </div>
}

function BulbState() {
  const {bulbOn} = useContext(BulbContext);
  return <div>
    {bulbOn ? "Bulb on" : "Bulb off"}
  </div>
}

function ToggleBulbState() {
  const {bulbOn, setBulbOn} = useContext(BulbContext);

  function toggle() {
    // setBulbOn(currentState => !currentState)
    setBulbOn(!bulbOn)
    
  }

  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>
}

export default App
