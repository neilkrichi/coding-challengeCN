import { useContext } from 'react';
import BlogPostCard from './BlogPostCard';
import { PostContext } from '../context/PostContext';
import { BlogPost } from '../types/types';

const BlogPostList = () => {
  const { 
    posts, 
    activeTags,
    handleToggleFavorite, 
    handleTagClick,
    handleRemoveTag 
  } = useContext(PostContext);

  // Filter posts based on active tags
  // If no tags are selected, show all posts
  // If tags are selected, only show posts that have ALL selected tags
  const filteredPosts = posts.filter((post: BlogPost) => 
    activeTags.length === 0 || activeTags.every(tag => post.tags.includes(tag))
  );

  return (
    <div className="max-w-3xl mx-auto px-4">
      {activeTags.length > 0 && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Active tags:</span>
            <div className="flex flex-wrap gap-2">
              {activeTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleRemoveTag(tag)}
                  className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center gap-1"
                >
                  {tag}
                  <span className="text-xs">×</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredPosts.map(post => (
        <BlogPostCard
          key={post.id}
          post={post}
          onToggleFavorite={handleToggleFavorite}
          onTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default BlogPostList; 