import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx"
import List from "../pages/list.tsx"
import News from "../pages/news.tsx"
import Home from "../pages/home.tsx"
import Profile from "../pages/profile.tsx"
import About from "../pages/about.tsx"

export const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/list", element: <List /> },
            { path: "/news", element: <News /> },
            { path: "/", element: <Home /> },
            { path: "/profile", element: <Profile /> },
            { path: "/about", element: <About /> }
        ]
    }
])