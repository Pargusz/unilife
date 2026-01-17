# UniLife - Premium Student Utility

A high-performance, visually stunning dashboard for students featuring grade calculation, focus timers, and task management.

## Features
- **GPA Genius**: Calculate your GPA with interactive inputs and visual feedback.
- **Focus Flow**: Ambient Pomodoro timer for deep work sessions.
- **Task Master**: Organized to-do list for assignments.
- **Premium UI**: Midnight Blue theme with glassmorphism and neon accents.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start local server:
   ```bash
   npm run dev
   ```

## Deployment for GitHub Pages

This project is built with Vite. To deploy to GitHub Pages:

1. Update `vite.config.js` (optional):
   If you are deploying to `https://<USERNAME>.github.io/<REPO>/`, add the base path in `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/<REPO>/', 
     plugins: [react()],
   })
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Upload the `dist` folder content to your repository's `gh-pages` branch or configure GitHub Pages Settings to serve from the `dist` folder (if supported, or use a deployment action).

### Easy Deployment via gh-pages package
1. `npm install gh-pages --save-dev`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Run `npm run build && npm run deploy`
