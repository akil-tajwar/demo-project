import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddClass from "../Pages/AddClass";
import AllClasses from "../Pages/AllClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <AddClass />
      },
      {
        path: '/allClasses',
        element: <AllClasses />
      },
    ],
  },
]);
