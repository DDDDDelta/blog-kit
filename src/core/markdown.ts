import { marked } from 'marked';
import { Post } from './posts';

export interface MarkdownMetadata {
  title: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
  slug?: string;
}

export interface ParsedMarkdown {
  metadata: MarkdownMetadata;
  content: string;
}

// Configure marked for safe rendering
marked.use({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
});

/**
 * Convert markdown content to HTML using the marked library
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  return await marked.parse(markdown);
}

/**
 * Render a blog post's markdown body to HTML
 */
export async function renderBlogContent(post: Post): Promise<string> {
  return await renderMarkdown(post.body);
}

export function parseMarkdownFile(content: string, slug?: string): ParsedMarkdown {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid markdown file: missing frontmatter');
  }

  const [, frontmatter, markdownContent] = match;
  const metadata = parseFrontmatter(frontmatter);

  if (slug) {
    metadata.slug = slug;
  }

  return {
    metadata,
    content: markdownContent.trim()
  };
}

function parseFrontmatter(frontmatter: string): MarkdownMetadata {
  const lines = frontmatter.split('\n');
  const metadata: Partial<MarkdownMetadata> = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    switch (key) {
      case 'title':
        metadata.title = value;
        break;
      case 'publishDate':
        metadata.publishDate = value;
        break;
      case 'tags':
        // Handle array format: tags: [tag1, tag2, tag3]
        if (value.startsWith('[') && value.endsWith(']')) {
          metadata.tags = value.slice(1, -1).split(',').map(tag => tag.trim());
        } else {
          metadata.tags = [value];
        }
        break;
      case 'excerpt':
        metadata.excerpt = value;
        break;
      case 'slug':
        metadata.slug = value;
        break;
    }
  }

  // Validate required fields
  if (!metadata.title) {
    throw new Error('Missing required field: title');
  }
  if (!metadata.publishDate) {
    throw new Error('Missing required field: publishDate');
  }
  if (!metadata.tags) {
    metadata.tags = [];
  }
  if (!metadata.excerpt) {
    metadata.excerpt = '';
  }

  return metadata as MarkdownMetadata;
}

export function markdownToPost(
  parsedMarkdown: ParsedMarkdown,
  slug: string
): Post {
  return {
    slug,
    title: parsedMarkdown.metadata.title,
    excerpt: parsedMarkdown.metadata.excerpt,
    publishDate: parsedMarkdown.metadata.publishDate,
    tags: parsedMarkdown.metadata.tags,
    body: parsedMarkdown.content,
    markdownFile: `/posts/${slug}.md`
  };
}

export function validateMarkdownFile(content: string): boolean {
  try {
    parseMarkdownFile(content);
    return true;
  } catch {
    return false;
  }
}

export function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Truncate at word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
} 