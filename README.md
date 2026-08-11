# Iaido Waza Numbers 居合技の数字

A small static site for practicing the Japanese numbers (*Ippon-me* through
*Jyunihon-me*) used to name the 12 ZNKR Seitei Iai forms, along with each
form's technique name (*Mae*, *Ushiro*, *Kesa Giri*, ...).

Two practice modes:
- **Matching** — pair each number with its kanji.
- **Type the Kanji** — type the kanji for a given number from memory.

No build step, no dependencies — just `index.html`, `style.css`, `data.js`,
and `app.js`.

## Running it locally

Just open `index.html` in a browser. If your browser blocks local file
scripts, serve it instead:

```bash
cd IaidoWazaLearnerSite
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Hosting on GitHub Pages

1. **Create a new repository on GitHub** (via the web UI at github.com, or
   `gh repo create`). Public repos get free Pages hosting.

2. **Initialize git and push this folder**, from inside
   `IaidoWazaLearnerSite/`:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Iaido waza numbers learner site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

   (Replace `<your-username>/<your-repo>` with your actual GitHub username
   and the repo name you created.)

3. **Enable GitHub Pages** for the repo:
   - On GitHub, go to the repository's **Settings** tab.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** → **Source**, choose
     **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.

4. **Wait a minute or two**, then refresh the Pages settings page — it will
   show your live URL, typically:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

## Updating the site later

After making changes locally:

```bash
git add .
git commit -m "Describe your change"
git push
```

GitHub Pages redeploys automatically within a minute or so of each push to
`main`.

## Content source

Numbers, kanji, and technique names are drawn from *Zen Nippon Kendō
Renmei Iai (Kaisetsu)* — the All Japan Kendo Federation Iai Instructional
Manual (English translation by Robert D. Stroud).
