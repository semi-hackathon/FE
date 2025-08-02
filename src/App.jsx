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
import DetailPage from './pages/DetailPage';
import { SearchProvider } from './contexts/SearchContext'; // [추가]
import CallbackPage from './pages/CallbackPage';
import Redirection from './pages/Redirection';
const router = createBrowserRouter([
  {
    path: '/survey',
    element: <Survey />,
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <RecommendPage /> },
      { path: '/recommend', element: <RecommendPage /> },
      { path: '/animation', element: <AnimationPage /> },
      { path: '/movie', element: <MoviePage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/:type/:id', element: <DetailPage /> },
      { path: '/find', element: <Find /> },
    ],
  },
  {
    element: <LoginLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/callback', element: <Redirection /> },
    ],
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
