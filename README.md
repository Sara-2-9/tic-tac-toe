# Expo Tic-Tac-Toe

A cross-platform mobile and web application built with **Expo SDK 56** and **React Native 0.85.3**. It features a fully functional Tic-Tac-Toe game and an integrated AI chat screen, with light/dark theme support and native tab navigation.

## Overview

- **Home** — Welcome screen with getting-started hints
- **Explore** — Feature showcase of the Expo starter template (routing, images, themes, animations)
- **Game** — Tic-Tac-Toe with turn logic, move validation, and winner detection
- **AI** — AI-powered chat using `@ai-sdk/react`

## Tech Stack

| Technology | Version |
|-----------|---------|
| Expo | ~56.0.9 |
| React Native | 0.85.3 |
| React | 19.2.3 |
| TypeScript | ~6.0.3 |
| expo-router | ~56.2.9 |
| react-native-reanimated | 4.3.1 |
| react-native-gesture-handler | ~2.31.1 |
| @ai-sdk/react | ^3.0.199 |
| ai | ^6.0.197 |
| zod | ^4.4.3 |

## Project Structure

```
├── app.json                  # Expo configuration (plugins, experiments, native settings)
├── package.json              # Dependencies and npm scripts
├── tsconfig.json             # TypeScript config with path aliases
├── utils.ts                  # Shared utilities (generateAPIUrl)
├── src/
│   ├── app/                  # File-based routing screens and layouts
│   │   ├── _layout.tsx       # Root layout: ThemeProvider + AnimatedSplashOverlay + AppTabs
│   │   ├── index.tsx         # Home screen
│   │   ├── explore.tsx       # Explore screen
│   │   ├── game/
│   │   │   └── index.tsx     # Tic-Tac-Toe game screen
│   │   └── ai/
│   │       └── index.tsx     # AI Chat screen
│   ├── components/           # Reusable React components
│   │   ├── app-tabs.tsx      # Native tab navigator (unstable-native-tabs)
│   │   ├── app-tabs.web.tsx  # Web tab navigator (expo-router/ui Tabs)
│   │   ├── animated-icon.tsx / .web.tsx  # Animated splash icon
│   │   ├── board.tsx         # Tic-Tac-Toe board UI and state management
│   │   ├── themed-text.tsx   # Text component with theme + typography variants
│   │   ├── themed-view.tsx   # View component with themed background colors
│   │   ├── external-link.tsx # Link that opens in-app browser on native
│   │   ├── web-badge.tsx     # Expo version badge (web only)
│   │   ├── hint-row.tsx      # Labeled hint row UI
│   │   └── ui/
│   │       ├── square.tsx    # Tic-Tac-Toe cell button
│   │       ├── my-button.tsx # Reusable pressable button
│   │       └── collapsible.tsx  # Animated collapsible section
│   ├── utils/
│   │   └── game-winner.ts    # Win-condition checker for Tic-Tac-Toe
│   ├── hooks/
│   │   ├── use-theme.ts      # Returns current theme color object
│   │   ├── use-color-scheme.ts
│   │   └── use-color-scheme.web.ts
│   ├── constants/
│   │   └── theme.ts          # Colors, fonts, spacing, layout constants
│   └── global.css            # CSS custom properties for web fonts
├── assets/
│   ├── images/               # Icons, splash, logos, tutorial, tab icons
│   └── expo.icon/            # iOS app icon assets
├── scripts/
│   └── reset-project.js      # Utility to wipe src/ and start fresh
└── ios/                      # Generated native iOS project (prebuild)
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run ios` | Build and run on iOS simulator / device |
| `npm run android` | Build and run on Android emulator / device |
| `npm run web` | Start the web development server |
| `npm run lint` | Run Expo's ESLint setup (`expo lint`) |
| `npm run reset-project` | Run the reset script to clear starter code |

This project uses the **development build** workflow (not Expo Go). Install the dev client via `expo-dev-client`.

## Navigation

The app uses `expo-router` file-based routing with 4 tabs:

1. **Home** (`/`) — Landing screen
2. **Explore** (`/explore`) — Feature showcase
3. **Game** (`/game`) — Tic-Tac-Toe
4. **AI** (`/ai`) — AI Chat

On native, tabs are handled by `unstable-native-tabs`; on web by `expo-router/ui Tabs`. When adding a new tab, update **both** `app-tabs.tsx` and `app-tabs.web.tsx`.

## Features

### Tic-Tac-Toe

- 3×3 board with state managed by `useState`
- Turn alternation (X / O) derived by counting existing moves
- Move validation: occupied cells cannot be overwritten
- Winner detection via `calculateWinner()` in `src/utils/game-winner.ts`
- "Restart Game" button (disabled when no moves have been made)

### AI Chat

- Chat interface built with `@ai-sdk/react` and `DefaultChatTransport`
- Uses `expo/fetch` for network requests
- Endpoint configured via `generateAPIUrl('/api/chat')`
- In production, requires the `EXPO_PUBLIC_API_BASE_URL` environment variable

## Theming

Automatic light/dark mode support via `useColorScheme()`. Colors are defined in `src/constants/theme.ts`:
- `text`, `background`, `backgroundElement`, `backgroundSelected`, `textSecondary`

Always use `ThemedText` and `ThemedView` instead of raw components to ensure consistent theming.

## Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Development Notes

- TypeScript **strict mode** is enabled
- For platform-specific differences, use `.web.tsx` or `Platform.select()`
- Prefer `StyleSheet.create()` and the shared `Spacing` / `Colors` constants from `@/constants/theme`
- Web output is **static** (`web.output: static`)
- `typedRoutes: true` and `reactCompiler: true` are enabled in `app.json`

## Documentation

- [Expo SDK 56 docs](https://docs.expo.dev/versions/v56.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [AI SDK React](https://sdk.vercel.ai/docs/ai-sdk-ui/overview)
