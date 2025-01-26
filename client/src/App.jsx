import AuthOtp from "./components/auth/AuthOtp";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/global/Navbar";
import Hostels from "./components/hostel/Hostels";
import ListPage from "./components/list/ListPage";
import SinglePage from "./components/list/SinglePage";
import Map from "./components/map/Map";
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
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/list/:id",
          element: <SinglePage />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/otp-verification",
      element: <AuthOtp />,
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
