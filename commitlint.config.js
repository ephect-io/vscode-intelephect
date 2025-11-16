module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type doit être présent
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nouvelle fonctionnalité
        'fix', // Correction de bug
        'docs', // Documentation seulement
        'style', // Formatage, pas de changement de code
        'refactor', // Refactoring (ni feat ni fix)
        'perf', // Amélioration des performances
        'test', // Ajout ou correction de tests
        'chore', // Maintenance (deps, config, etc.)
        'ci', // Changements CI
        'build', // Changements système de build
        'revert', // Revert d'un commit précédent
      ],
    ],

    // Scope optionnel mais spécifique au projet
    'scope-enum': [
      2,
      'always',
      [
        'syntax', // Grammaire et règles de syntaxe
        'theme', // Thèmes de couleur
        'compat', // Compatibilité avec autres extensions
        'config', // Configuration extension
        'grammar', // Fichiers tmLanguage
        'inject', // Injection de grammaire
        'docs', // Documentation
        'example', // Fichiers d'exemple
        'deps', // Dépendances
      ],
    ],

    // Le type doit être en minuscules
    'type-case': [2, 'always', 'lower-case'],

    // La description doit être en minuscules
    'subject-case': [2, 'always', 'lower-case'],

    // Pas de point final dans la description
    'subject-full-stop': [2, 'never', '.'],

    // La description ne doit pas être vide
    'subject-empty': [2, 'never'],

    // Le type ne doit pas être vide
    'type-empty': [2, 'never'],

    // Longueur maximale du header (type + scope + description)
    'header-max-length': [2, 'always', 72],

    // Longueur maximale de la description
    'subject-max-length': [2, 'always', 50],

    // Le corps doit commencer par une ligne vide
    'body-leading-blank': [1, 'always'],

    // Le footer doit commencer par une ligne vide
    'footer-leading-blank': [1, 'always'],

    // Longueur maximale des lignes du corps
    'body-max-line-length': [2, 'always', 72],

    // Longueur maximale des lignes du footer
    'footer-max-line-length': [2, 'always', 72],
  },
};
