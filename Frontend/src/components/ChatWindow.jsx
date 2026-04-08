import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageContent = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-4 whitespace-pre-wrap break-words leading-7 text-[15px] text-slate-100">
            {children}
          </p>
        ),
        h1: ({ children }) => (
          <h1 className="mb-4 mt-2 text-3xl font-bold text-white">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-2 text-2xl font-semibold text-white">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-3 mt-2 text-xl font-semibold text-white">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-100">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-100">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-7 text-[15px]">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-slate-200">{children}</em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 underline hover:text-sky-300"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-slate-600 pl-4 italic text-slate-300">
            {children}
          </blockquote>
        ),
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (!inline) {
            return (
              <div className="my-4 overflow-hidden rounded-2xl border border-slate-700">
                <SyntaxHighlighter
                  style={oneDark}
                  language={match ? match[1] : "javascript"}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: "16px",
                    background: "#0b1120",
                    fontSize: "14px",
                    borderRadius: "16px",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          }

          return (
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-sky-300">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const ChatWindow = ({ messages, loading }) => {
  const containerRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom("smooth");
    }, 80);

    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      scrollToBottom("smooth");
    }, 120);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-[#020617] px-0 scroll-smooth"
    >
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center px-6 text-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Start a new conversation
            </h2>
            <p className="mt-3 text-sm text-slate-400">Ask anything...</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`border-b border-white/5 ${
                msg.role === "assistant" ? "bg-[#0f172a]" : "bg-[#020617]"
              }`}
            >
              <div className="mx-auto flex w-full max-w-5xl gap-4 px-4 py-6 md:px-6">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${
                    msg.role === "user" ? "bg-violet-600" : "bg-sky-500"
                  }`}
                >
                  {msg.role === "user" ? "U" : "AI"}
                </div>

                <div className="flex-1 min-w-0">
                  {msg.role === "user" && (
                    <p className="mb-2 text-sm font-semibold text-white">You</p>
                  )}

                  <div className="break-words">
                    <MessageContent content={msg.content} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="border-b border-white/5 bg-[#0f172a]">
              <div className="mx-auto flex w-full max-w-5xl gap-4 px-4 py-6 md:px-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-xs font-bold text-white">
                  AI
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 pt-1">
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></span>
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></span>
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-300"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatWindow;