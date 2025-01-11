import { useState } from "react"

function App() {
  const [showTime, setShowTime] = useState(true)
  return (
    <div style={{display:"flex", margin:"20px", background: "gray"}}>
      <Card children={<div>Hi there</div>} />
      <Card children={<div style={{color:"green", padding:"20px", margin:"20px"}}>What do you want to post <br/> <br/>
      <input type={"text"}/>
      </div>} />

    </div>
  )
}

function Card({children}) {
  return <div style={{background: "white", borderRadius:10, color: "black", padding:10, margin:10}}>
    {children}
  </div>
}
export default App
