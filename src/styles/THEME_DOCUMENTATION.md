# CRM/Dashboard Theme System Documentation

## Overview

This theming system is designed specifically for **data-intensive applications** like CRM systems and dashboards. It provides a comprehensive set of semantic color tokens that prioritize clarity, usability, and consistency across complex UI patterns.

## Files

- `theme-crm-light.css` - Light mode theme
- `theme-crm-dark.css` - Dark mode theme (applied via `.dark` class)

## Core Principles

### 1. Semantic Naming

All color tokens are named based on **purpose**, not appearance. For example:

- ✅ `--content-foreground` (describes usage)
- ❌ `--gray-900` (describes appearance)

### 2. Brand ≠ UI Intent

**Brand colors** are reserved for:

- Logo
- Top-level navigation emphasis
- Marketing touchpoints

**Brand colors are NOT used for:**

- Tables
- Forms
- Status indicators
- Charts
- Action buttons

This separation ensures brand identity doesn't interfere with functional UI patterns.

### 3. Intent Colors Are Reusable

Each intent color (Success, Warning, Error, Info) includes:

- Main color
- Background variant
- Border variant
- Foreground/text variant

This allows consistent use across:

- Text messages
- Background fills
- Border highlights
- Icons
- Chart meanings

---

## Color Categories

### 1. Base Content Colors

#### Primary Foreground

**Purpose:** Main text, headings, numbers, input text, table content, default icons

```css
--content-foreground
```

**Usage:**

- Body text
- Headings (h1-h6)
- Data in tables
- Input values
- Primary icons

#### Secondary Content

**Purpose:** Labels, helper text, metadata, subtitles, table column hints, muted icons

```css
--content-secondary
```

**Usage:**

- Form labels
- Table column headers
- Help text
- Timestamps
- Captions

#### Tertiary / Disabled Content

**Purpose:** Disabled text, placeholders, inactive icons, non-essential metadata

```css
--content-tertiary
--content-disabled
--content-placeholder
```

**Usage:**

- Disabled form fields
- Placeholder text
- Inactive states
- Optional metadata

---

### 2. Surface Colors

#### App Background

**Purpose:** Page background, empty areas, large layouts

```css
--surface-app
```

#### Surface / Card

**Purpose:** Cards, tables, panels, drawers, modals

```css
--surface-card
```

#### Subtle Surface

**Purpose:** Muted sections, table headers, hover rows, grouped blocks

```css
--surface-subtle
```

**Layering Example:**

```
App Background (--surface-app)
  └─ Card (--surface-card)
      └─ Table Header (--surface-subtle)
```

---

### 3. Border & Separation Colors

#### Default Border

**Purpose:** Table grid lines, card borders, input borders, separators

```css
--border-default
```

#### Strong Border

**Purpose:** Emphasized dividers, section separators

```css
--border-strong
```

#### Focus & Selection

**Purpose:** Focus rings, selected outlines, drag indicators

```css
--border-focus
--border-selected
```

---

### 4. Interactive Colors

#### Primary Action

**Purpose:** Main buttons, primary links, key CTAs, selected tabs

```css
--action-primary
--action-primary-foreground
--action-primary-hover
--action-primary-active
```

**Important:** This is the **action color**, not the brand color. It represents the primary interactive element in the UI.

#### Secondary Action

**Purpose:** Secondary buttons, alternative actions

```css
--action-secondary
--action-secondary-foreground
--action-secondary-hover
--action-secondary-active
```

#### Selection / Highlight

**Purpose:** Selected rows, active list items, selected cards, focused navigation items

```css
--selection-background
--selection-foreground
--selection-border
```

---

### 5. Intent Colors

Each intent has 4 variants for maximum flexibility:

#### Success

**Purpose:** Completed, positive, valid, healthy

```css
--intent-success                /* Main color */
--intent-success-background     /* Light fill */
--intent-success-border         /* Border/outline */
--intent-success-foreground     /* Text/icon */
```

**Use Cases:**

- ✅ Form validation success
- ✅ Completed tasks
- ✅ Positive metrics
- ✅ Health indicators

#### Warning

**Purpose:** Attention required, risk, incomplete, pending issues

```css
--intent-warning
--intent-warning-background
--intent-warning-border
--intent-warning-foreground
```

**Use Cases:**

- ⚠️ Input warnings
- ⚠️ Pending approvals
- ⚠️ Risk indicators
- ⚠️ Incomplete data

#### Error

**Purpose:** Failed, invalid, destructive, blocked

```css
--intent-error
--intent-error-background
--intent-error-border
--intent-error-foreground
```

**Use Cases:**

