# Arthur Nguyen — Portfolio

Personal portfolio site for Arthur Nguyen, Computer Systems Engineer at UGA.  
Built with pure HTML, CSS, and Vanilla JS — no frameworks, just craft.

## File Structure

```
portfolio/
├── index.html              # Main entry point
├── assets/
│   ├── css/
│   │   └── style.css       # All styles (design tokens, layout, components, animations)
│   └── js/
│       └── main.js         # All JavaScript (canvas, cursor, typewriter, observers, form)
└── sections/               # Reference partials — HTML fragments for each page section
    ├── nav.html
    ├── hero.html
    ├── about.html
    ├── experience.html
    ├── projects.html
    ├── skills.html
    └── contact.html
```

> **Note:** The `sections/` folder contains standalone HTML fragments for reference and
> editing convenience. The actual live site is assembled in `index.html`.

## Tech Stack

- **HTML5** — semantic markup, no framework
- **CSS3** — custom properties, grid, animations, backdrop-filter
- **Vanilla JS** — canvas star field, IntersectionObserver, typewriter, custom cursor

## Customization

| What to change | Where |
|---|---|
| Personal info, links, bio | `index.html` (or matching file in `sections/`) |
| Colors / design tokens | `assets/css/style.css` → `:root` block |
| Typewriter roles | `assets/js/main.js` → `roles` array |
| Contact form backend | `assets/js/main.js` → contact form handler |

## Deployment

Drop the `portfolio/` folder contents into any static host (GitHub Pages, Netlify, Vercel).
No build step required.
