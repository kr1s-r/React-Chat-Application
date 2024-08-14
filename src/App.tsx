import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ChatRoom from "./components/Chat/ChatRoom";
import Sidebar from "./components/Chat/Sidebar";

/*
NOTES
- scrollbar is not smooth, kinda glitches (ChatRoom.tsx)
- create notifications if a new message appears
*/

function App() {
  // router as an object
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet /> {/* displays children */}
        </>
      ),
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              {/* 100vh - 50px (size of navbar) - 1px (border bottom) */}
              <div className="grid place-items-center min-h-[calc(100vh-51px)]">
                <Login />
              </div>
            </PrivateRoute>
          ),
        },
        {
          path: "/chat",
          element: (
            <PrivateRoute>
              {/* 100vh - 50px (size of navbar) - 1px (border bottom) */}
              <div className="flex flex-col min-h-[calc(100vh-51px)]">
                <div className="flex">
                  <Sidebar />
                  <ChatRoom />
                </div>
              </div>
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  /***** can also do this (using JSX): *****/
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Navbar />} errorElement={<div>404 Error</div>}>
  //       <Route index element={<Login />} />
  //       <Route path="/chat" element={<Chat />} />
  //     </Route>
  //   )
  // )
  /*****************************************/

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
