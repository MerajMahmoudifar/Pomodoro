# Pomodoro App Design System

This document outlines the core design principles, tokens, and components that constitute the visual identity of the Pomodoro Landing Page & App. Its purpose is to ensure consistency, maintainability, and a cohesive user experience.

## 1. Guiding Principles

Our design is guided by three core principles:

-   **Calm & Focused:** The interface should reduce cognitive load, not add to it. We use generous spacing, a muted color palette, and clear typography to create a tranquil environment conducive to deep work.
-   **Cohesive & Unified:** Every component, from a button on the landing page to the timer in the app, should feel like it belongs to the same family. The experience must be seamless.
-   **Modern & Minimalist:** We prioritize clarity and function. We use clean lines, subtle shadows, and a minimalist aesthetic to build a professional and trustworthy product.

---

## 2. Design Tokens (Foundations)

These are the fundamental, indivisible values that build our interface.

### 2.1. Colors

Our color system is theme-aware, using CSS variables that adapt to light and dark modes.

| Use Case           | Token Name          | Light Mode Value | Dark Mode Value  |
| ------------------ | ------------------- | ---------------- | ---------------- |
| **Primary/Accent** | `--primary-color`   | `#6d28d9`        | `#8b5cf6`         |
| **Primary Hover**  | `--primary-color-light`| `#8b5cf6`        | `#a78bfa`         |
| **Stop State**     | `--stop-color`      | `#e11d48`        | `#f43f5e`         |
|                    |                     |                  |                  |
| **Background**     | `--bg-light`        | `#f9fafb`        | `#111827`         |
| **Card/Surface**   | `--bg-white`        | `#ffffff`        | `#1f2937`         |
|                    |                     |                  |                  |
| **Primary Text**   | `--dark-gray`       | `#1f2937`        | `#f9fafb`         |
| **Secondary Text** | `--medium-gray`     | `#6b7280`        | `#9ca3af`         |
| **Borders**        | `--light-gray`      | `#e5e7eb`        | `#374151`         |
|                    |                     |                  |                  |
| **Icon Background**| `--icon-bg-color`   | `#ede9fe`        | `#4338ca`         |
| **Abstract UI**    | `--accent-blue`     | `#60a5fa`        | `#3730a3`         |

### 2.2. Typography

We use a single font family for consistency and readability across all text.

-   **Font Family:** `'Vazirmatn', sans-serif`
-   **Source:** Google Fonts

#### Type Scale

| Element        | Font Size (Clamp for responsiveness) | Font Weight |
| -------------- | ------------------------------------ | ----------- |
| Hero Headline  | `clamp(2.5rem, 5vw, 4rem)`           | `800`       |
| Section `<h2>` | `2.5rem`                             | `800`       |
| Card `<h3>`    | `1.5rem`                             | `700`       |
| Body Paragraph | `1rem` - `1.25rem`                   | `400`       |
| Button/Nav     | `1rem`                               | `500` - `700`|
| Timer Display  | `clamp(5rem, 22vw, 7.5rem)`          | `800`       |

### 2.3. Spacing

We use a consistent spacing scale based on `rem` units to create a harmonious rhythm throughout the page.

-   **Base Unit:** `1rem` (typically 16px)
-   **Scale:** `0.5rem`, `1rem`, `1.5rem`, `2rem`, `2.5rem`, `4rem`, `6rem`

### 2.4. Border Radius & Shadows

These tokens define the shape and elevation of our components.

-   **Buttons & Inputs:** `8px`
-   **Modals & Cards:** `15px` - `20px`
-   **Icons (Circular):** `50%`
-   **Standard Shadow:** `box-shadow: 0 10px 20px rgba(0,0,0,0.05);` (subtler on hover/active)

---

## 3. Components

These are the reusable building blocks of our interface, constructed from the design tokens.

### 3.1. Buttons

-   **Description:** The primary interactive element. All buttons share base styles for padding, border-radius, and transitions.
-   **Selector:** `.btn`
-   **Variations:**
    -   `.btn-primary`: Solid background (`--primary-color`). Used for primary calls-to-action.
    -   `.btn-secondary`: White/dark background with a border. Used for secondary actions like Login.
    -   `.top-icon`: Circular, bordered buttons used for app controls (Settings, Sound).

### 3.2. Cards

-   **Description:** The standard container for grouped content.
-   **Selectors:** `.feature-card`, `.pomodoro-container`
-   **Core Styles:**
    -   `background-color: var(--bg-white);`
    -   `border-radius: 20px;`
    -   `padding: 2.5rem;`
    -   `box-shadow: ...;`
    -   `border: 1px solid var(--light-gray);`

### 3.3. Modals

-   **Description:** Overlays used for focused interactions like settings or login.
-   **Selectors:** `.modal-overlay`, `.modal`, `.login-modal`
-   **Core Styles:**
    -   A semi-transparent overlay to cover the page.
    -   A centered content box with a background (`--modal-bg` or `--bg-white`), padding, border-radius, and shadow.
    -   Visibility is controlled by a `.visible` class.

### 3.4. Form Inputs

-   **Description:** Standard fields for user input in forms (Login, Tasks, Settings).
-   **Selector:** `input` (within modals or forms)
-   **Core Styles:**
    -   Consistent padding, border-radius (`8px`), and font styles.
    -   A clear `:focus` state with a colored box-shadow for accessibility.
    -   Uses theme variables for background, border, and text color.