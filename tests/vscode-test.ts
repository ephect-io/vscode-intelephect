import * as path from 'path';
import * as vscode from 'vscode';
import { runTests } from 'vscode-test';

// Types globaux Jest (en attendant l'installation de @types/jest)
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => Promise<void>) => void;

async function testHighlight(): Promise<void> {
  const doc: vscode.TextDocument = await vscode.workspace.openTextDocument(
    path.join(__dirname, 'fixtures', 'sample.php')
  );
  await vscode.window.showTextDocument(doc);

  const tokens: vscode.SemanticTokens | undefined =
    await vscode.commands.executeCommand<vscode.SemanticTokens>(
      'vscode.provideDocumentSemanticTokens',
      doc.uri
    );
  console.log(tokens);
}

describe('VSCode Ephect syntax injection', (): void => {
  it('should highlight Ephect syntax correctly', async (): Promise<void> => {
    await testHighlight();
  });
});

export { testHighlight, runTests };
