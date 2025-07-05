import React, { useState, useEffect } from 'react';
import { renderMarkdown } from '../core/markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  LoadingFallback?: React.ComponentType;
  ErrorFallback?: React.ComponentType<{ error: string }>;
}

export function MarkdownRenderer({
  content,
  className = '',
  LoadingFallback = () => <div>Loading...</div>,
  ErrorFallback = ({ error }) => <div>Error rendering markdown: {error}</div>
}: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const renderedHtml = await renderMarkdown(content);
        setHtml(renderedHtml);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render markdown');
      } finally {
        setLoading(false);
      }
    };

    if (content) {
      renderContent();
    } else {
      setHtml('');
      setLoading(false);
    }
  }, [content]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
} 