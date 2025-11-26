import * as vscode from 'vscode';

async function configureIntelephenseForPhpx(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('intelephense');
  const files = config.get<{ associations: string[] }>('files');
  const currentAssociations = files?.associations || ['*.php'];

  // Check if .phpx is already configured
  if (currentAssociations.includes('*.phpx') || currentAssociations.includes('*.ephect.php')) {
    console.log('Intelephense already configured for .phpx files');
    return;
  }

  // Check if user has already been asked
  const hasConfiguredIntelephense = context.globalState.get(
    'ephect.hasConfiguredIntelephense',
    false
  );

  if (hasConfiguredIntelephense) {
    return;
  }

  // Ask user if they want to configure Intelephense
  const response = await vscode.window.showInformationMessage(
    'Would you like to configure Intelephense to provide PHP IntelliSense for .phpx files?',
    'Yes',
    'Not now',
    "Don't ask again"
  );

  if (response === 'Yes') {
    const newAssociations = [...currentAssociations, '*.phpx', '*.ephect.php'];

    // Try to update workspace settings first, fall back to user settings
    try {
      await config.update(
        'files',
        { associations: newAssociations },
        vscode.ConfigurationTarget.Workspace
      );
      vscode.window.showInformationMessage(
        'Intelephense configured for .phpx files in workspace settings'
      );
    } catch (error) {
      // If workspace update fails, update user settings
      await config.update(
        'files',
        { associations: newAssociations },
        vscode.ConfigurationTarget.Global
      );
      vscode.window.showInformationMessage(
        'Intelephense configured for .phpx files in user settings'
      );
    }

    context.globalState.update('ephect.hasConfiguredIntelephense', true);
  } else if (response === "Don't ask again") {
    context.globalState.update('ephect.hasConfiguredIntelephense', true);
  }
}

export default function phpIntelephenseCompatibility(context: vscode.ExtensionContext) {
  // --- Compatibility check with Intelephense ---
  const intelephenseExt = vscode.extensions.getExtension('bmewburn.vscode-intelephense-client');

  if (intelephenseExt) {
    console.log('Intelephense detected - running in compatibility mode');

    // Configure Intelephense for .phpx files
    configureIntelephenseForPhpx(context);

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
}
