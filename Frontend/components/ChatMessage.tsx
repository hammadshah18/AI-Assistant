'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '../types';

export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-800 shadow-md border border-gray-100'}`}>
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-base font-bold mt-2 mb-1" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                code: ({ node, ...props }) => (
                  <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-sm" {...props} />
                ),
                pre: ({ node, ...props }) => <pre className="bg-gray-200 p-3 rounded-lg overflow-x-auto mb-2" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-600 pl-4 italic my-2" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-700" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
