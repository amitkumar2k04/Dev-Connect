import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Premium from "./components/premium"

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={ <Body/> }> 
          <Route path="/" element={ <Feed/> }/> 
          <Route path="/login" element={ <Login/> }/> 
          <Route path="/profile" element={ <Profile/> } />
          <Route path="/premium" element={ <Premium/> } />
          
          </Route>
        </Routes>
    </BrowserRouter>
    </Provider>

    {/* <NavBar/>
      <h1 className="text-red-500">Hello World</h1> */}
    </>
  )
}

export default App
