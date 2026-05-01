# Quiz Project

This is the Basecamp Coffee Personality Quiz app.

## Run locally

1. Open a terminal in `quiz-project`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open the browser at `http://localhost:5173`

## Deploy so others can access it

### Option 1: Vercel (recommended)

1. Create a GitHub repository for this project.
2. Push the `quiz-project` folder to GitHub.
3. Go to https://vercel.com and sign in with GitHub.
4. Import your repo into Vercel.
5. Set the root folder to `quiz-project` and deploy.

Vercel will build the app and give you a public URL like `https://your-project.vercel.app`.

### Option 2: GitHub Pages

1. Create a GitHub repository for this project.
2. Push the `quiz-project` folder to GitHub.
3. Configure GitHub Pages for the repo to serve from the `gh-pages` branch or `/docs` folder.

If you want, I can also add a GitHub Pages deploy script to the project.

## Notes

- `vercel.json` is included so Vercel knows how to build and serve the app.
- The app is a static React/Vite site and can be hosted on any static web host.
