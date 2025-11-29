# Santa Traps Blog

A cozy, static blog site about an [overboard holiday tradition](https://santa-trap.leoreading.com/). Built with pure HTML, CSS, and minimal vanilla JavaScript.

## How It Works

### Post System

1. **Writing Posts**: Create new `.md` files in the `posts/` directory
2. **Post List**: Update the `posts` array in `post-list.js` with new post metadata
3. **Viewing Posts**: Posts are loaded dynamically via `post.html?post=filename.md`

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


## Notes

- All posts are loaded client-side via JavaScript
- No build step required - just deploy the files as-is

