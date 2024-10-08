
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NotFound from '../pages/NotFound/NotFound.jsx';


const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage.jsx'));

const Navigation = lazy(() => import('./components/Navigation/Navigation.jsx'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'));



function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />}  />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default App;
