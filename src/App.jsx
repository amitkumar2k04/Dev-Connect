import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"

function App() {
  return (
    <>
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={ <Body/> }> 
          <Route path="/login" element={ <Login/> }/> 
          <Route path="/profile" element={ <Profile/> } /> 

          </Route>
        </Routes>
    </BrowserRouter>

    {/* <NavBar/>
      <h1 className="text-red-500">Hello World</h1> */}
    </>
  )
}

export default App
