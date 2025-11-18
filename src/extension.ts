import * as vscode from 'vscode';
import { formatEphectDocument } from '../server/ephectFormatter';

export function activate(context: vscode.ExtensionContext) {
  console.log('Ephect Syntax Highlighting extension is now active!');

  // --- Compatibility check with Intelephense ---
  const intelephenseExt = vscode.extensions.getExtension('bmewburn.vscode-intelephense-client');

  if (intelephenseExt) {
    console.log('Intelephense detected - running in compatibility mode');

    const hasShownCompatibilityMessage = context.globalState.get(
      'ephect.hasShownCompatibilityMessage',
      false
    );

    if (!hasShownCompatibilityMessage) {
      vscode.window
        .showInformationMessage(
          'Ephect Syntax Highlighting is running in compatibility mode with Intelephense. All PHP IntelliSense features are preserved while adding Ephect template syntax highlighting.',
          "Don't show again"
        )
        .then(selection => {
          if (selection === "Don't show again") {
            context.globalState.update('ephect.hasShownCompatibilityMessage', true);
          }
        });
    }
  } else {
    console.log('Intelephense not detected - running in standalone mode');

    const config = vscode.workspace.getConfiguration('ephect');
    const enableCompatibility = config.get('enableIntelephenseCompatibility', true);

    if (enableCompatibility) {
      const hasShownIntelephenseSuggestion = context.globalState.get(
        'ephect.hasShownIntelephenseSuggestion',
        false
      );

      if (!hasShownIntelephenseSuggestion) {
        vscode.window
          .showInformationMessage(
            'For the best PHP development experience with Ephect templates, we recommend installing the Intelephense extension.',
            'Install Intelephense',
            "Don't show again"
          )
          .then(selection => {
            if (selection === 'Install Intelephense') {
              vscode.commands.executeCommand(
                'workbench.extensions.search',
                'bmewburn.vscode-intelephense-client'
              );
            } else if (selection === "Don't show again") {
              context.globalState.update('ephect.hasShownIntelephenseSuggestion', true);
            }
          });
      }
    }
  }

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
