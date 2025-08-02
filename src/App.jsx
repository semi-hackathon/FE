import LoginLayout from './layout/LoginLayout';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PopularPage from './pages/PopularPage';
import RecommendPage from './pages/RecommendPage';
import FavoritesPage from './pages/FavoritesPage';
import Survey from './pages/Survey';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Survey/>,
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/popular", element: <PopularPage /> },
      { path: "/recommend", element: <RecommendPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: '/homepage', element: <HomePage /> },
      { path: '/popular', element: <PopularPage /> },
      { path: '/recommend', element: <RecommendPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
    ],
  },
  {
    element: <LoginLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <LoginLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
