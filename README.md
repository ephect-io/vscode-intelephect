# Ephect Syntax Highlighting Extension

VS Code extension for syntax highlighting of Ephect Framework templates with support for HTML
HEREDOC and simplified PHP syntax. **Compatible with Intelephense** for a complete PHP development
experience.

## Description

This extension provides advanced syntax highlighting for PHP files using the Ephect framework, with
special support for:

- **HTML HEREDOC blocks**: HTML highlighting inside `<<< HTML ... HTML` blocks
- **Simplified PHP syntax**: Ephect directives prefixed with `@` (`@for`, `@if`, `@while`,
  `@elseif`, `@op`, `@do`, `@done`, etc.)
- **Variable interpolation**: Ephect variables (`%variable`) and interpolations `{{ variable }}`

## Features

### 🎨 Syntax Highlighting

- **Standard PHP**: Keywords, variables, strings, comments
- **HTML in HEREDOC**: Tags, attributes, content
- **Ephect directives**: `@for`, `@while`, `@if`, `@elseif`, `@else`, `@op`, `@do`, `@done`
- **Ephect variables**: `%variable->property` with special highlighting
- **Interpolations**: `{{ variable->property }}` with colored delimiters

### 🌈 Color Theme

The extension includes a "Ephect Dark" theme optimized for Ephect syntax:

- **Ephect directives**: Purple (`#C586C0`) in bold
- **Ephect variables**: Gold (`#FFD700`) in bold
- **Interpolations**: Gold delimiters in bold
- **HTML**: Cyan tags (`#4EC9B0`), blue attributes (`#9CDCFE`)
- **PHP**: Blue keywords (`#569CD6`), cyan variables (`#9CDCFE`)

## Exemple de Code Ephect

```php
<?php

namespace DevRez\Components\ResourceList;

use function Ephect\Hooks\useEffect;

function TableOfResources($props): string
{
    useEffect(function($props, /* object */ $resource, /* array */ $resources) {
        $data = $props->data ?? [];

        $resources = [];
        $oldCategory = '';
        foreach ($data as $resource) {
            $url = $resource->getMainResourceUrl() ?? '#';
            $title = str_replace('https://', '', $url);
            $description = $resource->getDescription() ?? 'No description available.';
            $category = $resource->getCategory()->getName() ?? 'General';
            if ($category != $oldCategory) {
                $oldCategory = $category;
            } else {
                $category = '';
            }

            $resources[] = (object) [
                'url' => $url,
                'title' => $title,
                'description' => $description,
                'category' => $category,
            ];
        }

    });


    return (<<< HTML
    <table>
        <thead>
            <tr>
                <th><span class="emoji">🧩</span> Category</th>
                <th><span class="emoji">🌐</span> Resource</th>
                <th><span class="emoji">📝</span> Description</th>
            </tr>
        </thead>
        <tbody>
    @for %resources as %resource do

        @if %resource->category != '' do
        <tr class="category-row">
        @else
        <tr>
        @done

            <td><strong>{{ resource->category }}</strong></td>
            <td><a href="{{ resource->url }}" target="_blank">{{ resource->title }}</a></td>
            <td>{{ resource->description }}</td>
        </tr>
    @done
        </tbody>
    </table>
    HTML);
}
```

## 🤝 Intelephense Compatibility

This extension is **fully compatible** with
[Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client),
the most popular PHP language server:

✅ **All Intelephense features preserved** (IntelliSense, diagnostics, navigation)  
✅ **Ephect syntax highlighting added** via grammar injection  
✅ **Automatic detection** and compatibility mode

> 💡 **Recommended**: Install Intelephense + this extension for the best PHP/Ephect development
> experience

📖 [Detailed compatibility guide](./INTELEPHENSE_COMPATIBILITY.md)

## Installation

### Recommended (with Intelephense)

1. **Install Intelephense**:

   ```
   Ctrl+Shift+P > Extensions: Install Extensions > "Intelephense"
   ```

2. **Install this extension** (see next section)

### From VSIX (Development)

1. Compile the extension:

   ```bash
   npm install
   npm run compile
   ```

2. Package the extension:

   ```bash
   npm install -g vsce
   vsce package
   ```

3. Install the generated `.vsix` file in VS Code:
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X`)
   - Click `...` > `Install from VSIX...`
   - Select the `.vsix` file

### Configuration

The extension automatically activates for `.php` files and injects into the existing PHP grammar:

1. **Select the theme**: `Ctrl+Shift+P` → "Preferences: Color Theme" → "Ephect Dark"
2. **Intelephense configuration** (optional):
   ```json
   {
     "ephect.enableIntelephenseCompatibility": true,
     "php.suggest.basic": false,
     "php.validate.enable": false
   }
   ```

## Supported Syntax

### Ephect Directives

```php
@for %items as %item do
    // Loop content
@done

@while %condition do
    // While loop
@done

@if %condition do
    // Conditional content
@elseif %otherCondition do
    // Alternative condition
@else
    // Alternative content
@done

@do
    // Simple do block
@done

@op $variable = someFunction();  // PHP code on one line
```

### Variables and Interpolation

```php
// Ephect variables
%variable
%object->property
%array->item->subproperty

// Interpolation in HTML
{{ variable->property }}
{{ object->method() }}
```

### HTML HEREDOC

```php
return (<<< HTML
<div class="container">
    <h1>{{ title }}</h1>
    @for %items as %item do
        <p>{{ item->name }}</p>
    @done
</div>
HTML);
```

## Development

### Commit Standards

This project uses [Conventional Commits](./CONVENTIONAL_COMMITS.md) with automatic validation:

```bash
# Install Git hooks
npm install && npm run prepare

# Assisted commit (recommended)
npm run commit

# Manual message validation
echo "feat: add new feature" | npx commitlint

# Code formatting
npm run format
```

**Required format**: `type(scope): description`

Valid examples:

- `feat: add @while directive support`
- `fix(theme): improve color contrast`
- `docs: update installation guide`

### Project Structure

```
├── package.json              # Extension configuration
├── language-configuration.json # Language configuration
├── src/
│   └── extension.ts          # Main TypeScript code
├── syntaxes/
│   └── ephect-php.tmLanguage.json # Textmate grammar
└── themes/
    └── ephect-dark-color-theme.json # Color theme
```

### Build Scripts

```bash
# Install dependencies and Git hooks
npm install

# Development
npm run compile          # TypeScript compilation
npm run watch           # Watch mode compilation
npm run lint            # ESLint verification
npm run format          # Prettier formatting

# Commits
npm run commit          # Assisted commit with Commitizen
npm run changelog       # Changelog generation
npm run release         # Automatic release with standard-version

# Package for distribution
vsce package
```

### Contributing

1. **Fork** the project
2. **Clone** and install: `git clone ... && npm install`
3. **Create a branch**: `git checkout -b feat/my-feature`
4. **Develop** following project standards
5. **Commit**: `npm run commit` (Conventional Commits format)
6. **Push**: `git push origin feat/my-feature`
7. **Open a Pull Request** with the provided template

**🔗 Useful links**:

- [Commit standards](./CONVENTIONAL_COMMITS.md)
- [Intelephense compatibility guide](./INTELEPHENSE_COMPATIBILITY.md)

## License

MIT License - see the [LICENSE](LICENSE) file for more details.

## Support

To report bugs or request features:

- [GitHub Issues](https://github.com/ephect-io/vscode-extension/issues)
- [Ephect Documentation](https://ephect.io)

---

**Note**: This extension is specifically designed for the Ephect framework. For other PHP
frameworks, use the standard PHP extensions for VS Code.
