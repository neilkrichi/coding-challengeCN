export interface BlogPost {
  id: number;
  title: string;
  body: string;
  creationTime: number;
  tags: string[];
  isFavorited?: boolean;
}

export interface BlogPostCardProps {
  post: BlogPost;
  onToggleFavorite: (id: number) => void;
  onTagClick: (tag: string) => void;
} 