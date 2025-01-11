import { useState } from 'react'
import './App.css'

function useCounter() {
  const [count, setCount] = useState(0)

  function increaseCount() {
    setCount(count + 1)
  }

  return {
    count, // shorthand for count: count
    increaseCount
  }
}

function App(){

  return (
    <div>
      <Counter />
      <br/>
      <Counter />
      <br/>
      <Counter />
      <Counter />
    </div>
  )
}

function Counter() {
  const { count, increaseCount } = useCounter(); // Correctly destructuring the returned object

  return (
    <>
      <button onClick={increaseCount}>Increase {count}</button>
    </>
  )
}

export default App
