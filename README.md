# Iaido Waza Numbers 居合技の数字

A bilingual (English / Japanese) browser flashcard app for memorizing the
Japanese ordinal names, kanji, and technique names of the 12 ZNKR Seitei
Iai forms.

**Live site:** https://xyplex3.github.io/learnIaiWaza/

## Overview

Seitei Iai students need to know each of the 12 forms by its Japanese
ordinal number (*Ippon-me* through *Jyunihon-me*), its kanji, and its
technique name (*Mae*, *Ushiro*, *Kesa Giri*, ...). This site drills that
recall with six practice modes, drawing five random forms per round from
the full set of 12. It's a static page with no build step and no
dependencies, so it runs equally well opened directly from disk or served
from GitHub Pages.

## Features

- **Six practice modes** — from passive flashcard review to active kanji
  and romaji recall (see [Usage](#usage))
- **Bilingual UI** — every screen shows English and Japanese side by side
- **Randomized rounds** — each round pulls 5 of the 12 forms in random
  order, so no two sessions look the same
- **Zero dependencies** — plain HTML, CSS, and JavaScript; nothing to
  `npm install`
- **Source-backed content** — numbers, kanji, and technique names are
  drawn from the official ZNKR instructional manual (see
  [Content Source](#content-source))

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.6+ (optional — only needed to serve the files over HTTP instead
  of opening them directly from disk)

### Quick Install

```bash
git clone https://github.com/xyplex3/learnIaiWaza.git
cd learnIaiWaza
```

### Verification

Open `index.html` in your browser. You should see the "Iaido Waza
Numbers" home screen with a **Start Practice** button.

## Quick Start

```bash
# From inside the cloned repo
python3 -m http.server 8000
```

Open http://localhost:8000 and click **Start Practice**.

(If your browser doesn't block local file scripts, you can skip the
server and just double-click `index.html` instead.)

## Usage

From the home screen, click **Start Practice**, then choose one of six
modes:

| Option | Mode | What you do |
|--------|------|--------------|
| 1 | Flash Cards | Review one card at a time (number, kanji, romaji, technique) and click **Next** |
| 2 | Matching | Tap a numbered card, then tap the kanji card it matches |
| 3 | Type the Kanji | Type the kanji for the ordinal number and romaji shown |
| 4 | Numbers Only Matching | Match a bare number to its full kanji + technique combo, with no romaji hints |
| 5 | Numbers Only Typing | Type the kanji for a bare number, with no romaji hint |
| 6 | Type the Romaji (Numbers Only) | Type the full romaji (ordinal name + technique name) from just the number |

Modes 2-6 score your round out of 5 and show a results screen with a
**New Round** button to try again with a fresh set of forms.

## Project Structure

```
learnIaiWaza/
├── index.html   # Screens/markup for all practice modes
├── style.css    # Styling (dark theme, responsive layout)
├── data.js      # The 12 ZNKR forms: numbers, kanji, romaji, meanings
├── app.js       # Screen navigation and practice-mode logic
└── README.md
```

## Deployment

The live site is hosted on GitHub Pages from the `main` branch. To deploy
your own fork:

1. Push your fork to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a
   branch**, then set **Branch** to `main` and folder to `/ (root)`.
4. Save, then wait a minute or two — GitHub will show your live URL at
   `https://<your-username>.github.io/<your-repo>/`.

Every push to `main` redeploys automatically within about a minute.

## Content Source

Numbers, kanji, and technique names are drawn from *Zen Nippon Kendō
Renmei Iai (Kaisetsu)*, the All Japan Kendo Federation Iai Instructional
Manual (English translation by Robert D. Stroud).

## License

No license file is currently included in this repository. All rights
reserved by default unless a license is added.
