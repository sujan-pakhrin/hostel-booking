import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Hostels from "./components/hostel/Hostels";
import HomeMain from "./Pages/HomeMain";


function App() {

  return (
    <>
    <div className='flex justify-center item-center'>
      <div className='max-w-[1240px] w-full'>
      {/* <HomeMain/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      <Hostels/>
      </div>
    </div>

      
    </>
  )
}

export default App
