import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect (function() {
    setInterval(function(){
      //setcount(count => count + 1);
      setCount(function(count) {
        return count  + 1;
      })
    }, 1000)
  }, []);

  function increaseCount(){
    setCount(count + 1)
  }

  function decreaseCount(){
    setCount(count -1)
  }

  function resetCount(){
    setCount(0)
  }

  return (
    <>
    <h1> {count} </h1>
    <button onClick={increaseCount}>increase</button>
    <button onClick={decreaseCount}>decrease</button>
    <button onClick={resetCount}>reset</button>
    </>
  )
}

export default App
