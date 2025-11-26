import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  CompletionItem,
  CompletionItemKind,
  Hover,
  DiagnosticSeverity,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    completionProvider: { resolveProvider: false },
    hoverProvider: true,
  },
}));

const EPHECT_KEYWORDS: string[] = [
  '@if',
  '@elseif',
  '@else',
  '@for',
  '@while',
  '@switch',
  '@case',
  '@default',
  '@do',
  '@done',
  '@endswitch',
  '@break',
  '@continue',
  '@op',
];

// Completion
connection.onCompletion((): CompletionItem[] => {
  return EPHECT_KEYWORDS.map(k => ({
    label: k,
    kind: CompletionItemKind.Keyword,
  }));
});

// Hover
connection.onHover(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;

  const line = doc
    .getText({
      start: { line: params.position.line, character: 0 },
      end: { line: params.position.line, character: Number.MAX_VALUE },
    })
    .trim();

  const kw = EPHECT_KEYWORDS.find(k => line.startsWith(k));
  if (!kw) return null;

  const hover: Hover = {
    contents: {
      kind: 'markdown',
      value: `**Ephect keyword**: \`${kw}\``,
    },
  };

  return hover;
});

// Diagnostics simple
documents.onDidChangeContent(change => {
  const text = change.document.getText();
  const openBlocks = (text.match(/@if|@for|@while|@switch|\bdo\s*$/gm) || []).length;
  const closeBlocks = (text.match(/@done|@endswitch/gm) || []).length;

  const diagnostics = [];

  if (openBlocks !== closeBlocks) {
    diagnostics.push({
      message: `Il manque ${openBlocks - closeBlocks} fermeture(s) "@done" ou "@endswitch".`,
      severity: DiagnosticSeverity.Warning,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 1 },
      },
    });
  }

  connection.sendDiagnostics({
    uri: change.document.uri,
    diagnostics,
  });
});

documents.listen(connection);
connection.listen();
