import { Routes, Route, useRoutes, Outlet } from 'react-router-dom';
import Login from './Page/authentification/Login';
import Acceuil from './Page/Acceuil/Acceuil';
import Confirm from './Page/authentification/Confirm';
import LoginWith from './Page/authentification/LoginWith';
import Register from './Page/authentification/Register';
import ProtectedRoute from './routes/ProtectedRoute';
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <ProtectedRoute element={<Outlet />} />,
      children: [
        {
          path: "acceuil/*",
          element: <Acceuil />,
        }
      ],
    },
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "LoginWith",
          element: <LoginWith />,
        },
        {
          path: "confirm",
          element: <Outlet />,
          children: [
            {
              path: ":tokenConfirm",
              element: <Confirm />
            }
          ]
        },
        {
          path: "LoginWith",
          element: <Outlet />,
          children: [
            {
              path: ":AppID",
              element: <LoginWith />
            }
          ]
        }
      ]
    },
  ]);
  return element;
}
export default App;
