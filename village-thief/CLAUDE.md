# Light Fingers - notes for Claude

- The whole game is `index.html`: one `<script>` of vanilla JS, about 4,800 lines. The one library is pyric, loaded from `vendor/pyric.min.js` (built from `src/pyric-entry.js` by `npm run build:pyric`).
- Run: `npm start` → http://localhost:8080. Never add a framework or bundler unless asked.
- Rendering: integer pixel scale, everything drawn with canvas rects. Tile painters `GP[]` (ground) and `OP[]` (objects);
  maps are cached canvases built by `renderMap`.
- Time: `DAY_LEN` = 900 s (a 15-minute day). Night is t 0.65-0.9 of the day.
- Careers (`career`): thief, watch (shifts, POST, arrests, wage) or worker (shop/wood/lamp jobs, WORK spots, daily wage, strikes). Changed via guard/shopkeeper chats.
- No thieves' guild or gangs: the sewer robbers (`thieves`) just rob houses at night; fences only trade. `rats` is an empty array (the Mudford Rats were removed); the old guild job/heist/contest code is unreachable.
- World: maps `town` (560×124 tiles: big town x<170, Deepwood, Mudford x 296-377, walled Kingsbridge x 392-557; generated west-to-east, new areas appended at the end of genTown so old houses keep their indexes), house interiors (`h<n>` keys), `jail`, `sewer`. NPCs move with `navTo`.
  World generation is seeded (`mulberry32`, `hash`), so every player gets the same town.
- Main loop: `frame()` → `updateWorld(dt)` → `render(dt)`. Game states: `title`, `play`, `chat`, `shop`, `menu`, `saves`, ...
- Saves: `localStorage` (version 3 snapshot); the profile (achievements, skins, chosen world) is separate.
- Online layer ("ONLINE" + "MULTIPLAYER BACKEND" sections): `firebaseRoom()` is the transport - pyric in-page sandbox
  (anonymous Auth, Firestore `presence/{sid}` and `chat/{id}`, rules in `FIRESTORE_RULES`, IndexedDB persistence,
  `attachTabSync` so tabs share it). It is pure Firebase-shaped code: moving to real Firebase means swapping the
  imports in `src/pyric-entry.js` for `firebase/*` and initializing an app. Presence writes are capped at 2/s.
  Use the `pyric-inpage-sandbox` skill (github.com/davideast/pyric, pyric-plugin/skills) when changing it.
- Cloud saves ("CLOUD SAVES" section): `db` docs `data/users/<id>/save1..3`, `profile`, `resume` (private per player).
  The game autosaves to `lightfingers_resume` every 5 s and resumes on load if it is under 5 minutes old.
- Testing: `window.__game` exposes internals for Playwright; `__game.sim(seconds)` steps the world without rendering.
  Avoid `const`/`let` used before `newGame()` runs (temporal dead zone errors at startup).

## Publishing to Claude Artifacts

- Artifact: https://claude.ai/artifact/T8myLiyYTPiXW76Z9Gisvg
- Run `npm run build:artifact` (it rebuilds and inlines the pyric bundle), then publish `dist/light-fingers.html` to that URL with the Artifact tool
  (read it first, then publish with `url` set so the link is kept).
- Keep its capabilities: `{"user": {"scopes": ["profile"]}, "db": {}}` (cloud saves and the player's name)
  (omitting `capabilities` on a republish keeps the stored ones).
- Every new version reloads everyone currently playing; the autosave puts them straight back where they were.
