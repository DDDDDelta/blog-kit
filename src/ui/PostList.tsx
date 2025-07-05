import { BlogFetcher } from "../core/posts";
import { useBlogSummaries } from "../core/hooks";

interface PostListProps {
  fetcher: BlogFetcher;
  LoadingFallback?: React.ComponentType;
  ErrorFallback?: React.ComponentType<{ error: string }>;
}

export function PostList({
  fetcher,
  LoadingFallback = () => <>Loading…</>,
  ErrorFallback = ({ error }) => <div>Error: {error}</div>
}: PostListProps) {
  const { summaries, loading, error } = useBlogSummaries(fetcher);

  if (loading) return <LoadingFallback />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <ul>
      {summaries.map(summary => (
        <li key={summary.slug}>
          <a href={`/blog/${summary.slug}`}>{summary.title}</a>
          <span> – Tags: {summary.tags.join(', ')}</span>
        </li>
      ))}
    </ul>
  );
}
