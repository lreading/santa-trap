# Santa Traps Blog

A cozy, static blog site about an overboard holiday tradition. Built with pure HTML, CSS, and minimal vanilla JavaScript.

## Project Structure

```
santa-trap/
├── index.html          # Home page with post listings
├── about.html          # About page
├── post.html           # Post template (loads posts dynamically)
├── styles.css          # All styling
├── post.js             # Markdown parser and post renderer
├── post-list.js        # Post list loader for home page
└── posts/              # Markdown blog posts
    ├── trap-2023.md
    ├── trap-2022.md
    └── trap-2021.md
```

## How It Works

### Post System

1. **Writing Posts**: Create new `.md` files in the `posts/` directory
2. **Post List**: Update the `posts` array in `post-list.js` with new post metadata
3. **Viewing Posts**: Posts are loaded dynamically via `post.html?post=filename.md`

### Markdown Support

The site includes a minimal Markdown parser that supports:
- Headers (`#`, `##`, `###`)
- Bold (`**text**` or `__text__`)
- Italic (`*text*` or `_text_`)
- Links (`[text](url)`)
- Code blocks (triple backticks)
- Inline code (single backticks)
- Blockquotes (`> text`)
- Lists (ordered and unordered)

### Adding New Posts

1. Create a new `.md` file in the `posts/` directory
2. Add an entry to the `posts` array in `post-list.js`:

```javascript
{
    file: 'your-post.md',
    title: 'Your Post Title',
    date: 'December 2024',
    excerpt: 'A short description of your post...'
}
```


## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# Then visit http://localhost:8000
```

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --bg-dark: #0a0e27;
    --text-primary: #f5f3f0;
    --accent-red: #c94a4a;
    --accent-green: #4a7c59;
    --accent-gold: #d4af37;
    /* ... */
}
```

### Typography

Change the font families:

```css
--font-serif: 'Georgia', 'Times New Roman', serif;
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
```

## Notes

- All posts are loaded client-side via JavaScript
- The Markdown parser is minimal but handles common formatting
- No build step required - just deploy the files as-is
- Fully responsive design works on mobile and desktop

## License

Feel free to use this as a starting point for your own blog!

# santa-trap
