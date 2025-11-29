/**
 * Post Renderer using marked.js
 * 
 * This script:
 * 1. Extracts the post filename from the URL query parameter
 * 2. Fetches the Markdown file from the posts/ directory
 * 3. Parses the Markdown into HTML using marked.js (loaded from CDN)
 * 4. Renders it in the post-content element
 */

// Parse markdown using marked.js (loaded from CDN)
function parseMarkdown(markdown) {
    if (typeof marked === 'undefined') {
        console.error('marked.js is not loaded');
        return '<p>Error: Markdown parser not available. Please ensure marked.js is loaded.</p>';
    }
    
    // Configure marked options
    marked.setOptions({
        breaks: false,
        gfm: true, // GitHub Flavored Markdown
    });
    
    return marked.parse(markdown);
}

// Extract metadata from markdown (title and date from frontmatter or first lines)
function extractMetadata(markdown) {
    const metadata = {
        title: '',
        date: '',
        excerpt: ''
    };
    
    // Try to extract frontmatter
    const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/title:\s*(.+)/);
        const dateMatch = frontmatter.match(/date:\s*(.+)/);
        if (titleMatch) metadata.title = titleMatch[1].trim();
        if (dateMatch) metadata.date = dateMatch[1].trim();
        markdown = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
    }
    
    // If no frontmatter, try to get title from first # header
    if (!metadata.title) {
        const titleMatch = markdown.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            metadata.title = titleMatch[1].trim();
            markdown = markdown.replace(/^#\s+.*$/m, '');
        }
    }
    
    // Extract excerpt (first paragraph)
    const firstPara = markdown.match(/^(.+?)(?:\n\n|\n#|$)/s);
    if (firstPara) {
        metadata.excerpt = firstPara[1].trim().replace(/[#*_`]/g, '').substring(0, 150);
    }
    
    return { metadata, markdown };
}

// Render the post
async function renderPost() {
    const container = document.getElementById('post-content');
    if (!container) return;
    
    // Get post filename from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    
    if (!postFile) {
        container.innerHTML = '<p>No post specified. <a href="index.html">Return home</a></p>';
        return;
    }
    
    try {
        // Fetch the markdown file
        const response = await fetch(`posts/${postFile}`);
        if (!response.ok) {
            throw new Error('Post not found');
        }
        
        const markdown = await response.text();
        
        // Extract metadata and content
        const { metadata, markdown: content } = extractMetadata(markdown);
        
        // Parse markdown to HTML
        const html = parseMarkdown(content);
        
        // Render
        let output = '';
        
        if (metadata.title) {
            output += `<h1>${metadata.title}</h1>`;
        }
        
        if (metadata.date) {
            output += `<div class="post-meta">${metadata.date}</div>`;
        }
        
        output += html;
        output += '<div style="text-align: center; margin-top: 2rem;"><a href="index.html" class="back-link">← Back to Traps</a></div>';
        
        container.innerHTML = output;
        
        // Initialize lightbox for images
        initLightbox();
        
        // Update page title
        if (metadata.title) {
            document.title = `${metadata.title} - Santa Traps`;
        }
        
    } catch (error) {
        container.innerHTML = `
            <p>Error loading post: ${error.message}</p>
            <p><a href="index.html" class="back-link">Return home</a></p>
        `;
    }
}

// Initialize lightbox functionality
function initLightbox() {
    const images = document.querySelectorAll('.post-content img');
    let lightbox = document.getElementById('lightbox');
    
    // Create lightbox if it doesn't exist
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <img src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Add click handlers to images
    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxCaption.textContent = this.alt || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close lightbox handlers
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
    });
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPost);
} else {
    renderPost();
}

