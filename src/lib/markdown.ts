import { remark } from 'remark'
import html from 'remark-html'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown)
  
  // Add Prism class to code blocks for client-side highlighting
  let htmlString = result.toString()
  
  // Replace <code class="language-xxx"> with proper Prism classes
  htmlString = htmlString.replace(
    /<code class="language-(\w+)">/g,
    '<code class="language-$1">'
  )
  
  // Wrap code blocks in pre tags with language class
  htmlString = htmlString.replace(
    /<pre><code class="language-(\w+)">/g,
    '<pre class="language-$1"><code class="language-$1">'
  )
  
  return htmlString
}
