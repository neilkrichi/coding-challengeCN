import { BlogPostCardProps } from '../types/types';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { parseContent } from '../utils/contentHelper';

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onToggleFavorite, onTagClick }) => {
  const renderContent = () => {
    const { type, content } = parseContent(post.body);

    if (type === 'html') {
      return (
        <div 
          className="prose max-w-none text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    return <p className="text-gray-600 mb-4">{content}</p>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
      <button
        onClick={() => onToggleFavorite(post.id)}
        className="absolute top-5 right-5 focus:outline-none"
      >
        {post.isFavorited ? (
          <HeartSolid className="h-6 w-6 text-red-500" />
        ) : (
          <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" />
        )}
      </button>

      <h2 className="text-gray-800 text-2xl font-bold mb-2">{post.title}</h2>
      <div className="text-sm text-gray-500 mb-2">
        <span>{new Date(post.creationTime).toLocaleDateString()}</span>
      </div>

      {renderContent()}

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => onTagClick(tag)}
            className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPostCard; 