import { usePosts } from "@dddelta/blog-kit/core";

export function PostList({
  LoadingFallback = () => <>Loading…</>
}: {
  LoadingFallback?: React.ComponentType;
}) {
  const { posts, isLoading } = usePosts();

  if (isLoading) return <LoadingFallback />;

  return (
    <ul>
      {posts.map(p => (
        <li key={p.slug}>
          <a href={`/blog/${p.slug}`}>{p.title}</a> – {p.excerpt}
        </li>
      ))}
    </ul>
  );
}
