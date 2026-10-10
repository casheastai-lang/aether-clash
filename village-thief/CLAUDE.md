# Light Fingers - notes for Claude

- The whole game is `index.html`: one `<script>` of vanilla JS, about 4,500 lines. No dependencies, no build.
- Run: `npm start` → http://localhost:8080. Never add a framework or bundler unless asked.
- Rendering: integer pixel scale, everything drawn with canvas rects. Tile painters `GP[]` (ground) and `OP[]` (objects);
  maps are cached canvases built by `renderMap`.
- World: maps `town` (560×124 tiles: big town x<170, Deepwood, Mudford x 296-377, walled Kingsbridge x 392-557; generated west-to-east, new areas appended at the end of genTown so old houses keep their indexes), house interiors (`h<n>` keys), `jail`, `sewer`. NPCs move with `navTo`.
  World generation is seeded (`mulberry32`, `hash`), so every player gets the same town.
- Main loop: `frame()` → `updateWorld(dt)` → `render(dt)`. Game states: `title`, `play`, `chat`, `shop`, `menu`, `saves`, ...
- Saves: `localStorage` (version 3 snapshot); the profile (achievements, skins, chosen world) is separate.
- Online layer (the "ONLINE" section): uses the Claude Artifacts `room` and `user` capabilities. `claude.use()` resolves
  `null` outside claude.ai, so the game must always work without it. Singleplayer/Multiplayer is `online.mode`.
  On localhost / file:// there is no `window.claude`; `localRoom()` stands in (BroadcastChannel between tabs).
- Cloud saves ("CLOUD SAVES" section): `db` docs `data/users/<id>/save1..3`, `profile`, `resume` (private per player).
  The game autosaves to `lightfingers_resume` every 5 s and resumes on load if it is under 5 minutes old.
- Testing: `window.__game` exposes internals for Playwright; `__game.sim(seconds)` steps the world without rendering.
  Avoid `const`/`let` used before `newGame()` runs (temporal dead zone errors at startup).

## Publishing to Claude Artifacts

- Artifact: https://claude.ai/artifact/T8myLiyYTPiXW76Z9Gisvg
- Run `npm run build:artifact`, then publish `dist/light-fingers.html` to that URL with the Artifact tool
  (read it first, then publish with `url` set so the link is kept).
- Keep its capabilities: `{"room": {"topics": {"chat": "interact"}}, "user": {"scopes": ["profile"]}, "db": {}}`
  (omitting `capabilities` on a republish keeps the stored ones).
- Every new version reloads everyone currently playing; the autosave puts them straight back where they were.
