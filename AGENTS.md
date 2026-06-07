# expo-tic-tac-toe

## Project Overview

This is a cross-platform mobile and web application built with **Expo SDK 56** and **React Native 0.85.3**. It targets iOS, Android, and web from a single TypeScript/React codebase. The app is a Tic-Tac-Toe game built on top of an Expo starter template, featuring file-based routing, light/dark theme support, and platform-adaptive UI components.

The entry point is `expo-router/entry` (configured in `package.json`), and all screens are defined under `src/app/` using Expo Router's file-based routing convention.

## Technology Stack

- **Runtime**: Expo ~56.0.9, React Native 0.85.3, React 19.2.3
- **Language**: TypeScript ~6.0.3 (strict mode enabled)
- **Router**: expo-router ~56.2.9 with typed routes and `unstable-native-tabs`
- **Styling**: React Native `StyleSheet` + platform-specific CSS modules for web (`*.module.css`)
- **Animations**: react-native-reanimated 4.3.1, react-native-worklets 0.8.3
- **Images**: expo-image ~56.0.10
- **Icons**: expo-symbols ~56.0.6 (SF Symbols / Material icons)
- **Gestures**: react-native-gesture-handler ~2.31.1
- **Safe Areas**: react-native-safe-area-context ~5.7.0
- **In-App Browser**: expo-web-browser ~56.0.5
- **Device Info**: expo-device ~56.0.4

## Project Structure

```
├── app.json                  # Expo configuration (plugins, experiments, native settings)
├── package.json              # Dependencies and npm scripts
├── tsconfig.json             # TypeScript config with path aliases
├── expo-env.d.ts             # Auto-generated Expo types (do not edit)
├── src/
│   ├── app/                  # File-based routing screens and layouts
│   │   ├── _layout.tsx       # Root layout: ThemeProvider + AnimatedSplashOverlay + AppTabs
│   │   ├── index.tsx         # Home screen (welcome / getting started)
│   │   ├── explore.tsx       # Explore screen (feature showcase / docs links)
│   │   └── game/
│   │       └── index.tsx     # Tic-Tac-Toe game screen
│   ├── components/           # Reusable React components
│   │   ├── app-tabs.tsx      # Native tab navigator (unstable-native-tabs)
│   │   ├── app-tabs.web.tsx  # Web tab navigator (expo-router/ui Tabs)
│   │   ├── animated-icon.tsx / .web.tsx  # Animated splash icon
│   │   ├── board.tsx         # Tic-Tac-Toe game board logic (turn alternation, move validation)
│   │   ├── themed-text.tsx   # Text component with theme + typography variants
│   │   ├── themed-view.tsx   # View component with themed background colors
│   │   ├── external-link.tsx # Link that opens in-app browser on native
│   │   ├── web-badge.tsx     # Expo version badge (web only)
│   │   ├── hint-row.tsx      # Labeled hint row UI
│   │   └── ui/
│   │       ├── square.tsx    # Tic-Tac-Toe cell button
│   │       └── collapsible.tsx  # Animated collapsible section
│   ├── hooks/
│   │   ├── use-theme.ts      # Returns current theme color object
│   │   ├── use-color-scheme.ts     # Re-exports from react-native
│   │   └── use-color-scheme.web.ts # Web-aware hydration-safe color scheme
│   ├── constants/
│   │   └── theme.ts          # Colors, fonts, spacing, layout constants
│   └── global.css            # CSS custom properties for web fonts
├── assets/
│   ├── images/               # PNGs: icons, splash, logos, tutorial, tab icons
│   └── expo.icon/            # iOS app icon assets
├── scripts/
│   └── reset-project.js      # Utility to wipe src/ and start fresh
└── ios/                      # Generated native iOS project (prebuild)
```

## Path Aliases

TypeScript path mapping is configured in `tsconfig.json`:

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

Always use these aliases for imports instead of relative paths.

## Build and Run Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run ios` | Build and run on iOS simulator / device (`expo run:ios`) |
| `npm run android` | Build and run on Android emulator / device (`expo run:android`) |
| `npm run web` | Start the web development server (`expo start --web`) |
| `npm run lint` | Run Expo's ESLint setup (`expo lint`) |
| `npm run reset-project` | Run the reset script to clear starter code |

