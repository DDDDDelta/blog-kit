export interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

const mock: Post[] = [
  { slug: "hello-world", title: "Hello World", excerpt: "My first post" },
  { slug: "nextjs-theme", title: "Styling Next.js", excerpt: "Tailwind vs CSS-in-JS" }
];

export function getAllPosts(): Post[] {
  return mock;
}

