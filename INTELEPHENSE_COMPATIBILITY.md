# Intelephense Compatibility

This Ephect Syntax Highlighting extension is designed to be fully compatible with
[Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client),
the most popular PHP language server for VS Code.

## How it works

### Grammar Injection Mode

Instead of replacing the standard PHP grammar, this extension uses VS Code's **grammar injection**
system. This means:

✅ **All Intelephense features are preserved**:

- IntelliSense and auto-completion
- Code analysis and diagnostics
- Navigation (Go to Definition, Find References)
- Refactoring and symbol renaming
- Hover documentation and signature help

✅ **Ephect features are added**:

- Syntax highlighting for `@for`, `@if`, `@while`, etc.
- HTML HEREDOC block support
- Ephect variable highlighting (`%variable`)
- Interpolation `{{ variable }}`

### Automatic Configuration

The extension automatically detects if Intelephense is installed:

- **With Intelephense**: Compatibility mode activated automatically
- **Without Intelephense**: Installation suggestion for better experience

## Recommended Installation

### 1. Install Intelephense

```bash
# Via VS Code command palette
Ctrl+Shift+P > "Extensions: Install Extensions" > "Intelephense"
```

Or install directly:
[Intelephense on Marketplace](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

### 2. Install Ephect Extension

Install the Ephect Syntax Highlighting extension (this package)

### 3. Configuration (Optional)

In your VS Code settings (`settings.json`):

```json
{
  // Intelephense configuration for Ephect
  "intelephense.files.associations": ["*.php"],

  // Disable VS Code basic PHP features (recommended by Intelephense)
  "php.suggest.basic": false,
  "php.validate.enable": false,

  // Ephect configuration
  "ephect.enableIntelephenseCompatibility": true
}
```

## Combined Features

With both extensions active, you benefit from:

### Complete PHP IntelliSense (Intelephense)

- Auto-completion for classes, methods, properties
- Contextual documentation
- Static analysis and error detection
- Intelligent refactoring

### Ephect Syntax Highlighting (This extension)

- Colored control directives
- Distinct Ephect variables
- HTML in HEREDOC with complete highlighting
- Variable interpolation highlighting

## Exemple de Code

```php
<?php

namespace App\Components;

use function Ephect\Hooks\useEffect; // ← IntelliSense Intelephense

function UserList($props): string // ← Type hints reconnus par Intelephense
{
    useEffect(function($props, $users) { // ← Auto-complétion Intelephense
        $users = $props->users ?? []; // ← Analyse statique Intelephense
    });

    return (<<< HTML                    // ← Coloration Ephect
    <div class="user-list">             // ← Coloration HTML Ephect
        @for %users as %user do         // ← Directive Ephect colorée
            <div class="user-card">
                <h3>{{ user->name }}</h3>    // ← Ephect interpolation
                @if %user->isActive do       // ← Colored Ephect condition
                    <span class="active">Active</span>
                @else
                    <span class="inactive">Inactive</span>
                @done
            </div>
        @done
    </div>
    HTML);
}
```

## Troubleshooting

### Issue: No Ephect highlighting

**Solution**: Verify the file is recognized as PHP:

- Right-click on file tab > "Change Language Mode" > "PHP"
- Or add the extension in `files.associations`

### Issue: IntelliSense not working

**Solution**: Check Intelephense configuration:

1. `Ctrl+Shift+P` > "Intelephense: Restart"
2. Verify basic PHP Language Features is disabled
3. Check `intelephense.*` settings

### Issue: Syntax errors on Ephect directives

This is **normal**! Intelephense analyzes standard PHP and doesn't understand Ephect directives like
`@for`, `@if`. These "errors" are expected and don't affect functionality.

To hide these specific errors:

```json
{
  "intelephense.diagnostics.undefinedTypes": false,
  "intelephense.diagnostics.undefinedFunctions": false,
  "intelephense.diagnostics.undefinedConstants": false
}
```

## Support

- **Intelephense Issues**:
  [GitHub Intelephense](https://github.com/bmewburn/vscode-intelephense/issues)
- **Ephect Syntax Issues**:
  [GitHub Ephect Extension](https://github.com/ephect-io/vscode-extension/issues)

## License

Both extensions are license-compatible:

- **Intelephense**: Free with paid premium features
- **Ephect Syntax Highlighting**: MIT License (completely free)