The project uses Expo's **development build** workflow (not Expo Go). Install the dev client via `expo-dev-client`.

## Code Style Guidelines

- **TypeScript strict mode** is enabled.
- **Platform-specific code** is handled in two ways:
  1. `Platform.select()` or `Platform.OS` checks for small differences.
  2. Separate files with `.web.tsx` extension for larger platform forks (e.g., `app-tabs.web.tsx`, `animated-icon.web.tsx`, `use-color-scheme.web.ts`). Metro and Expo Router automatically resolve these.
- **Imports**: VS Code is configured to `organizeImports` and `sortMembers` on save.
- **Styling**: Prefer `StyleSheet.create()` over inline styles. Use the shared `Spacing` and `Colors` constants from `@/constants/theme` rather than hard-coding values.
- **Theming**: Always use `ThemedText` and `ThemedView` instead of raw `Text`/`View` so that light/dark mode works consistently. Access the theme object via `useTheme()`.
- **Typography**: Use the `type` prop on `ThemedText` for standard text styles (`default`, `title`, `subtitle`, `small`, `smallBold`, `link`, `linkPrimary`, `code`).

## Theme System

- Colors are defined in `src/constants/theme.ts` for both `light` and `dark` modes.
- `ThemeColor` keys: `text`, `background`, `backgroundElement`, `backgroundSelected`, `textSecondary`.
- Fonts are platform-selected (`sans`, `serif`, `rounded`, `mono`).
- Spacing scale: `half` (2), `one` (4), `two` (8), `three` (16), `four` (24), `five` (32), `six` (64).
- `BottomTabInset` is platform-aware (iOS: 50, Android: 80).
- `MaxContentWidth` is 800 for large-screen limiting.

## Routing and Navigation

- The app uses **file-based routing** via `expo-router`.
- `src/app/_layout.tsx` is the root layout. It wraps the app in a `ThemeProvider` and renders `AppTabs`.
- Tabs are registered in both `app-tabs.tsx` (native) and `app-tabs.web.tsx` (web). When adding a new tab, update **both** files.
- Current tabs: `index` (Home), `explore` (Explore), `game` (Tic-Tac-Toe).
- New screens go in `src/app/` or nested directories. Layout files are named `_layout.tsx`.

## Game Logic

The Tic-Tac-Toe implementation lives primarily in `src/components/board.tsx`:

- **Board state**: a 3×3 matrix (`string[][]`) managed with a single `useState`. Empty cells are `null`.
- **Turn alternation**: derived at render-time by counting existing X and O moves (`squares.flat().filter(...).length`) rather than storing a separate boolean flag. If `xCount > oCount`, the next player is O; otherwise X.
- **Move validation**: a cell that is already occupied (`!== null`) cannot be overwritten. This check lives inside the cell-mapping logic of `setSquares`.
- **Method chaining**: array operations (`.flat().filter().length`) are chained for conciseness.

## Testing Instructions

There is **no test framework currently installed**. The README suggests following Expo's [Unit Testing with Jest](https://docs.expo.dev/develop/unit-testing/) guide if you want to add tests.

## Security Considerations

- No sensitive environment variables or API keys are present in the codebase.
- `.env*.local` files are ignored by `.gitignore`.
- Native signing keys and provisioning profiles (`*.jks`, `*.p8`, `*.p12`, `*.key`, `*.mobileprovision`) are git-ignored.
- The `ios/` directory is **not** git-ignored in the current `.gitignore` (the pattern `/ios` only matches the root but `.gitignore` has `/ios` listed; however the working tree shows `ios/` is present). Do not commit generated native folders unless you have a specific reason.

## Expo-Specific Configuration

- `app.json` enables two experiments:
  - `typedRoutes: true` — generates typed route definitions.
  - `reactCompiler: true` — enables React Compiler.
- Plugins: `expo-router`, `expo-splash-screen`.
- The app scheme is `expotictactoe`.
- Web output is **static** (`web.output: static`).

## Docs Reference

Expo SDK 56 is still in active development. Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code that uses Expo APIs.
