export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string; // ISO date string
  tags: string[];
  body: string; // Markdown content
  markdownFile?: string; // Path to markdown file for download
}

// Lightweight interface for blog selection page (titles and tags only)
export interface BlogSummary {
  slug: string;
  title: string;
  tags: string[];
  publishDate: string; // ISO date string
}

// Full blog content interface for specific blog page
export interface BlogContent {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string; // ISO date string
  tags: string[];
  body: string; // Markdown content
  markdownFile?: string; // Path to markdown file for download
}

// Search options for backend search
export interface SearchOptions {
  query: string;
  includeTitle?: boolean;
  includeExcerpt?: boolean;
  includeBody?: boolean;
  includeTags?: boolean;
  caseSensitive?: boolean;
  fuzzy?: boolean;
  limit?: number;
  offset?: number;
}

// Single fetcher for all blog operations
export interface BlogFetcher {
  // Get all blog summaries
  getBlogSummaries(): Promise<BlogSummary[]>;
  
  // Get specific blog content
  getBlogContent(slug: string): Promise<BlogContent | null>;
  
  // Search blogs with options (handled by backend)
  searchBlogs(options: SearchOptions): Promise<BlogSummary[]>;
  
  // Get blogs by specific tag
  getBlogsByTag(tag: string): Promise<BlogSummary[]>;
  
  // Get all unique tags
  getTags(): Promise<string[]>;
  
  // Download blog markdown
  downloadBlogMarkdown(slug: string): Promise<string>;
}

// API implementation of the blog fetcher
export class APIBlogFetcher implements BlogFetcher {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = '/api/blog', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }

  async getBlogSummaries(): Promise<BlogSummary[]> {
    const response = await fetch(`${this.baseUrl}/summaries`, {
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blog summaries');
    }
    return await response.json();
  }

  async getBlogContent(slug: string): Promise<BlogContent | null> {
    const response = await fetch(`${this.baseUrl}/content/${slug}`, {
      headers: this.getHeaders()
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  async searchBlogs(options: SearchOptions): Promise<BlogSummary[]> {
    const searchParams = new URLSearchParams();
    searchParams.append('q', options.query);
    
    if (options.includeTitle !== undefined) {
      searchParams.append('includeTitle', options.includeTitle.toString());
    }
    if (options.includeExcerpt !== undefined) {
      searchParams.append('includeExcerpt', options.includeExcerpt.toString());
    }
    if (options.includeBody !== undefined) {
      searchParams.append('includeBody', options.includeBody.toString());
    }
    if (options.includeTags !== undefined) {
      searchParams.append('includeTags', options.includeTags.toString());
    }
    if (options.caseSensitive !== undefined) {
      searchParams.append('caseSensitive', options.caseSensitive.toString());
    }
    if (options.fuzzy !== undefined) {
      searchParams.append('fuzzy', options.fuzzy.toString());
    }
    if (options.limit !== undefined) {
      searchParams.append('limit', options.limit.toString());
    }
    if (options.offset !== undefined) {
      searchParams.append('offset', options.offset.toString());
    }

    const response = await fetch(`${this.baseUrl}/search?${searchParams.toString()}`, {
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to search blogs');
    }
    return await response.json();
  }

  async getBlogsByTag(tag: string): Promise<BlogSummary[]> {
    const response = await fetch(`${this.baseUrl}/tags/${encodeURIComponent(tag)}`, {
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blogs by tag');
    }
    return await response.json();
  }

  async getTags(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/tags`, {
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    return await response.json();
  }

  async downloadBlogMarkdown(slug: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/content/${slug}/markdown`, {
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to download markdown for ${slug}`);
    }
    return await response.text();
  }
}

// Factory function to create blog fetchers
export function createBlogFetcher(
  type: 'api', 
  config?: { baseUrl?: string; apiKey?: string }
): BlogFetcher {
  if (type === 'api') {
    return new APIBlogFetcher(config?.baseUrl, config?.apiKey);
  }
  throw new Error(`Unsupported fetcher type: ${type}`);
}

