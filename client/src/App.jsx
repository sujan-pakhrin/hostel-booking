import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/global/Navbar";
import Hostels from "./components/hostel/Hostels";
import HomeMain from "./Pages/HomeMain";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const Client = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Client />,
      children: [
        {
          path: "/",
          element: <HomeMain />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1240px] w-full">
        <RouterProvider router={route} />
      </div>
    </div>
  );
}

export default App;
