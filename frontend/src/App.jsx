import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RegisterWallet from "./components/RegisterWallet";
import Claim from "./components/Claim";
import GeneralPage from "./pages/GeneralPage";
import { AppKitProvider } from "./components/AppKit";
import { NavLinkProvider } from "./components/NavLinkContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <GeneralPage />,
    children: [
      {
        index: true, // This makes it the default child route at "/"
        element: <Navigate to="/connect-wallet" replace />,
      },
      {
        path: "/connect-wallet", element: <RegisterWallet />,
      },
      {
        path: "/claim", element: <Claim />
      }
    ]
  }
])

function App() {

  return (
    <AppKitProvider>
      <NavLinkProvider>
        <RouterProvider router={router} />
      </NavLinkProvider>
    </AppKitProvider>
  )
}

export default App
