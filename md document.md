# Project Documentation: Pomodoro Landing Page & App

## 1. Project Overview

This document outlines the structure, styling, and functionality of the single-file Pomodoro web application. The project is designed as a professional, feature-rich landing page that seamlessly integrates a fully functional Pomodoro timer application. The entire project is self-contained within a single HTML file.

### Key Features:
- **Professional Landing Page:** A modern, responsive landing page to introduce the app and its features.
- **Integrated Pomodoro Timer:** A fully functional timer application built directly into the page.
- **Global Light/Dark Theme:** A single toggle controls the theme for the entire page and app.
- **State Persistence:** User settings and tasks are saved to the browser's `localStorage`, so data is not lost on refresh.
- **Advanced Timer Features:**
  - Customizable durations for Focus, Short Break, and Long Break.
  - Automatic long breaks after a cycle of four sessions.
  - Session counter (`Session 1 of 4`).
- **Task Management:** A simple to-do list integrated with the timer.
- **Ambient Sounds:** Looping background audio (rain, cafe) to aid focus.
- **Interactive Modals:** Separate, theme-aware modals for Settings, Login/Signup, and Sound Selection.

---

## 2. File Structure (Single-File Architecture)

The entire application is contained in one `index.html` file. Its internal structure is organized as follows:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <!-- Metadata, Google Fonts, and all CSS -->
    <style>
        /* ... CSS Rules ... */
    </style>
</head>
<body>
    <!-- All visible HTML content -->
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    
    <!-- Modals (initially hidden) -->
    <div id="settings-modal">...</div>
    <div id="login-modal-overlay">...</div>

    <!-- All JavaScript logic -->
    <script>
        /* ... JavaScript Code ... */
    </script>
</body>
</html>
```

---

## 3. CSS Architecture (`<style>` section)

The styling is designed to be themeable, responsive, and maintainable, even within a single `<style>` block.

### 3.1. CSS Variables and Theming
- **Theming Core:** The theme system is controlled by CSS variables defined in `:root` for the default (light) theme.
- **Dark Mode:** A `body.dark-theme` class selector overrides the root variables to apply the dark theme. This single class switch changes the entire page's appearance.
- **Usage:** Colors, fonts, and backgrounds are consistently referenced using `var(--variable-name)`, e.g., `background-color: var(--bg-light);`.

### 3.2. Layout & Responsiveness
- **Layout:** The primary layout tools are **CSS Grid** (for the main navigation bar and feature grid) and **Flexbox** (for component-level alignment).
- **Responsiveness:** Media queries (`@media (max-width: ...px)`) are used to adapt the layout for tablet and mobile devices. Key changes include collapsing the navigation, stacking feature cards vertically, and adjusting font sizes.

### 3.3. Component Styling
- **Landing Page Components:** Sections like `.feature-card` and `.hero-section` have distinct, self-contained styles.
- **Unified App Design:** The `.pomodoro-container` has been intentionally styled to look like a premium "card," consistent with the rest of the landing page. It uses the same global CSS variables (`--bg-white`, `--primary-color`, etc.) to ensure it automatically adapts to the theme.
- **Modals:** All modals (`.modal-overlay`, `.login-modal`) use a consistent structure. Visibility is controlled by adding/removing a `.visible` class, which changes `opacity` and `visibility` for smooth transitions.

---

## 4. HTML Structure (`<body>` section)

The `<body>` is organized into semantic sections for clarity.

- **`<header class="main-header">`**: Contains the main navigation, including the logo, page links (`Features`, `App`), the global theme toggle button, and the Login button.
- **`<main>`**: Contains all primary page content, divided into sections:
  - **`<section class="hero-section">`**: The main "above the fold" content with the primary value proposition and call-to-action.
  - **`<section class="features-section">`**: A grid-based layout showcasing the app's key features. The content of this section is specifically updated to reflect the advanced timer capabilities.
  - **`<section id="pomodoro-app-section">`**: The container for the interactive Pomodoro timer application itself.
  - **`<section id="why-signup">`**: A dedicated section explaining the benefits of creating an account (saving data, tracking history).
- **`<footer class="main-footer">`**: A professional, multi-column footer containing branding, site navigation, social media links, and copyright information.
- **Modals**:
  - **`<div id="settings-modal">`**: A modal for configuring timer durations.
  - **`<div id="login-modal-overlay">`**: A modal for user login and signup, with dynamic fields for each state.

---

## 5. JavaScript Functionality (`<script>` section)

The script is executed on `DOMContentLoaded` and is logically separated into different modules of functionality.

### 5.1. Global & Landing Page Scripts
- **Theme Switching:** The `switchTheme()` function toggles the `dark-theme` class on the `<body>` element.
- **Smooth Scrolling:** The main call-to-action buttons use a simple event listener to smoothly scroll the user to the Pomodoro app section.
- **Login/Signup Modal Logic:**
  - `showLoginModal(visible, mode)` controls the modal's visibility.
  - The `mode` parameter (`'login'` or `'signup'`) toggles a `.signup-mode` class on the modal to dynamically show/hide the extra input fields (Email, Confirm Password) and change the title/button text.

### 5.2. Pomodoro App Core Logic

This is the main engine of the application.

#### 5.2.1. State Management
- **Persistence:** The app's state is managed through a single object which is saved to and loaded from **`localStorage`** via `saveState()` and `loadState()` functions. This ensures user settings and tasks persist across sessions.
- **Key State Variables:**
  - `workMinutes`, `shortBreakMinutes`, `longBreakMinutes`: User-configurable timer durations.
  - `pomodoroCount`: Tracks the number of completed focus sessions.
  - `tasks`: An array of task objects (`{ id, text, completed }`).
  - `isRunning`, `isWorkSession`: Booleans to track the current state of the timer.

#### 5.2.2. Timer Engine
- **`tick()`**: The main `setInterval` function. It decrements `secondsRemaining` by one every second and updates the display.
- **`switchSession()`**: Called when the timer reaches zero. It handles the logic for switching between focus, short break, and long break sessions based on the `pomodoroCount`. It also triggers the notification sound.
- **`toggleTimer()`**: Starts and stops the timer interval. Crucially, it also calls `initAudio()` on the very first start to ensure sounds can play reliably.
- **`resetTimer()`**: Resets the current session to its starting time and stops the timer.

#### 5.2.3. Feature Modules
- **Task Management:**
  - `addTask()`: Adds a new task to the `tasks` array from the input field.
  - `renderTasks()`: Clears and redraws the entire task list based on the current `tasks` array.
  - `handleTaskClick()`: An event delegate on the `<ul>` that handles both completing and deleting tasks.
- **Settings Management:**
  - The settings modal (`#settings-modal`) allows users to input new durations.
  - `saveSettings()` updates the state variables, calls `saveState()`, and resets the timer with the new values.
- **Sound Management:**
  - **The Autoplay Fix:** The `initAudio()` function is called only once on the first "Start" click. It `.load()`s all audio files, which "unlocks" the browser's audio context and prevents playback issues.
  - `toggleSound()`: Manages the playing and pausing of the selected ambient sound.

This documentation provides a comprehensive map of the project's components and their interactions, designed for efficient understanding by an AI or a new developer.