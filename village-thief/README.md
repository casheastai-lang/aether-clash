# Light Fingers

A 2D pixel-art village thief game: knock on doors, get invited in, steal when nobody's looking,
sell to the fences in the sewers, and outrun the Watch.

## Stack

- **Language:** plain JavaScript (ES2020+), HTML and CSS, all in one file: `index.html`.
- **Libraries / frameworks:** no UI framework. The game is vanilla JS; the only library is pyric (multiplayer backend).
- **Browser APIs:** Canvas 2D (all graphics are drawn in code, no image files), Web Audio (sound effects
  are synthesised), `localStorage` (save slots, achievements, skins), `requestAnimationFrame`.
- **External resource:** the "Press Start 2P" font from Google Fonts (falls back to monospace offline).
- **Multiplayer backend:** Firebase-shaped (Auth + Firestore with Security Rules) running on
  [pyric](https://pyric.dev)'s in-page sandbox (`pyric` on npm, bundled to `vendor/pyric.min.js`).
  The sandbox lives in the browser: it's saved to IndexedDB and shared by every tab, so for now you meet
  the thieves in your own other tabs. Swapping the `pyric/*` imports in `src/pyric-entry.js` for the
  real `firebase/*` SDK (plus a project config) makes it real multiplayer.
- **Cloud saves:** the Claude Artifacts `db` and `user` capabilities (only on the published link).
- **Moving a game between copies:** Save game > Get a save code, then Load game > Paste a save code.
- **Runtime needed to develop:** a web browser and Node.js 22+ (`npm start`, `npm run build:pyric`, `npm run build:artifact`).

## One link

**Play and share:** https://claude.ai/artifact/T8myLiyYTPiXW76Z9Gisvg

That link is the real game: the multiplayer server, cloud saves (your save slots, achievements and last
game follow your claude.ai account to any computer) and every update. The local copy below is only for
building and testing.

## Run it

```
npm install
npm start
```

Then open http://localhost:8080. `npm install` brings in pyric and esbuild (only needed to rebuild
`vendor/pyric.min.js` with `npm run build:pyric`; the built file is committed).
To test multiplayer, open a second tab and pick Multiplayer in both.

## Publish to Claude Artifacts

```
npm run build:artifact
```

This writes `dist/light-fingers.html`. Ask Claude Code to publish that file to the existing artifact URL
(see `CLAUDE.md`) so the link and its multiplayer settings stay the same.
