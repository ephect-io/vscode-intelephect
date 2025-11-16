## [0.1.2] - 2024-11-16

### ⭐ Compatibilité Intelephense

- **Architecture d'injection de grammaire** : N'interfère plus avec Intelephense
- **Détection automatique** d'Intelephense avec mode compatibilité
- **Messages informatifs** pour guider l'utilisateur
- **Configuration dédiée** : `ephect.enableIntelephenseCompatibility`
- **Documentation complète** de compatibilité dans `INTELEPHENSE_COMPATIBILITY.md`

### Technique

- Migration vers l'injection de grammaire (`injectTo: ["source.php"]`)
- Suppression du langage personnalisé `ephect-php`
- Code TypeScript pour la gestion de compatibilité
- Préservation complète des fonctionnalités PHP/Intelephense

## [0.1.1] - 2024-11-16

### Ajouté

- Support des directives Ephect supplémentaires :
  - `@while` : Boucles conditionnelles
  - `@elseif` : Conditions alternatives
  - `@do` : Blocs do simples
  - `@op` : Code PHP sur une ligne
- Exemples avancés avec toutes les directives
- Documentation étendue pour les nouvelles directives

### Amélioré

- Grammaire Textmate étendue pour couvrir toutes les directives Ephect
- Coloration spécialisée pour le code PHP inline dans `@op`
- Support des constructions complexes et imbriquées

## [0.1.0] - 2024-11-16

### Ajouté

- Coloration syntaxique pour les templates Ephect Framework
- Support des blocs HEREDOC HTML avec coloration HTML complète
- Reconnaissance des directives Ephect de base (@for, @if, @else, @done)
- Coloration des variables Ephect (%variable->property)
- Support de l'interpolation de variables ({{ variable }})
- Thème de couleur "Ephect Dark" optimisé
- Configuration de langage pour Ephect PHP
- Documentation complète avec exemples

### Fonctionnalités

- Grammaire Textmate complète pour la syntaxe Ephect
- Coloration différentielle pour PHP standard vs Ephect
- Délimiteurs d'interpolation colorés
- Support des opérateurs de comparaison dans les directives
- Attributs HTML colorés dans les blocs HEREDOC

### Technique

- Extension TypeScript compilée
- Configuration VS Code avec activation automatique
- Support des fichiers .php avec syntaxe Ephect
- Thème sombre avec couleurs contrastées pour la lisibilité
