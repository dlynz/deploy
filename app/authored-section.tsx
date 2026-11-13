import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactNode } from "react";

export function WrittenText({ text }: { text: string }) {
  let letter = 0;
  return (
    <span className="written-text" data-length={Array.from(text).length}>
      <span className="written-accessible">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => (
          <span className="written-word" key={wordIndex}>
            {Array.from(word).map((character) => (
              <span className="written-letter" key={letter} style={{ "--letter": letter++ } as React.CSSProperties}>
                {character}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

// Keep real text in the accessibility tree and reserve its complete layout.
// Only the decorative glyphs are revealed, so typing never shifts the page.
function author(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      return text.trim() ? <WrittenText text={text} /> : child;
    }
    if (!isValidElement<{ children?: ReactNode; "aria-hidden"?: boolean | "true" | "false" }>(child)) return child;
    if (typeof child.type !== "string" || child.props["aria-hidden"]) return child;
    return cloneElement(child, {}, author(child.props.children));
  });
}

export function AuthoredSection({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return <section {...props}>{author(children)}</section>;
}
