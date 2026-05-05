# K-Hall 🏛️

Krit's personal project hub — hosted as a PWA via GitHub Pages.

## File Structure

```
k-hall/
├── index.html          ← Main app (edit projects here or via UI)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline + caching)
├── fonts/
│   └── fonts.css       ← Font imports
├── icons/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md
```

## Hosting on GitHub Pages

1. Create a repo: `github.com/krit/k-hall`
2. Push all files
3. Go to repo **Settings → Pages → Source → main branch / root**
4. Site will be live at: `https://krit.github.io/k-hall/`

## Install as Android App

Open the site in Chrome on Android → tap the **⋮ menu → Add to Home Screen**  
Or tap the install banner that appears automatically.

## Edit Projects

- Open the site → tap **✏ Edit**
- Add, edit, or remove projects in the UI
- Tap **Save Changes** → enter password: `krit`
- Changes are saved to localStorage (per device)

## Update Default Data

To update the repo's default project list for all fresh installs,  
edit the `DEFAULT_DATA` object in `index.html` (~line 280).