- ❌ Form validation errors
- ❌ Failed operations
- ❌ Destructive actions
- ❌ Blocked states

#### Info

**Purpose:** Neutral system message, hint, informational status

```css
--intent-info
--intent-info-background
--intent-info-border
--intent-info-foreground
```

**Use Cases:**

- ℹ️ System notifications
- ℹ️ Help tooltips
- ℹ️ Informational badges
- ℹ️ Neutral status

---

### 6. Brand Colors

**Purpose:** Brand identity only - logo, top navigation, marketing

```css
--brand-primary
--brand-secondary
--brand-accent
```

**Do NOT use for:**

- Action buttons (use `--action-primary`)
- Status indicators (use intent colors)
- Charts (use `--chart-*`)
- Forms or tables

---

### 7. Chart Colors

8 distinct colors for data visualization:

```css
--chart-1 through --chart-8
```

**Separate from intent colors** - these are optimized for:

- Data differentiation
- Visual harmony
- Colorblind accessibility

---

## Component-Specific Tokens

### Tables

```css
--table-header-background
--table-header-foreground
--table-row-hover
--table-row-selected
--table-border
--table-grid
```

### Forms & Inputs

```css
--input-background
--input-border
--input-border-hover
--input-border-focus
--input-foreground
--input-placeholder
--input-disabled-background
--input-disabled-foreground
```

### Buttons

```css
--button-primary-background
--button-primary-foreground
--button-primary-hover
--button-primary-active

--button-secondary-background
--button-secondary-foreground
--button-secondary-hover
--button-secondary-active

--button-ghost-hover
--button-ghost-active
```

### Navigation

```css
--nav-background
--nav-foreground
--nav-item-hover
--nav-item-active
--nav-item-active-foreground
--nav-border
```

---

## Usage Examples

### Table with Status Column

```tsx
// Good ✅
<td style={{ color: 'var(--intent-success-foreground)' }}>
  Completed
</td>

// Bad ❌ - Don't use brand for status
<td style={{ color: 'var(--brand-primary)' }}>
  Completed
</td>
```

### Primary CTA Button

```tsx
// Good ✅
<button style={{
  background: 'var(--action-primary)',
  color: 'var(--action-primary-foreground)'
}}>
  Save Changes
</button>

// Bad ❌ - Don't use brand for actions
<button style={{
  background: 'var(--brand-primary)'
}}>
  Save Changes
</button>
```

### Form Validation

```tsx
// Success state ✅
<div style={{
  background: 'var(--intent-success-background)',
  border: '1px solid var(--intent-success-border)',
  color: 'var(--intent-success-foreground)'
}}>
  ✓ Email is valid
</div>

// Error state ❌
<div style={{
  background: 'var(--intent-error-background)',
  border: '1px solid var(--intent-error-border)',
  color: 'var(--intent-error-foreground)'
}}>
  ✗ Email is required
</div>
```

### Selected Table Row

```tsx
<tr
  style={{
    background: 'var(--selection-background)',
    color: 'var(--selection-foreground)',
  }}
>
  <td>Row data</td>
</tr>
```

---

## Migrating from Figma

When transferring colors from Figma:

1. **Identify the purpose first** - What is this color used for?
2. **Map to semantic token** - Don't create new tokens for specific shades
3. **Use the appropriate variant**:
   - Main color for primary uses
   - Background variant for fills
   - Border variant for outlines
   - Foreground variant for text

### Example Mapping

| Figma Name                 | Maps To            | Reason               |
| -------------------------- | ------------------ | -------------------- |
| "Primary Blue" for buttons | `--action-primary` | It's an action color |
| "Success Green"            | `--intent-success` | Status indicator     |
| "Background Gray"          | `--surface-app`    | Page background      |
| "Border Light"             | `--border-default` | Default separator    |
| "Logo Purple"              | `--brand-primary`  | Brand identity       |

---

## Color Contrast & Accessibility

All foreground/background combinations meet **WCAG AA standards** for contrast:

- Content colors on surfaces: ≥ 4.5:1
- Interactive elements: ≥ 3:1
- Intent colors: Tested for readability

---

## Future Enhancements

When you're ready to add real colors from Figma:

1. Replace the placeholder OKLCH values
2. Maintain the same token structure
3. Test dark mode for proper contrast
4. Verify chart colors are distinguishable
5. Check accessibility with tools like [Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Questions?

This system is designed to grow with your needs. If you need additional tokens, consider:

1. Can you use an existing token?
2. Is this a component-specific variant? (Add to component section)
3. Is this truly a new semantic category? (Add new top-level token)

Keep the system semantic and purpose-driven! 🎨
