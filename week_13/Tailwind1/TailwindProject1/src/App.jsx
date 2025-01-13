import './App.css'
import { Button } from './component/Buttons'
import { Input } from './component/Input'
import { Otp } from './component/Otp'
function App() {

  return (
    <div className='h-screen bg-blue-700'>
      <br/> <br/> <br/>
      <Input type="text" placeholder={"Username"}></Input>
      <Button disabled={true}>Sign Up</Button>
      <br /> <br /> <br /> <br /> <br />
      <Otp number={20}/>
    </div>
  )
}

export default App
