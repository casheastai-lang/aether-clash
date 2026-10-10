# Light Fingers

A 2D pixel-art village thief game: knock on doors, get invited in, steal when nobody's looking,
sell to the fences in the sewers, and outrun the Watch.

## Stack

- **Language:** plain JavaScript (ES2020+), HTML and CSS, all in one file: `index.html`.
- **Libraries / frameworks:** none. No build step, no bundler, no npm dependencies.
- **Browser APIs:** Canvas 2D (all graphics are drawn in code, no image files), Web Audio (sound effects
  are synthesised), `localStorage` (save slots, achievements, skins), `requestAnimationFrame`.
- **External resource:** the "Press Start 2P" font from Google Fonts (falls back to monospace offline).
- **Multiplayer:** the Claude Artifacts runtime (`window.claude.use("room")` and `("user")`). It only exists
  when the game runs as a published Claude artifact. Anywhere else the game runs in singleplayer, and
  picking Multiplayer shows "OFFLINE - can't reach the server".
- **Runtime needed to develop:** a web browser, plus Node.js 18+ for `npm start` (a tiny local web server,
  `scripts/serve.mjs`) and `npm run build:artifact`.

## Run it

```
npm start
```

Then open http://localhost:8080. (`npm install` isn't needed - there are no dependencies.)

## Publish to Claude Artifacts

```
npm run build:artifact
```

This writes `dist/light-fingers.html`. Ask Claude Code to publish that file to the existing artifact URL
(see `CLAUDE.md`) so the link and its multiplayer settings stay the same.
