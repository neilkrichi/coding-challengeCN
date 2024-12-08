import { createContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost } from '../types/types';

export interface PostContextType {
  posts: BlogPost[];
  activeTags: string[];
  handleToggleFavorite: (id: number) => void;
  handleTagClick: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
}

// Create context with default values
export const PostContext = createContext<PostContextType>({
  posts: [],
  activeTags: [],
  handleToggleFavorite: () => {},
  handleTagClick: () => {},
  handleRemoveTag: () => {},
});

export const PostProvider = ({ children }: { children: ReactNode }) => {

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const beeceptorUrl = 'https://cnblog.proxy.beeceptor.com/posts';

  // Fetch posts from API and merge with locally stored favorites
  const fetchPosts = async () => {
    try {
      const response = await fetch(beeceptorUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      // Get previously favorited posts from localStorage
      const savedFavorites = localStorage.getItem('favorites');
      const favoriteIds = savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
      
      // Merge API data with favorite status
      setPosts(data.data.map((post: BlogPost) => ({ 
        ...post, 
        isFavorited: favoriteIds.has(post.id)
      })));
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleToggleFavorite = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const newPost = { ...post, isFavorited: !post.isFavorited };

        const savedFavorites = localStorage.getItem('favorites');
        const favoriteIds = savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
        
        if (newPost.isFavorited) {
          favoriteIds.add(id);
        } else {
          favoriteIds.delete(id);
        }
        
        localStorage.setItem('favorites', JSON.stringify([...favoriteIds]));
        return newPost;
      }
      return post;
    }));
  };

  const handleTagClick = (tag: string) => {
    if (!activeTags.includes(tag)) {
      setActiveTags([...activeTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setActiveTags(activeTags.filter(t => t !== tag));
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      activeTags,
      handleToggleFavorite, 
      handleTagClick,
      handleRemoveTag 
    }}>
      {children}
    </PostContext.Provider>
  );
}; 