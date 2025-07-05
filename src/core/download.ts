import { Post } from './posts';

export interface DownloadResult {
  success: boolean;
  error?: string;
  data?: Blob;
  filename?: string;
}

export async function downloadPostMarkdown(post: Post): Promise<DownloadResult> {
  try {
    // Generate markdown content with frontmatter
    const content = `---
title: "${post.title}"
publishDate: "${post.publishDate}"
tags: [${post.tags.map(tag => `"${tag}"`).join(', ')}]
excerpt: "${post.excerpt}"
slug: "${post.slug}"
---

${post.body}`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const filename = `${post.slug}.md`;

    return {
      success: true,
      data: blob,
      filename
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Download failed'
    };
  }
}

export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadPostAndSave(post: Post): Promise<void> {
  const result = await downloadPostMarkdown(post);
  
  if (result.success && result.data && result.filename) {
    triggerDownload(result.data, result.filename);
  } else {
    throw new Error(result.error || 'Download failed');
  }
} 
