# Conventional Commits

Ce projet utilise le standard [Conventional Commits](https://www.conventionalcommits.org/) pour les
messages de commit.

## Format des Commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types Obligatoires

- **feat**: Nouvelle fonctionnalité
- **fix**: Correction de bug
- **docs**: Changements de documentation seulement
- **style**: Changements qui n'affectent pas le sens du code (espaces, formatage, etc.)
- **refactor**: Changement de code qui ne corrige pas un bug ni ajoute une fonctionnalité
- **perf**: Changement de code qui améliore les performances
- **test**: Ajout de tests manquants ou correction de tests existants
- **chore**: Changements aux outils de build ou dépendances auxiliaires

### Scope (Optionnel)

- **syntax**: Grammaire et règles de syntaxe
- **theme**: Thèmes de couleur
- **compat**: Compatibilité avec d'autres extensions
- **config**: Configuration de l'extension

### Règles

1. **Type obligatoire** : Chaque commit doit commencer par un type valide
2. **Minuscules** : Le type et la description doivent être en minuscules
3. **Pas de point final** : La description ne doit pas se terminer par un point
4. **Présent impératif** : Utiliser l'impératif présent ("add" pas "added" ou "adds")
5. **50 caractères max** : La ligne de description doit faire moins de 50 caractères
6. **Corps optionnel** : Séparer le corps par une ligne vide et limiter à 72 caractères par ligne

## Exemples Valides

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

## Exemples Invalides

```bash
# ❌ Pas de type
update readme file

# ❌ Majuscules
FEAT: add new feature
Fix: correct bug

# ❌ Point final
feat: add new directive.

# ❌ Trop long
feat: add support for a very long feature that does way too many things and should probably be split

# ❌ Mauvais temps
feat: added new feature
fix: fixed the bug
```

## Configuration Automatique

Le projet inclut des outils pour valider automatiquement les commits :

- **commitlint** : Valide le format des messages de commit
- **husky** : Hook Git pour exécuter la validation avant commit
- **lint-staged** : Exécute des vérifications sur les fichiers modifiés

## Installation des Hooks

```bash
npm install
npm run prepare
```

## Générer un Changelog

```bash
npm run changelog
```

## Validation Manuelle

```bash
# Tester un message de commit
echo "feat: add new feature" | npx commitlint

# Valider le dernier commit
npx commitlint --from HEAD~1 --to HEAD --verbose
```

## Ressources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [commitlint](https://commitlint.js.org/)
- [Semantic Versioning](https://semver.org/)
