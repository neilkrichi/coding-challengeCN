// Helper to determine content type and extract content
export const parseContent = (content: string): { type: 'html' | 'text'; content: string } => {
  
  if (/<\/?[a-z][\s\S]*>/i.test(content)) {
    return { type: 'html', content };
  }

  return { type: 'text', content };
}; 