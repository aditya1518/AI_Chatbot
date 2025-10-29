import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "./helper";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Answer = ({ ans, index, totalRes, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, [ans]);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={oneDark}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index === 0 && totalRes > 1 ? (
        <span className="text-2xl">{answer}</span>
      ) : heading ? (
        <span
          className={
            index === 0
              ? "text-3xl"
              : "pt-2 text-lg font-bold block dark:text-white text-zinc-800"
          }
        >
          {answer}
        </span>
      ) : (
        <span className={type === "q" ? "pl-1" : "pl-5"}>
          <ReactMarkdown components={components}>
            {String(answer || "")}
          </ReactMarkdown>
        </span>
      )}
    </>
  );
};