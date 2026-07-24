# Expo Tic-Tac-Toe

A cross-platform mobile and web application built with **Expo SDK 57** and **React Native 0.86.0**. Play Tic-Tac-Toe against an AI opponent and watch every exchange in a chat-style log, with light/dark theme support and native tab navigation.

## Screenshots

| Game start | AI thinking (Game) | Your move (Game) | Chat log (AI) | AI thinking (AI) |
|---|---|---|---|---|
| ![Game start](docs/screenshots/tic-tac-toe-start-1.png) | ![AI thinking in the Game tab](docs/screenshots/tic-tac-toe-ai-thinking-game-2.png) | ![Your move in the Game tab](docs/screenshots/tic-tac-toe-moves-game-3.png) | ![Chat log in the AI tab](docs/screenshots/tic-tac-toe-moves-chat-4.png) | ![AI thinking in the AI tab](docs/screenshots/tic-tac-to-ai-thinking-chat-5.png) |

## Overview

- **Home** — Welcome screen with getting-started hints
- **Explore** — Feature showcase of the Expo starter template (routing, images, themes, animations)
- **Game** — Tic-Tac-Toe against an AI opponent, with move validation and winner detection
- **AI** — Chat-style log of every move sent to and received from the AI, with timestamps

## Tech Stack

| Technology | Version |
|-----------|---------|
| Expo | ^57.0.0 |
| React Native | 0.86.0 |
| React | 19.2.3 |
| TypeScript | ~6.0.3 |
| expo-router | ~57.0.8 |
| react-native-reanimated | 4.5.0 |
| react-native-gesture-handler | ~2.32.0 |
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
│   │   ├── _layout.tsx       # Root layout: ThemeProvider + AiProvider + AnimatedSplashOverlay + AppTabs
│   │   ├── index.tsx         # Home screen
│   │   ├── explore.tsx       # Explore screen
│   │   ├── game/
│   │   │   └── index.tsx     # Tic-Tac-Toe game screen
│   │   ├── ai/
│   │   │   └── index.tsx     # AI Chat screen (chat-style log of AI exchanges)
│   │   └── api/
│   │       └── chat+api.ts   # API route: POST handler streaming the AI move
│   ├── components/           # Reusable React components
│   │   ├── app-tabs.tsx      # Native tab navigator (unstable-native-tabs)
│   │   ├── app-tabs.web.tsx  # Web tab navigator (expo-router/ui Tabs)
│   │   ├── animated-icon.tsx / .web.tsx  # Animated splash icon
│   │   ├── board.tsx         # Tic-Tac-Toe board UI, state management and AI moves
│   │   ├── themed-text.tsx   # Text component with theme + typography variants
│   │   ├── themed-view.tsx   # View component with themed background colors
│   │   ├── external-link.tsx # Link that opens in-app browser on native
│   │   ├── web-badge.tsx     # Expo version badge (web only)
│   │   ├── hint-row.tsx      # Labeled hint row UI
│   │   └── ui/
│   │       ├── square.tsx    # Tic-Tac-Toe cell button
│   │       ├── my-button.tsx # Reusable pressable button
│   │       └── collapsible.tsx  # Animated collapsible section
│   ├── context/
│   │   └── ai.tsx            # AiProvider: shared useObject state + chat message history
│   ├── utils/
│   │   └── game-winner.ts    # Win-condition checker for Tic-Tac-Toe
│   ├── hooks/
│   │   ├── use-theme.ts      # Returns current theme color object
│   │   ├── use-color-scheme.ts
│   │   └── use-color-scheme.web.ts
│   ├── constants/
│   │   ├── theme.ts          # Colors, fonts, spacing, layout constants
│   │   └── matrix.ts         # Zod schema for the 3x3 board matrix ("X" | "O" | null)
│   └── global.css            # CSS custom properties for web fonts
├── assets/
│   ├── images/               # Icons, splash, logos, tutorial, tab icons
│   └── expo.icon/            # iOS app icon assets
├── docs/
│   └── screenshots/          # App screenshots used in this README
├── scripts/
│   └── reset-project.js      # Utility to wipe src/ and start fresh
└── ios/                      # Generated native iOS project (prebuild)
```

## Getting Started

1. Install dependencies: `bun install` (the project uses bun; `bun.lock` is the only lockfile)
2. Create a `.env.local` file with your [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) key:

   ```
   AI_GATEWAY_API_KEY=your_key_here
   ```

3. Start the dev server: `npm start` (or `npm run ios` / `npm run android` / `npm run web`)

The AI API route (`/api/chat`) will not work without `AI_GATEWAY_API_KEY`. In production, the app also requires `EXPO_PUBLIC_API_BASE_URL` pointing to the deployed API.

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
3. **Game** (`/game`) — Tic-Tac-Toe vs AI
4. **AI** (`/ai`) — AI chat log

On native, tabs are handled by `unstable-native-tabs`; on web by `expo-router/ui Tabs`. When adding a new tab, update **both** `app-tabs.tsx` and `app-tabs.web.tsx`.

## Features

### Tic-Tac-Toe vs AI

- 3×3 board with state managed by `useState`
- The human plays **X**, the AI plays **O** via the `/api/chat` endpoint
- Turn alternation derived by counting existing moves
- Move validation: occupied cells cannot be overwritten
- The AI's move is applied when the response stream completes
- Response state feedback: "AI is thinking..." spinner while waiting, "Your move" when idle; board cells are disabled during the AI's turn and after a win
- Winner detection via `calculateWinner()` in `src/utils/game-winner.ts`
- AI errors are shown below the board
- "Restart Game" button (disabled when no moves have been made) — also clears the AI chat log

### AI Chat Log

- Shared message history in `AiProvider` (`src/context/ai.tsx`), built on `experimental_useObject` from `@ai-sdk/react`
- Every request and AI response is recorded as a chat message — including moves made from the Game tab
- Chat bubbles with timestamps (`HH:mm`, device locale): user right/blue, AI left/green
- "AI is thinking..." typing bubble while the response streams; input disabled during the wait
- Structured output validated with the same zod schema on client and server (`src/constants/matrix.ts`)
- Uses `expo/fetch` for network requests and `generateAPIUrl('/api/chat')` as the endpoint
- The API route streams the move with `streamText` + `Output.object` (model: `anthropic/claude-3-haiku` via Vercel AI Gateway)

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

- [Expo SDK 57 docs](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [AI SDK React](https://sdk.vercel.ai/docs/ai-sdk-ui/overview)
