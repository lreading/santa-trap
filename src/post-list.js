/**
 * Post List Loader
 * 
 * This script loads the list of available posts and displays them
 * on the home page. It reads from a posts.json file that lists
 * all available posts, or can be configured to scan the posts directory.
 */

// List of posts with metadata
// You can manually maintain this list, or generate it from your posts directory
const posts = [
    {
        file: '2023-the-cooler-net.md',
        title: 'The Cooler Trap (Origin Story)',
        date: 'December 2023',
        excerpt: 'The trap that started our Christmas war with Santa; a cooler, a net, and a wildly misplaced sense of confidence.'
    },
];

// Render the post list
function renderPostList() {
    const container = document.getElementById('post-list');
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No posts yet. Check back soon!</p>';
        return;
    }
    
    // Sort posts by date (newest first) - assuming filename or date indicates order
    const sortedPosts = [...posts].reverse();
    
    const html = sortedPosts.map(post => `
        <div class="post-preview">
            <h3 class="post-preview-title">
                <a href="post.html?post=${post.file}" class="post-preview-title-link">${post.title}</a>
            </h3>
            <div class="post-preview-meta">${post.date}</div>
            <p class="post-preview-excerpt">${post.excerpt}</p>
            <a href="post.html?post=${post.file}" class="post-preview-link">Read more →</a>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPostList);
} else {
    renderPostList();
}

