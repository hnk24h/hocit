'use client'

import { useEffect } from 'react'

export default function PrismLoader() {
  useEffect(() => {
    // Dynamically load Prism for client-side highlighting
    const loadPrism = async () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && !window.Prism) {
        const Prism = (await import('prismjs')).default
        
        // Load languages
        await import('prismjs/components/prism-javascript')
        await import('prismjs/components/prism-typescript')
        await import('prismjs/components/prism-jsx')
        await import('prismjs/components/prism-tsx')
        await import('prismjs/components/prism-bash')
        await import('prismjs/components/prism-sql')
        await import('prismjs/components/prism-json')
        await import('prismjs/components/prism-markdown')
        
        // Highlight all code blocks
        Prism.highlightAll()
      }
    }
    
    loadPrism()
  }, [])

  return null
}
