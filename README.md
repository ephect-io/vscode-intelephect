# Ephect Syntax Highlighting Extension

Extension VS Code pour la coloration syntaxique des templates Ephect Framework avec support pour HTML HEREDOC et syntaxe PHP simplifiée. **Compatible avec Intelephense** pour une expérience de développement PHP complète.

## Description

Cette extension fournit une coloration syntaxique avancée pour les fichiers PHP utilisant le framework Ephect, avec un support spécial pour :

- **Blocs HEREDOC HTML** : Coloration HTML à l'intérieur des blocs `<<< HTML ... HTML`
- **Syntaxe PHP simplifiée** : Directives Ephect précédées de `@` (`@for`, `@if`, `@while`, `@elseif`, `@op`, `@do`, `@done`, etc.)
- **Interpolation de variables** : Variables Ephect (`%variable`) et interpolations `{{ variable }}`

## Fonctionnalités

### 🎨 Coloration Syntaxique

- **PHP standard** : Mots-clés, variables, chaînes, commentaires
- **HTML dans HEREDOC** : Balises, attributs, contenu
- **Directives Ephect** : `@for`, `@while`, `@if`, `@elseif`, `@else`, `@op`, `@do`, `@done`
- **Variables Ephect** : `%variable->property` avec coloration spéciale
- **Interpolations** : `{{ variable->property }}` avec délimiteurs colorés

### 🌈 Thème de Couleur

L'extension inclut un thème sombre "Ephect Dark" optimisé pour la syntaxe Ephect :

- **Directives Ephect** : Violet (`#C586C0`) en gras
- **Variables Ephect** : Or (`#FFD700`) en gras  
- **Interpolations** : Délimiteurs or en gras
- **HTML** : Balises cyan (`#4EC9B0`), attributs bleu (`#9CDCFE`)
- **PHP** : Mots-clés bleu (`#569CD6`), variables cyan (`#9CDCFE`)

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
                <th><span class="emoji">🧩</span> Catégorie</th>
                <th><span class="emoji">🌐</span> Ressource</th>
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

## 🤝 Compatibilité Intelephense

Cette extension est **entièrement compatible** avec [Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client), le serveur de langage PHP le plus populaire :

✅ **Toutes les fonctionnalités Intelephense préservées** (IntelliSense, diagnostics, navigation)  
✅ **Coloration syntaxique Ephect ajoutée** par injection de grammaire  
✅ **Détection automatique** et mode compatibilité  

> 💡 **Recommandé** : Installer Intelephense + cette extension pour la meilleure expérience de développement PHP/Ephect

📖 [Guide détaillé de compatibilité](./INTELEPHENSE_COMPATIBILITY.md)

## Installation

### Recommandée (avec Intelephense)

1. **Installer Intelephense** :
   ```
   Ctrl+Shift+P > Extensions: Install Extensions > "Intelephense"
   ```

2. **Installer cette extension** (voir section suivante)

### Depuis VSIX (Développement)

1. Compilez l'extension :
   ```bash
   npm install
   npm run compile
   ```

2. Packagez l'extension :
   ```bash
   npm install -g vsce
   vsce package
   ```

3. Installez le fichier `.vsix` généré dans VS Code :
   - Ouvrez VS Code
   - Allez dans Extensions (`Ctrl+Shift+X`)
   - Cliquez sur `...` > `Install from VSIX...`
   - Sélectionnez le fichier `.vsix`

### Configuration

L'extension s'active automatiquement pour les fichiers `.php` et s'injecte dans la grammaire PHP existante :

1. **Sélectionnez le thème** : `Ctrl+Shift+P` → "Preferences: Color Theme" → "Ephect Dark"
2. **Configuration Intelephense** (optionnelle) :
   ```json
   {
     "ephect.enableIntelephenseCompatibility": true,
     "php.suggest.basic": false,
     "php.validate.enable": false
   }
   ```

## Syntaxe Supportée

### Directives Ephect

```php
@for %items as %item do
    // Contenu de la boucle
@done

@while %condition do
    // Boucle while
@done

@if %condition do
    // Contenu conditionnel
@elseif %otherCondition do
    // Autre condition
@else
    // Contenu alternatif  
@done

@do
    // Bloc do simple
@done

@op $variable = someFunction();  // Code PHP sur une ligne
```

### Variables et Interpolation

```php
// Variables Ephect
%variable
%object->property
%array->item->subproperty

// Interpolation dans HTML
{{ variable->property }}
{{ object->method() }}
```

### HEREDOC HTML

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

## Développement

### Structure du Projet

```
├── package.json              # Configuration de l'extension
├── language-configuration.json # Configuration du langage
├── src/
│   └── extension.ts          # Code principal TypeScript
├── syntaxes/
│   └── ephect-php.tmLanguage.json # Grammaire Textmate
└── themes/
    └── ephect-dark-color-theme.json # Thème de couleur
```

### Scripts de Build

```bash
# Installation des dépendances
npm install

# Compilation TypeScript
npm run compile

# Compilation en mode watch
npm run watch

# Package pour distribution
vsce package
```

### Contribuer

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

Pour signaler des bugs ou demander des fonctionnalités :
- [Issues GitHub](https://github.com/ephect-io/vscode-extension/issues)
- [Documentation Ephect](https://ephect.io)

---

**Note** : Cette extension est spécifiquement conçue pour le framework Ephect. Pour d'autres frameworks PHP, utilisez les extensions PHP standard de VS Code.
