# Light Fingers

A 2D pixel-art village thief game: knock on doors, get invited in, steal when nobody's looking,
sell to the fences in the sewers, and outrun the Watch.

## Stack

- **Language:** plain JavaScript (ES2020+), HTML and CSS, all in one file: `index.html`.
- **Libraries / frameworks:** none. No build step, no bundler, no npm dependencies.
- **Browser APIs:** Canvas 2D (all graphics are drawn in code, no image files), Web Audio (sound effects
  are synthesised), `localStorage` (save slots, achievements, skins), `requestAnimationFrame`.
- **External resource:** the "Press Start 2P" font from Google Fonts (falls back to monospace offline).
- **Multiplayer and cloud saves:** the Claude Artifacts runtime (`window.claude.use("room")`, `("user")`, `("db")`).
  It only exists on the published link. Running locally, Multiplayer joins a local test server shared by your
  open tabs, and saves stay in that browser.
- **Moving a game between copies:** Save game > Get a save code, then Load game > Paste a save code.
- **Runtime needed to develop:** a web browser, plus Node.js 18+ for `npm start` (a tiny local web server,
  `scripts/serve.mjs`) and `npm run build:artifact`.

## One link

**Play and share:** https://claude.ai/artifact/T8myLiyYTPiXW76Z9Gisvg

That link is the real game: the multiplayer server, cloud saves (your save slots, achievements and last
game follow your claude.ai account to any computer) and every update. The local copy below is only for
building and testing.

## Run it

```
npm start
```

Then open http://localhost:8080. (`npm install` isn't needed - there are no dependencies.)
To test multiplayer, open a second tab and pick Multiplayer in both.

## Publish to Claude Artifacts

```
npm run build:artifact
```

This writes `dist/light-fingers.html`. Ask Claude Code to publish that file to the existing artifact URL
(see `CLAUDE.md`) so the link and its multiplayer settings stay the same.
