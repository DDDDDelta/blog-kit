# Blog Kit

A modern, flexible blog management system built with TypeScript and React. This kit provides a unified interface for fetching blog content, summaries, and search functionality through API endpoints.

## Features

- **Unified Blog Fetcher**: Single interface for all blog operations
- **API-First Design**: Built for real API endpoints with authentication support
- **Backend Search**: Advanced search functionality handled by the backend
- **TypeScript Support**: Full type safety throughout the codebase
- **React Hooks**: Custom hooks for easy integration
- **Search & Filtering**: Search by title/tags and filter by tags
- **Markdown Support**: Download blog content as markdown files

## Core Components

### BlogFetcher Interface

The main interface that handles all blog operations:

```typescript
interface BlogFetcher {
  getBlogSummaries(): Promise<BlogSummary[]>;
  getBlogContent(slug: string): Promise<BlogContent | null>;
  searchBlogs(options: SearchOptions): Promise<BlogSummary[]>;
  getBlogsByTag(tag: string): Promise<BlogSummary[]>;
  getTags(): Promise<string[]>;
  downloadBlogMarkdown(slug: string): Promise<string>;
}
```

### Search Options

The search functionality is handled entirely by the backend with comprehensive options:

```typescript
interface SearchOptions {
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
```

### Data Types

```typescript
// Lightweight summary for blog listings
interface BlogSummary {
  slug: string;
  title: string;
  tags: string[];
  publishDate: string;
}

// Full content for individual blog pages
interface BlogContent {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  tags: string[];
  body: string;
  markdownFile?: string;
}
```

## Usage

### Basic Setup

```typescript
import { createBlogFetcher } from '@your-org/blog-kit';

// Create a blog fetcher instance
const blogFetcher = createBlogFetcher('api', {
  baseUrl: '/api/blog',
  apiKey: 'your-api-key' // optional
});
```

### Using React Hooks

```typescript
import { useBlogSummaries, useBlogContent, useBlogSearch } from '@your-org/blog-kit';

function BlogList() {
  const { summaries, loading, error } = useBlogSummaries(blogFetcher);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {summaries.map(summary => (
        <div key={summary.slug}>
          <h2>{summary.title}</h2>
          <p>Tags: {summary.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
```

### Backend Search Functionality

```typescript
function SearchPage() {
  const { searchResults, loading, search } = useBlogSearch(blogFetcher);
  const [query, setQuery] = useState('');
  
  const handleSearch = () => {
    const searchOptions = {
      query: query,
      includeTitle: true,
      includeExcerpt: true,
      includeBody: false,
      includeTags: true,
      caseSensitive: false,
      fuzzy: false,
      limit: 20
    };
    search(searchOptions);
  };
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
      
      {searchResults.map(result => (
        <div key={result.slug}>{result.title}</div>
      ))}
    </div>
  );
}
```

### Tag Filtering

```typescript
function TaggedBlogs() {
  const { taggedBlogs, getBlogsByTag } = useBlogsByTag(blogFetcher);
  const { tags } = useTags(blogFetcher);
  
  return (
    <div>
      {tags.map(tag => (
        <button key={tag} onClick={() => getBlogsByTag(tag)}>
          {tag}
        </button>
      ))}
      
      {taggedBlogs.map(blog => (
        <div key={blog.slug}>{blog.title}</div>
      ))}
    </div>
  );
}
```

## API Endpoints

The BlogFetcher expects the following API endpoints:

- `GET /api/blog/summaries` - Get all blog summaries
- `GET /api/blog/content/{slug}` - Get specific blog content
- `GET /api/blog/search` - Search blogs with query parameters
- `GET /api/blog/tags/{tag}` - Get blogs by tag
- `GET /api/blog/tags` - Get all tags
- `GET /api/blog/content/{slug}/markdown` - Download markdown

### Search API Parameters

The search endpoint accepts the following query parameters:

- `q` - Search query (required)
- `includeTitle` - Search in titles (boolean)
- `includeExcerpt` - Search in excerpts (boolean)
- `includeBody` - Search in body content (boolean)
- `includeTags` - Search in tags (boolean)
- `caseSensitive` - Case sensitive search (boolean)
- `fuzzy` - Enable fuzzy matching (boolean)
- `limit` - Maximum results to return (number)
- `offset` - Results offset for pagination (number)

Example search request:
```
GET /api/blog/search?q=react&includeTitle=true&includeTags=true&limit=10
```

### Authentication

If your API requires authentication, pass the `apiKey` when creating the fetcher:

```typescript
const blogFetcher = createBlogFetcher('api', {
  baseUrl: '/api/blog',
  apiKey: 'your-bearer-token'
});
```

The fetcher will automatically include the API key in the Authorization header.

## UI Components

### SearchComponent

A complete search interface with advanced options:

```typescript
import { SearchComponent } from '@your-org/blog-kit/ui';

<SearchComponent 
  baseUrl="/api/blog"
  apiKey="your-api-key"
/>
```

The SearchComponent provides:
- Text search input
- Search options (include title, excerpt, body, tags)
- Case sensitivity toggle
- Fuzzy search toggle
- Results limit control
- Tag filtering
- Real-time search results

### PostList

A simple list component for displaying blog summaries:

```typescript
import { PostList } from '@your-org/blog-kit/ui';

<PostList 
  fetcher={blogFetcher}
  LoadingFallback={() => <div>Loading posts...</div>}
  ErrorFallback={({ error }) => <div>Error: {error}</div>}
/>
```

## Error Handling

All hooks provide error states that you can handle in your components:

```typescript
const { summaries, loading, error } = useBlogSummaries(blogFetcher);

if (error) {
  // Handle error appropriately
  console.error('Failed to fetch blogs:', error);
  return <ErrorComponent message={error} />;
}
```

## TypeScript Support

The library is built with TypeScript and provides full type safety. All interfaces and types are exported for use in your own code:

```typescript
import { 
  BlogFetcher, 
  BlogSummary, 
  BlogContent,
  SearchOptions,
  APIBlogFetcher 
} from '@your-org/blog-kit';
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
