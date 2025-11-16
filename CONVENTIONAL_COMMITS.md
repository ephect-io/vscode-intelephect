# Conventional Commits

This project uses the [Conventional Commits](https://www.conventionalcommits.org/) standard for
commit messages.

## Commit Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Required Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes only
- **style**: Changes that don't affect the meaning of the code (whitespace, formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build tools or auxiliary dependencies

### Scope (Optional)

- **syntax**: Grammar and syntax rules
- **theme**: Color themes
- **compat**: Compatibility with other extensions
- **config**: Extension configuration

### Rules

1. **Required type**: Each commit must start with a valid type
2. **Lowercase**: Type and description must be in lowercase
3. **No trailing period**: Description should not end with a period
4. **Imperative present**: Use imperative present tense ("add" not "added" or "adds")
5. **50 characters max**: Description line should be less than 50 characters
6. **Optional body**: Separate body with blank line and limit to 72 characters per line

## Valid Examples

```bash
feat: add support for @while directive
fix: resolve heredoc html highlighting issue
docs: update installation guide for intelephense
style: format typescript code with prettier
refactor: simplify grammar injection logic
perf: optimize regex patterns in syntax rules
test: add unit tests for directive parsing
chore: update dependencies to latest versions

feat(syntax): add @op directive support
fix(theme): improve variable color contrast
docs(compat): add intelephense compatibility guide
```

## Invalid Examples

```bash
# ❌ No type
update readme file

# ❌ Uppercase
FEAT: add new feature
Fix: correct bug

# ❌ Trailing period
feat: add new directive.

# ❌ Too long
feat: add support for a very long feature that does way too many things and should probably be split

# ❌ Wrong tense
feat: added new feature
fix: fixed the bug
```

## Automatic Configuration

The project includes tools to automatically validate commits:

- **commitlint**: Validates commit message format
- **husky**: Git hook to run validation before commit
- **lint-staged**: Runs checks on modified files

## Hook Installation

```bash
npm install
npm run prepare
```

## Generate Changelog

```bash
npm run changelog
```

## Manual Validation

```bash
# Test a commit message
echo "feat: add new feature" | npx commitlint

# Validate the last commit
npx commitlint --from HEAD~1 --to HEAD --verbose
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [commitlint](https://commitlint.js.org/)
- [Semantic Versioning](https://semver.org/)
