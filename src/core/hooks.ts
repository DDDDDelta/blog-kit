import { useState, useEffect } from "react";
import { BlogSummary, BlogContent, BlogFetcher, SearchOptions } from "./posts";

// Hook for getting blog summaries
export function useBlogSummaries(fetcher: BlogFetcher) {
  const [summaries, setSummaries] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        setLoading(true);
        const data = await fetcher.getBlogSummaries();
        setSummaries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog summaries');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, [fetcher]);

  return { summaries, loading, error };
}

// Hook for getting specific blog content
export function useBlogContent(fetcher: BlogFetcher, slug: string) {
  const [content, setContent] = useState<BlogContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) {
        setContent(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetcher.getBlogContent(slug);
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [fetcher, slug]);

  return { content, loading, error };
}

// Hook for searching blogs (backend-based)
export function useBlogSearch(fetcher: BlogFetcher) {
  const [searchResults, setSearchResults] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (options: SearchOptions) => {
    if (!options.query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await fetcher.searchBlogs(options);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, error, search };
}

// Hook for getting blogs by tag
export function useBlogsByTag(fetcher: BlogFetcher) {
  const [taggedBlogs, setTaggedBlogs] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBlogsByTag = async (tag: string) => {
    if (!tag.trim()) {
      setTaggedBlogs([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await fetcher.getBlogsByTag(tag);
      setTaggedBlogs(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs by tag');
      setTaggedBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return { taggedBlogs, loading, error, getBlogsByTag };
}

// Hook for getting all tags
export function useTags(fetcher: BlogFetcher) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const data = await fetcher.getTags();
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [fetcher]);

  return { tags, loading, error };
}
