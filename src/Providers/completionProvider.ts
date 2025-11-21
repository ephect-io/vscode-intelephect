import * as vscode from 'vscode';
import { VsCode } from '../Types/VsCode';

export default function completionProvider(vscode: VsCode) {
  // --- Ephect Control Keywords Completion Provider ---
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ['phpx', 'php'],
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        const completions: vscode.CompletionItem[] = [];

        // Check if we're typing after an Ephect control keyword
        const controlKeywordMatch = linePrefix.match(/@(if|elseif|for|while|do)\s+.*\s+do$/);

        if (controlKeywordMatch) {
          const keyword = controlKeywordMatch[1];
          const snippet = new vscode.CompletionItem('@done', vscode.CompletionItemKind.Snippet);
          snippet.insertText = new vscode.SnippetString('\n\t$0\n@done');
          snippet.documentation = new vscode.MarkdownString(
            `Auto-complete \`@done\` closing tag for \`@${keyword}\` block`
          );
          snippet.detail = 'Ephect control structure closing';
          snippet.sortText = '0'; // High priority
          completions.push(snippet);
        }

        // Provide all Ephect control keywords
        const keywords = [
          {
            label: '@if',
            detail: 'Conditional statement',
            snippet: '@if ${1:condition} do\n\t$0\n@done',
          },
          {
            label: '@elseif',
            detail: 'Alternative condition',
            snippet: '@elseif ${1:condition} do\n\t$0\n@done',
          },
          { label: '@else', detail: 'Fallback condition', snippet: '@else\n\t$0' },
          {
            label: '@for',
            detail: 'For-each loop',
            snippet: '@for ${1:array} as ${2:item} do\n\t$0\n@done',
          },
          {
            label: '@while',
            detail: 'While loop',
            snippet: '@while ${1:condition} do\n\t$0\n@done',
          },
          { label: '@do', detail: 'Code block', snippet: '@do\n\t$0\n@while ${1:condition}' },
          { label: '@op', detail: 'PHP operation', snippet: '@op ${1:code}' },
          { label: '@done', detail: 'Close control block', snippet: '@done' },
        ];

        for (const kw of keywords) {
          const item = new vscode.CompletionItem(kw.label, vscode.CompletionItemKind.Keyword);
          item.insertText = new vscode.SnippetString(kw.snippet);
          item.detail = kw.detail;
          item.documentation = new vscode.MarkdownString(`Ephect control keyword: \`${kw.label}\``);
          completions.push(item);
        }

        return completions;
      },
    },
    ' ', // Trigger on space
    '@' // Trigger on @
  );

  return completionProvider;
}
