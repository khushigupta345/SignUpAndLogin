import { Route, Routes } from "react-router-dom"
import Login from "./component/login"
import SignupPage from "./component/SignupPage"
import { Home } from "./component/home"


function App() {
  

  return (
    <>
 

     <Routes>
      <Route path="/login" element={<Login/>} />

    <Route path="/" element={<Home/>} />

     </Routes>
       <Routes>
      <Route path="/signup" element={<SignupPage/>} />

    
     </Routes>
    </>
  )
}

export default App
