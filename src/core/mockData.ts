// src/core/mockData.ts
import { BlogContent } from "./posts";

export const SAMPLE_BLOGS: BlogContent[] = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and build your first component. This comprehensive guide covers everything from JSX to hooks.",
    publishDate: "2024-01-15T10:00:00Z",
    tags: ["react", "javascript", "frontend", "tutorial"],
    body: `# Getting Started with React

React is a powerful JavaScript library for building user interfaces. In this guide, we'll explore the fundamentals and get you up and running.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

### Components
Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

### JSX
JSX is a syntax extension for JavaScript that looks similar to XML or HTML.

### Props
Props are read-only and are used to pass data from parent to child components.

### State
State allows React components to change their output over time in response to user actions, network responses, and anything else.

## Getting Started

1. Create a new React project using Create React App
2. Understand the project structure
3. Create your first component
4. Learn about props and state

## Next Steps

Once you're comfortable with the basics, explore:
- Hooks (useState, useEffect)
- Event handling
- Conditional rendering
- Lists and keys

Happy coding! ��`,
    markdownFile: "getting-started-with-react.md"
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    excerpt: "Discover the latest TypeScript best practices and patterns that will make your code more maintainable and type-safe.",
    publishDate: "2024-01-20T14:30:00Z",
    tags: ["typescript", "javascript", "best-practices", "development"],
    body: `# TypeScript Best Practices for 2024

TypeScript has evolved significantly over the years. Here are the best practices that will help you write better, more maintainable code.

## 1. Use Strict Mode

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## 2. Prefer Interfaces Over Types

For object shapes, prefer interfaces:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

## 3. Use Union Types for Better Type Safety

\`\`\`typescript
type Status = 'loading' | 'success' | 'error';

function handleStatus(status: Status) {
  switch (status) {
    case 'loading':
      return 'Please wait...';
    case 'success':
      return 'Operation completed!';
    case 'error':
      return 'Something went wrong';
  }
}
\`\`\`

## Conclusion

These practices will help you write more robust TypeScript code. Remember to:
- Always use strict mode
- Leverage the type system
- Keep types simple and composable
- Use utility types effectively

Happy typing! ��`,
    markdownFile: "typescript-best-practices.md"
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques You Should Know",
    excerpt: "Explore cutting-edge CSS features including Grid, Flexbox, Custom Properties, and more that are revolutionizing web design.",
    publishDate: "2024-01-25T09:15:00Z",
    tags: ["css", "frontend", "design", "web-development"],
    body: `# Modern CSS Techniques You Should Know

CSS has come a long way in recent years. Let's explore the modern techniques that are changing how we build websites.

## CSS Grid Layout

CSS Grid is a powerful layout system that allows you to create complex two-dimensional layouts.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}
\`\`\`

## Flexbox for One-Dimensional Layouts

Flexbox is perfect for one-dimensional layouts (rows or columns):

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
\`\`\`

## CSS Custom Properties (Variables)

\`\`\`css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 4px;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 2);
}
\`\`\`

## Conclusion

Modern CSS provides powerful tools for creating flexible, maintainable layouts. Key takeaways:
- Use Grid for complex layouts
- Flexbox for simple alignments
- Custom properties for consistency
- Logical properties for internationalization
- Container queries for component-based design

Keep learning and experimenting! ��`,
    markdownFile: "modern-css-techniques.md"
  },
  {
    slug: "nodejs-performance-optimization",
    title: "Node.js Performance Optimization Strategies",
    excerpt: "Learn advanced techniques to optimize your Node.js applications for better performance, scalability, and user experience.",
    publishDate: "2024-01-30T16:45:00Z",
    tags: ["nodejs", "performance", "backend", "optimization"],
    body: `# Node.js Performance Optimization Strategies

Performance optimization is crucial for Node.js applications. Let's explore strategies to make your apps faster and more efficient.

## 1. Use Async/Await Properly

\`\`\`javascript
// Good: Parallel execution
async function fetchUserData(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return await Promise.all(promises);
}
\`\`\`

## 2. Implement Caching

\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  let user = cache.get(cacheKey);
  
  if (!user) {
    user = await fetchFromDatabase(id);
    cache.set(cacheKey, user);
  }
  
  return user;
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Key strategies:
- Use async/await effectively
- Implement proper caching
- Use streams for large data
- Optimize database queries
- Monitor and measure performance

Remember: "Premature optimization is the root of all evil" - Donald Knuth. Profile first, optimize second! ⚡`,
    markdownFile: "nodejs-performance-optimization.md"
  },
  {
    slug: "react-hooks-deep-dive",
    title: "React Hooks Deep Dive: Beyond the Basics",
    excerpt: "Master advanced React hooks patterns, custom hooks, and learn how to build reusable logic that scales with your application.",
    publishDate: "2024-02-05T11:20:00Z",
    tags: ["react", "hooks", "javascript", "frontend", "advanced"],
    body: `# React Hooks Deep Dive: Beyond the Basics

React Hooks have revolutionized how we write React components. Let's explore advanced patterns and custom hooks.

## Custom Hooks Fundamentals

Custom hooks allow you to extract component logic into reusable functions:

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  return { count, increment, decrement };
}
\`\`\`

## Advanced useEffect Patterns

\`\`\`javascript
function useAsyncEffect(effect, deps) {
  useEffect(() => {
    let isMounted = true;
    
    const execute = async () => {
      try {
        await effect();
      } catch (error) {
        if (isMounted) {
          console.error('Async effect error:', error);
        }
      }
    };
    
    execute();
    
    return () => {
      isMounted = false;
    };
  }, deps);
}
\`\`\`

## Conclusion

Advanced hooks patterns enable:
- Reusable logic across components
- Better performance optimization
- Cleaner component code
- More maintainable applications

Remember to:
- Keep hooks simple and focused
- Use proper dependency arrays
- Avoid infinite re-renders
- Test custom hooks thoroughly

Happy hooking! ��`,
    markdownFile: "react-hooks-deep-dive.md"
  }
];