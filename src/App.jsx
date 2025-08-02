import LoginLayout from './layout/LoginLayout';
import MainLayout from './layout/MainLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RecommendPage from './pages/RecommendPage';
import FavoritesPage from './pages/FavoritesPage';
import Survey from './pages/Survey';
import LoginPage from './pages/LoginPage';
import Find from './pages/Find';
import AnimationPage from './pages/AnimationPage';
import MoviePage from './pages/MoviePage';
import { SearchProvider } from './contexts/SearchContext'; // [추가]


const router = createBrowserRouter([
  {
    element: <Survey />,
    children: [{ path: '/survey' }],
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <RecommendPage /> },
      { path: '/recommend', element: <RecommendPage /> },
      { path: '/animation', element: <AnimationPage /> },
      { path: '/movie', element: <MoviePage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/find', element: <Find /> },
    ],
  },
  {
    element: <LoginLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
]);
const App = () => {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
};

export default App;
