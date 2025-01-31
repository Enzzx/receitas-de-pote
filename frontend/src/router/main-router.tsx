import { createBrowserRouter } from "react-router-dom";
// PAGES
import App from "../App.tsx"
import List from "../pages/list.tsx"
import News from "../pages/news.tsx"
import Home from "../pages/home.tsx"
import Account from "../pages/account.tsx";
import About from "../pages/about.tsx"
import LogIn from "../pages/log-in.tsx";
import SignIn from "../pages/sign-in.tsx";
//SUBPAGES
import ProfileSubPage from "../pages/subpages/profile-subpage.tsx";
import RecipesSubPage from "../pages/subpages/recipes-subpage.tsx";
import NewsSubPage from "../pages/subpages/news-subpage.tsx";


export const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/list", element: <List /> },
            { path: "/news", element: <News /> },
            { path: "/", element: <Home /> },
            {
                path: "account",
                element: <Account />,
                children: [
                    { path: "", element: <ProfileSubPage />},
                    { path: "recipes", element: <RecipesSubPage /> },
                    { path: "news", element: <NewsSubPage /> }
                ]
            },
            { path: "/about", element: <About /> },
            { path: "/login", element: <LogIn /> },
            { path: "/signin", element: <SignIn /> }
        ]
    }
])