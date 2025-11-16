## [0.2.0] - 2024-11-16

### 🔧 Development Standards

- **Conventional Commits**: Standardized commit rules with automatic validation
- **Commitlint**: Configuration with Ephect-specific scopes
- **Husky**: Git hooks for automatic commit validation
- **Prettier**: Automatic code formatting
- **ESLint**: TypeScript code quality validation
- **GitHub Actions**: PR validation workflow
- **Standard-version**: Automatic release generation

### 📚 Documentation

- Complete commit standards guide
- Pull Request template
- Documented development configuration
- npm scripts for automation

## [0.1.2] - 2024-11-16

### ⭐ Intelephense Compatibility

- **Grammar injection architecture**: No longer interferes with Intelephense
- **Automatic detection** of Intelephense with compatibility mode
- **Informative messages** to guide the user
- **Dedicated configuration**: `ephect.enableIntelephenseCompatibility`
- **Complete compatibility documentation** in `INTELEPHENSE_COMPATIBILITY.md`

### Technical

- Migration to grammar injection (`injectTo: ["source.php"]`)
- Removal of custom `ephect-php` language
- TypeScript code for compatibility management
- Complete preservation of PHP/Intelephense features

## [0.1.1] - 2024-11-16

### Added

- Support for additional Ephect directives:
  - `@while`: Conditional loops
  - `@elseif`: Alternative conditions
  - `@do`: Simple do blocks
  - `@op`: PHP code on one line
- Advanced examples with all directives
- Extended documentation for new directives

### Improved

- Extended Textmate grammar to cover all Ephect directives
- Specialized highlighting for inline PHP code in `@op`
- Support for complex and nested constructions

## [0.1.0] - 2024-11-16

### Added

- Syntax highlighting for Ephect Framework templates
- Support for HTML HEREDOC blocks with complete HTML highlighting
- Recognition of basic Ephect directives (@for, @if, @else, @done)
- Ephect variable highlighting (%variable->property)
- Support for variable interpolation ({{ variable }})
- Optimized "Ephect Dark" color theme
- Language configuration for Ephect PHP
- Complete documentation with examples

### Features

- Complete Textmate grammar for Ephect syntax
- Differential highlighting for standard PHP vs Ephect
- Colored interpolation delimiters
- Support for comparison operators in directives
- Colored HTML attributes in HEREDOC blocks

### Technical

- Compiled TypeScript extension
- VS Code configuration with automatic activation
- Support for .php files with Ephect syntax
- Dark theme with contrasted colors for readability
