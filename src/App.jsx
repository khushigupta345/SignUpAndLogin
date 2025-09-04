import { Route, Routes } from "react-router-dom"
// import Login from "./component/login"
// import SignupPage from "./component/SignupPage"
import { Home } from "./component/home"
import BulkOrderForm1 from "./component/BulkOrderForm1"
import Hello from "./hello"




function App() {
  

  return (
    <>


     {/* <Routes>
      <Route path="/login" element={<Login/>} />

    <Route path="/" element={<Home/>} />

     </Routes>
       <Routes>
      <Route path="/signup" element={<SignupPage/>} />

    
     </Routes> */}
     <BulkOrderForm1 />
     {/* <Hello /> */}
    </>
  )
}

export default App
