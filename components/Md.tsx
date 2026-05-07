import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export function Md({
  children,
  className = "",
  inline = true,
}: {
  children: string;
  className?: string;
  inline?: boolean;
}) {
  return (
    <div className={`prose-sat ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (inline ? <span>{children}</span> : <p className="mb-2 last:mb-0">{children}</p>),
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
