import BlogPostList from '../components/BlogPostList';

const PostsPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 py-8">
      <header className="max-w-3xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
      </header>
      <main>
        <BlogPostList />
      </main>
    </div>
  );
};

export default PostsPage; 