import * as vscode from 'vscode';
import { formatEphectDocument } from '../server/ephectFormatter';
import phpIntelephenseCompatibility from './Providers/phpIntelephenseCompatibilityProvider';
import completionProvider from './Providers/completionProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Ephect Syntax Highlighting extension is now active!');

  const completionProviderInstance = completionProvider(vscode);
  context.subscriptions.push(completionProviderInstance);

  phpIntelephenseCompatibility(context);

  // --- Ephect Formatter Registration ---
  const formatter = vscode.languages.registerDocumentFormattingEditProvider('php', {
    provideDocumentFormattingEdits(document: vscode.TextDocument) {
      const text = document.getText();
      const formatted = formatEphectDocument(text);

      return [new vscode.TextEdit(new vscode.Range(0, 0, document.lineCount, 0), formatted)];
    },
  });

  context.subscriptions.push(formatter);
}

export function deactivate() {}
