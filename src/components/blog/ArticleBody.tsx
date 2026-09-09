import type { ArticleBlock } from '@/lib/blog';

/** Renders the structured article blocks with the Mountiva prose styles. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-mountiva">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i}>{block.text}</h2>;
          case 'p':
            return <p key={i}>{block.text}</p>;
          case 'quote':
            return (
              <blockquote key={i}>
                {block.text}
                {block.cite && (
                  <cite className="mt-3 block text-sm not-italic text-ash">— {block.cite}</cite>
                )}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
