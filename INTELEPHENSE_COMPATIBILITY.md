# Compatibilité avec Intelephense

Cette extension Ephect Syntax Highlighting est conçue pour être entièrement compatible avec
[Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client),
le serveur de langage PHP le plus populaire pour VS Code.

## Comment ça fonctionne

### Mode Injection de Grammaire

Au lieu de remplacer la grammaire PHP standard, cette extension utilise le système d'**injection de
grammaire** de VS Code. Cela signifie que :

✅ **Toutes les fonctionnalités Intelephense sont préservées** :

- IntelliSense et auto-complétion
- Analyse de code et diagnostics
- Navigation (Go to Definition, Find References)
- Refactoring et renommage de symboles
- Documentation hover et signature help

✅ **Les fonctionnalités Ephect sont ajoutées** :

- Coloration syntaxique pour `@for`, `@if`, `@while`, etc.
- Support des blocs HEREDOC HTML
- Coloration des variables Ephect (`%variable`)
- Interpolation `{{ variable }}`

### Configuration Automatique

L'extension détecte automatiquement si Intelephense est installé :

- **Avec Intelephense** : Mode compatibilité activé automatiquement
- **Sans Intelephense** : Suggestion d'installation pour une meilleure expérience

## Installation Recommandée

### 1. Installer Intelephense

```bash
# Via la palette de commandes VS Code
Ctrl+Shift+P > "Extensions: Install Extensions" > "Intelephense"
```

Ou installer directement :
[Intelephense sur le Marketplace](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

### 2. Installer l'extension Ephect

Installer l'extension Ephect Syntax Highlighting (ce package)

### 3. Configuration (Optionnelle)

Dans vos paramètres VS Code (`settings.json`) :

```json
{
  // Configuration Intelephense pour Ephect
  "intelephense.files.associations": ["*.php"],

  // Désactiver les fonctionnalités PHP de base de VS Code (recommandé par Intelephense)
  "php.suggest.basic": false,
  "php.validate.enable": false,

  // Configuration Ephect
  "ephect.enableIntelephenseCompatibility": true
}
```

## Fonctionnalités Combinées

Avec les deux extensions actives, vous bénéficiez de :

### IntelliSense PHP Complet (Intelephense)

- Auto-complétion des classes, méthodes, propriétés
- Documentation contextuelle
- Analyse statique et détection d'erreurs
- Refactoring intelligent

### Coloration Syntaxique Ephect (Cette extension)

- Directives de contrôle colorées
- Variables Ephect distinctes
- HTML dans HEREDOC avec coloration complète
- Interpolation de variables mise en évidence

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
                <h3>{{ user->name }}</h3>    // ← Interpolation Ephect
                @if %user->isActive do       // ← Condition Ephect colorée
                    <span class="active">Actif</span>
                @else
                    <span class="inactive">Inactif</span>
                @done
            </div>
        @done
    </div>
    HTML);
}
```

## Résolution des Conflits

### Problème : Pas de coloration Ephect

**Solution** : Vérifier que le fichier est reconnu comme PHP :

- Clic droit sur l'onglet du fichier > "Change Language Mode" > "PHP"
- Ou ajouter l'extension dans `files.associations`

### Problème : IntelliSense ne fonctionne pas

**Solution** : Vérifier la configuration Intelephense :

1. `Ctrl+Shift+P` > "Intelephense: Restart"
2. Vérifier que PHP Language Features de base est désactivé
3. Vérifier les paramètres `intelephense.*`

### Problème : Erreurs de syntaxe sur les directives Ephect

C'est **normal** ! Intelephense analyse le PHP standard et ne comprend pas les directives Ephect
comme `@for`, `@if`. Ces "erreurs" sont attendues et n'affectent pas la fonctionnalité.

Pour masquer ces erreurs spécifiques :

```json
{
  "intelephense.diagnostics.undefinedTypes": false,
  "intelephense.diagnostics.undefinedFunctions": false,
  "intelephense.diagnostics.undefinedConstants": false
}
```

## Support

- **Issues Intelephense** :
  [GitHub Intelephense](https://github.com/bmewburn/vscode-intelephense/issues)
- **Issues Ephect Syntax** :
  [GitHub Ephect Extension](https://github.com/ephect-io/vscode-extension/issues)

## Licence

Les deux extensions sont compatibles au niveau des licences :

- **Intelephense** : Gratuit avec fonctionnalités premium payantes
- **Ephect Syntax Highlighting** : MIT License (entièrement gratuit)
