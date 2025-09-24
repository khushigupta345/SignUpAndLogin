import { Route, Routes } from "react-router-dom"
// import Login from "./component/login"
// import SignupPage from "./component/SignupPage"
// import { Home } from "./component/home"
import BulkOrderForm3 from "./component/BulkOrderForm3"
import BulkOrderForm from "./component/BulkOrderForm"
import Finishes from "./component/finishes"
import BulkOrderForm2 from "./component/BulkOrderForm2"
import FinishDetails from "./component/finishDetails"
import { Home } from "./component/home"

import Navbar from "./component/Navbar"
// import QuarryForm from "./component/QuarryForm (2)"

// import QuarryForm from "./component/QuarryForm"
// import Hello from "./hello"
// import QuarryDashboard from "./component/QuarryDashboard"
// import QuarryForm from "./component/QuarryForm"




function App() {


  return (
    <>


      {/* <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/finishes" element={<Finishes />} />
        <Route path="/finishes/:id" element={<FinishDetails />} />

      </Routes> */}
      {/* <BulkOrderForm3 /> */}
      {/* <Hello /> */}
      {/* <QuarryForm /> */}
      {/* <BulkOrderForm />    */}
      {/* <BulkOrderForm2 /> */}

      {/* <Finishes /> */}
      {/* <GetLayoutedElements /> */}
      <Navbar />
    </>
  )
}

export default App
