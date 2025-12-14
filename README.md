# Shendu UI

A modern React UI component library built with TailwindCSS v4 and Shadcn patterns.

## Features

- 🎨 **TailwindCSS v4** - CSS-first configuration with design tokens
- ⚛️ **React 18/19** - Built for modern React applications
- 📦 **Tree-shakeable** - Only bundle what you use
- 🔧 **TypeScript** - Full type safety out of the box
- 📖 **Storybook 10** - Interactive component documentation
- ✅ **Tested** - Unit tests with Vitest, visual tests with Playwright
- 🎯 **Accessible** - Built on Radix UI primitives

## Installation

```bash
# With npm
npm install @shendu-ui/core

# With yarn
yarn add @shendu-ui/core

# With pnpm
pnpm add @shendu-ui/core
```

## Setup

### 1. Import styles

Add the styles to your application entry point:

```tsx
// In your app's entry point (e.g., main.tsx, _app.tsx)
import '@shendu-ui/core/styles';
```

Or import the CSS in your main stylesheet:

```css
@import '@shendu-ui/core/styles';
```

### 2. Configure TailwindCSS (optional)

If you want to use TailwindCSS v4 in your project, make sure to configure the theme to match:

```css
/* globals.css */
@import 'tailwindcss';

@theme {
  /* Shendu UI uses these design tokens */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
  /* ... see full theme in our docs */
}
```

## Usage

```tsx
import { Button } from '@shendu-ui/core';

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@shendu-ui/core';

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// States
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button>

// As child (for composition with Link components)
<Button asChild>
  <a href="/page">Go to page</a>
</Button>
```

## Development

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/shendu-ui.git
cd shendu-ui

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm run test

# Build library
npm run build:lib
```

### Scripts

| Script                  | Description                      |
| ----------------------- | -------------------------------- |
| `npm run dev`           | Start Vite dev server            |
| `npm run storybook`     | Start Storybook                  |
| `npm run build:lib`     | Build the library for publishing |
| `npm run test`          | Run unit tests in watch mode     |
| `npm run test:run`      | Run unit tests once              |
| `npm run test:coverage` | Run tests with coverage          |
| `npm run test:e2e`      | Run Playwright visual tests      |
| `npm run lint`          | Run ESLint                       |

## Publishing

This library uses [Changesets](https://github.com/changesets/changesets) for versioning.

### Creating a changeset

```bash
npx changeset
```

### Publishing (CI)

The GitHub Actions workflow automatically:

1. Creates a "Release PR" when changesets are added
2. Publishes to GitHub Packages when the PR is merged

### Manual publishing

```bash
npm run build:lib
npm publish
```

## License

MIT © [Your Name](https://github.com/your-username)
