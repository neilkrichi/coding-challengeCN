import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import FavoritesPage from './pages/FavoritesPage';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-3xl mx-auto px-4 py-3">
              <div className="flex gap-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Posts
                </Link>
                <Link 
                  to="/favorites" 
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Favorites
                </Link>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
