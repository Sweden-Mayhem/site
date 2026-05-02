# Sweden Mayhem Website

Static site generator for the Sweden Mayhem website. Builds markdown content into HTML using Deno, published to GitHub Pages.

## Tech Stack

- **Runtime**: Deno 2.x (TypeScript)
- **Markdown parser**: marked (with GFM heading IDs)
- **Templating engine**: Eta
- **Deployment**: GitHub Actions → GitHub Pages + manual VPS sync

## Project Structure

```
content/              # Source markdown files
├── index.md          # Homepage
├── hytale/           # Hytale server section
│   ├── index.md
│   ├── play.md
│   ├── map.md
│   ├── news/         # News posts (timestamped)
│   └── submissions.md
└── minecraft/        # Minecraft server section
    ├── index.md
    ├── gameplay.md
    ├── play.md
    ├── news/         # Weekly posts
    └── help.md

template/             # HTML templates
├── index.html        # Homepage template
├── page.html         # Generic page template
├── style.css         # Base styles
├── hytale/           # Hytale-specific overrides
│   ├── index.html
│   ├── page.html
│   ├── style.css
│   └── news/
└── minecraft/        # Minecraft-specific overrides
    ├── index.html
    ├── page.html
    ├── style.css
    └── news/

output/               # Generated HTML (build artifact, not committed)
```

## Local Development

### Prerequisites

- Deno 2.x installed ([deno.land](https://deno.land))

### Build Locally

```bash
# Generate HTML from markdown
./generate.sh

# Open in browser
open output/index.html
# or just navigate to the output/ directory
```

### Clean Build

```bash
# Remove all generated files
./clean.sh
```

### File Permissions

The scripts require execute permission. If you see permission errors:

```bash
chmod +x generate.sh clean.sh
```

## Adding Content

### Add a News Post

News posts are timestamped markdown files. Deno walks directories alphabetically, so newer timestamps appear later in listings.

1. Create the file:
   ```bash
   content/hytale/news/2026-05-01-120000.md
   ```

2. Write markdown (first line is the title):
   ```markdown
   # Update: New Dungeon Released

   This week we released the Crystal Caverns...
   ```

3. Rebuild:
   ```bash
   ./generate.sh
   ```

### Add a Regular Page

Pages under each section (Hytale, Minecraft) are generated from markdown.

1. Create the file:
   ```bash
   content/hytale/guide.md
   ```

2. Write markdown:
   ```markdown
   # Server Guide

   This guide covers the basics...
   ```

3. The page will appear in navigation as "Guide" (auto-capitalized from filename).

4. Rebuild and test:
   ```bash
   ./generate.sh
   ```

### Create a New Section

To add a new top-level section (e.g., `events/`):

1. Create the directory:
   ```bash
   mkdir -p content/community
   ```

2. Create `index.md` (becomes the section's main page):
   ```bash
   content/events/index.md
   ```

3. Create section template (optional for custom styling):
   ```bash
   mkdir -p template/community
   cp template/page.html template/events/page.html
   ```

4. Rebuild:
   ```bash
   ./generate.sh
   ```

## Build Process

`index.ts` reads the content directory structure and generates static HTML. The workflow:

1. **Parse**: Walk `content/` recursively, extract markdown + metadata
2. **Render**: Convert markdown → HTML using marked
3. **Template**: Inject HTML into Eta templates with section context
4. **Copy Assets**: Copy images, CSS, and other files from `template/` to `output/`
5. **Output**: Write generated HTML to `output/`

Supported template hierarchy:
- `template/<section>/<type>.html` (e.g., `template/hytale/page.html`)
- Falls back to `template/<type>.html` (e.g., `template/page.html`)

## Deployment

### GitHub Pages (Automatic)

On push to `master`, GitHub Actions:
1. Runs `./generate.sh`
2. Uploads the `output/` directory
3. Deploys to `https://sweden-mayhem.github.io/site/` (test site, not primary)

### VPS Deployment (Manual)

The live site at `hytale.swedenmayhem.se` pulls from this repo:

```bash
# On the VPS (automated via cron/webhook)
cd /opt/hytale/website
git pull origin master
deno run --allow-read=template --allow-read=content --allow-read=output --allow-write=output index.ts generate
# Nginx or httpd serves the output/ directory
```

**Status**: CI/CD for VPS deployment is being implemented (see issue #77).

## Editing Templates

### Template Variables

The Eta templating engine provides these variables to templates:

- `currentPage` - the page being rendered
  - `currentPage.title` - page title
  - `currentPage.html` - rendered HTML content
  - `currentPage.markdownSummary` - preview text
- `currentSection` - the section containing this page
  - `currentSection.name` - section folder name
  - `currentSection.title` - section display name
  - `currentSection.pages` - list of pages in section
  - `currentSection.sections` - subsections
- `parentSection` - parent of current section (if nested)
- `pages` - content pages in current section (excludes index)
- `sections` - subsections

### Example Template

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= it.currentPage.title %> - Sweden Mayhem</title>
</head>
<body>
    <h1><%= it.currentPage.title %></h1>
    <%~ it.currentPage.html %>
    
    <nav>
        <% it.currentSection.pages.forEach(page => { %>
            <a href="<%= page.outputFilename %>"><%= page.title %></a>
        <% }); %>
    </nav>
</body>
</html>
```

## Known Limitations

- News posts with 150+ files can slow down builds. Consider pagination/archiving if needed (issue #76).
- No live reload in development. Rebuild with `./generate.sh` after changes.
- Images must be placed in `template/` (committed) to appear in output. No dynamic image handling.

## Testing Before Deploy

1. **Build locally**: `./generate.sh`
2. **Preview**: Open `output/index.html` in a browser
3. **Check links**: Verify navigation works across sections
4. **Validate HTML** (optional): Use an HTML validator on the output files
5. **Push**: `git push origin master`

## Support

For issues or questions about the build process or structure, open an issue on the repository or contact the team.
