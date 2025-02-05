import { useMemo } from 'react';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import { Card, CardContent } from '@/components/ui/card';

import 'highlight.js/styles/github-dark.css';
import './chat-response.css';

const createMarkdownRenderer = () => {
  const md = new MarkdownIt({
    highlight: (code, lang) => {
      try {
        let highlightedCode;
        if (lang && hljs.getLanguage(lang)) {
          highlightedCode = hljs.highlight(code, { language: lang }).value;
        } else {
          highlightedCode = hljs.highlightAuto(code).value;
        }
        return `<div class="code-wrapper"><pre class="hljs"><code>${highlightedCode}</code></pre></div>`;
      } catch (error) {
        console.error('Error highlighting code:', error);
        return code;
      }
    },
  });

  return md;
};

type Props = {
  streamedMessage: string;
};

export function ChatOutput({ streamedMessage }: Props) {
  const md = useMemo(() => createMarkdownRenderer(), []);

  return (
    <Card className="mt-4">
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: md.render(streamedMessage),
          }}
        ></div>
      </CardContent>
    </Card>
  );
}
