import React, { useState } from 'react';
import { BlogContent, downloadPostAndSave } from '../core';
import { MarkdownRenderer } from './MarkdownRenderer';

interface BlogPostProps {
  post: BlogContent;
  className?: string;
  LoadingFallback?: React.ComponentType;
  ErrorFallback?: React.ComponentType<{ error: string }>;
  DownloadButton?: React.ComponentType<{ onClick: () => void; disabled?: boolean }>;
}

export function BlogPost({
  post,
  className = '',
  LoadingFallback = () => <div>Loading...</div>,
  ErrorFallback = ({ error }) => <div>Error: {error}</div>,
  DownloadButton = ({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
      Download Markdown
    </button>
  )
}: BlogPostProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setDownloadError(null);
      await downloadPostAndSave(post);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <article className={className}>
      <header>
        <h1>{post.title}</h1>
        <div>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString()}
          </time>
          {post.tags.length > 0 && (
            <div>
              Tags: {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        {post.excerpt && <p>{post.excerpt}</p>}
      </header>

      <div>
        <DownloadButton onClick={handleDownload} disabled={downloading} />
        {downloadError && <div>Download error: {downloadError}</div>}
      </div>

      <MarkdownRenderer
        content={post.body}
        LoadingFallback={LoadingFallback}
        ErrorFallback={ErrorFallback}
      />
    </article>
  );
} 