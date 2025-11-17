# Intelephect

Intelephect extends the PHP editing experience in VS Code with support for Ephect framework
templates.

## About the Ephect framework

Ephect is a PHP-first presentation framework focused on highly interactive server-driven UI.

Ephect blends a lightweight PHP framework with a JavaScript companion library so you can compose
interactive interfaces from the backend.

- **Component-first templating** – Build reusable HTML-like components in PHP, cascade them
  together, and inherit layouts via named `<Slot>` placeholders.
- **Hooks-inspired data flow** – Manage state with familiar helpers such as `useState`, `useStore`,
  `useMemory` mirroring modern frontend patterns.
- **CLI productivity tooling** – The `php use` command builds and serves Ephect apps, providing fast
  webpack-driven asset builds.
- **Source & docs** – Dive into the full framework README and examples at
  [github.com/ephect-io/framework](https://github.com/ephect-io/framework).

## Key capabilities

- 🔍 **Template-aware highlighting** – Applies HTML and Ephect-specific scopes on
  `<<< HTML ... HTML` HEREDOC blocks.
- 🧠 **Smart directive support** – Colours Ephect control keywords such as `@if`, `@for`, `@do`,
  `@done`, etc.
- 🧵 **Variable interpolation** – Highlights Ephect variables (`%user->name`) and liquid-style
  expressions (`{{ user->email }}`) for quick visual scanning.
- 🤝 **Intelephense friendly** – Works alongside the `bmewburn.vscode-intelephense-client`
  extension; the compatibility toggle is enabled by default.
- 🎨 **Ephect Dark theme** – Ships with a matching dark theme tuned for Ephect templates and PHP
  development.

## Usage

Wrap your template markup in an Ephect HEREDOC block and edit it like any other PHP file:

```php
<?php

namespace QuickStart;

function MyComponent($props): string
{
    $user = $props->user;
    $isActive = $user->isActive;

    return (<<< HTML
        <div class="user-card">
            <h2>{{ user->name }}</h2>
            @if %isActive do
                <span class="badge active">Active</span>
            @done
        </div>
    HTML);
}

```

Learn more at [ephect.io](https://ephect.io) and explore the official open-source projects on GitHub
under the [@ephect-io](https://github.com/ephect-io) organization.
