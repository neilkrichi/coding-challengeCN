import { useContext } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { PostContext, PostContextType } from '../context/PostContext';
import { BlogPost } from '../types/types';

const FavoritesPage = () => {
  const { posts, handleToggleFavorite, handleTagClick } = useContext<PostContextType>(PostContext);
  const favoritedPosts = posts.filter((post: BlogPost) => post.isFavorited);

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8">
      <header className="max-w-3xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Favorite Posts</h1>
      </header>
      <main>
        <div className="max-w-3xl mx-auto px-4">
          {favoritedPosts.length === 0 ? (
            <p className="text-center text-gray-500">No favorite posts yet</p>
          ) : (
            favoritedPosts.map((post: BlogPost) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onToggleFavorite={handleToggleFavorite}
                onTagClick={handleTagClick}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage; 