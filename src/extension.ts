import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(_context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "intelephect" is now active!');
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    // Clean up resources if needed
}