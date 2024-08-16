import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ChatRoom from "./components/chat/ChatRoom";
import Sidebar from "./components/chat/Sidebar";

/*
NOTES

# UI/UX
- scrollbar is not smooth, kinda glitches (ChatRoom.tsx)
- create notifications if a new message appears

## PERFORMANCE
- use memoization in firebase (possibly connected to scrollbar)
- other ways to reduce billing on firebase??

# GITHUB
- create testing with jest or something similar
- set up automatic deployment to sites live channel when PR is merged (maybe)

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
              {/* 100vh - 50px (size of navbar) - 1px (border bottom) - 44px (size of button) */}
              <div className="grid place-items-center min-h-[calc(100vh-95px)]">
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
              <div className="flex flex-col min-h-[calc(100vh-60px)]">
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
