import React, { useState } from 'react';

import { useBlogSearch, useTags, useBlogsByTag, SearchOptions, BlogFetcher } from '../core';

interface SearchComponentProps {
  blogFetcher: BlogFetcher;
  className?: string;
}

export function SearchComponent({ 
  blogFetcher,
  className = '' 
}: SearchComponentProps) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchOptions, setSearchOptions] = useState<Partial<SearchOptions>>({
    includeTitle: true,
    includeExcerpt: true,
    includeBody: false,
    includeTags: true,
    caseSensitive: false,
    fuzzy: false,
    limit: 20
  });

  // Use blog hooks
  const { searchResults, loading: searchLoading, error: searchError, search } = useBlogSearch(blogFetcher);
  const { tags, loading: tagsLoading, error: tagsError } = useTags(blogFetcher);
  const { taggedBlogs, loading: tagLoading, error: tagError, getBlogsByTag } = useBlogsByTag(blogFetcher);

  const handleSearch = () => {
    if (query.trim()) {
      const options: SearchOptions = {
        query: query.trim(),
        ...searchOptions
      };
      search(options);
    }
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    getBlogsByTag(tag);
  };

  const updateSearchOption = (key: keyof SearchOptions, value: boolean | number) => {
    setSearchOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="search-input-section">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, excerpt, body, or tags..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={searchLoading}>
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Search Options */}
      <div className="search-options">
        <h4>Search Options:</h4>
        <div className="options-grid">
          <label>
            <input
              type="checkbox"
              checked={searchOptions.includeTitle}
              onChange={(e) => updateSearchOption('includeTitle', e.target.checked)}
            />
            Include Title
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.includeExcerpt}
              onChange={(e) => updateSearchOption('includeExcerpt', e.target.checked)}
            />
            Include Excerpt
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.includeBody}
              onChange={(e) => updateSearchOption('includeBody', e.target.checked)}
            />
            Include Body
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.includeTags}
              onChange={(e) => updateSearchOption('includeTags', e.target.checked)}
            />
            Include Tags
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.caseSensitive}
              onChange={(e) => updateSearchOption('caseSensitive', e.target.checked)}
            />
            Case Sensitive
          </label>
          <label>
            <input
              type="checkbox"
              checked={searchOptions.fuzzy}
              onChange={(e) => updateSearchOption('fuzzy', e.target.checked)}
            />
            Fuzzy Search
          </label>
        </div>
        <div className="limit-option">
          <label>
            Results Limit:
            <input
              type="number"
              min="1"
              max="100"
              value={searchOptions.limit || 20}
              onChange={(e) => updateSearchOption('limit', parseInt(e.target.value) || 20)}
            />
          </label>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="tags-section">
        <h4>Filter by Tags:</h4>
        {tagsLoading ? (
          <p>Loading tags...</p>
        ) : tagsError ? (
          <p>Error loading tags: {tagsError}</p>
        ) : (
          <div className="tags-list">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={selectedTag === tag ? 'selected' : ''}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="search-results">
        <h4>Search Results ({searchResults.length}):</h4>
        {searchLoading ? (
          <p>Searching...</p>
        ) : searchError ? (
          <p>Search error: {searchError}</p>
        ) : (
          <div className="results-list">
            {searchResults.map((summary) => (
              <div key={summary.slug} className="search-result">
                <h5>{summary.title}</h5>
                <p>Tags: {summary.tags.join(', ')}</p>
                <p>Date: {new Date(summary.publishDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tagged Blogs */}
      {selectedTag && (
        <div className="tagged-blogs">
          <h4>Blogs tagged with "{selectedTag}" ({taggedBlogs.length}):</h4>
          {tagLoading ? (
            <p>Loading...</p>
          ) : tagError ? (
            <p>Error: {tagError}</p>
          ) : (
            <div className="tagged-list">
              {taggedBlogs.map((summary) => (
                <div key={summary.slug} className="tagged-item">
                  <h5>{summary.title}</h5>
                  <p>Tags: {summary.tags.join(', ')}</p>
                  <p>Date: {new Date(summary.publishDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 