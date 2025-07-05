// src/core/mockFetcher.ts (refactored)
import { BlogFetcher, BlogSummary, BlogContent, SearchOptions } from "./posts";
import { SAMPLE_BLOGS } from "./mockData";

// Helper function to convert BlogContent to BlogSummary
function toBlogSummary(blog: BlogContent): BlogSummary {
  return {
    slug: blog.slug,
    title: blog.title,
    tags: blog.tags,
    publishDate: blog.publishDate
  };
}

// Helper function to search through blog content
function searchInContent(content: string, query: string, caseSensitive: boolean = false): boolean {
  const searchText = caseSensitive ? content : content.toLowerCase();
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  return searchText.includes(searchQuery);
}

export class MockBlogFetcher implements BlogFetcher {
  private blogs: BlogContent[];

  constructor(customBlogs?: BlogContent[]) {
    this.blogs = customBlogs || SAMPLE_BLOGS;
  }

  async getBlogSummaries(): Promise<BlogSummary[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return this.blogs.map(toBlogSummary);
  }

  async getBlogContent(slug: string): Promise<BlogContent | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const blog = this.blogs.find(b => b.slug === slug);
    return blog || null;
  }

  async searchBlogs(options: SearchOptions): Promise<BlogSummary[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { query, includeTitle = true, includeExcerpt = true, includeBody = false, includeTags = true, caseSensitive = false, fuzzy = false, limit, offset = 0 } = options;
    
    if (!query.trim()) {
      return [];
    }

    const results = this.blogs.filter(blog => {
      const searchFields = [];
      
      if (includeTitle) searchFields.push(blog.title);
      if (includeExcerpt) searchFields.push(blog.excerpt);
      if (includeBody) searchFields.push(blog.body);
      if (includeTags) searchFields.push(blog.tags.join(' '));
      
      const searchText = searchFields.join(' ');
      
      if (fuzzy) {
        // Simple fuzzy search - check if all query words are present
        const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
        return queryWords.every(word => 
          searchText.toLowerCase().includes(word)
        );
      } else {
        return searchInContent(searchText, query, caseSensitive);
      }
    });

    // Apply pagination
    const paginatedResults = results.slice(offset, limit ? offset + limit : undefined);
    
    return paginatedResults.map(toBlogSummary);
  }

  async getBlogsByTag(tag: string): Promise<BlogSummary[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const taggedBlogs = this.blogs.filter(blog => 
      blog.tags.some(blogTag => 
        blogTag.toLowerCase() === tag.toLowerCase()
      )
    );
    
    return taggedBlogs.map(toBlogSummary);
  }

  async getTags(): Promise<string[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const allTags = this.blogs.flatMap(blog => blog.tags);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
  }

  async downloadBlogMarkdown(slug: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const blog = this.blogs.find(b => b.slug === slug);
    if (!blog) {
      throw new Error(`Blog not found: ${slug}`);
    }
    
    return blog.body;
  }
}

// Factory function to create mock fetcher
export function createMockFetcher(customBlogs?: BlogContent[]): BlogFetcher {
  return new MockBlogFetcher(customBlogs);
}