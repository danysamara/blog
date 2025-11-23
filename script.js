document.addEventListener('DOMContentLoaded', () => {
    const postGrid = document.getElementById('post-grid');
    const postContent = document.getElementById('post-content');

    // Check if we are on the home page or post page
    if (postGrid) {
        loadPosts();
    } else if (postContent) {
        loadPostDetail();
    }
});

async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        const postGrid = document.getElementById('post-grid');

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post-card';
            article.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <div class="post-date">${post.date}</div>
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-summary">${post.summary}</p>
                    <a href="post.html?id=${post.id}" class="read-more">Read Article &rarr;</a>
                </div>
            `;
            postGrid.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

async function loadPostDetail() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        
        if (!postId) {
            window.location.href = 'index.html';
            return;
        }

        const response = await fetch('posts.json');
        const posts = await response.json();
        const post = posts.find(p => p.id === postId);

        if (post) {
            document.title = `${post.title} - Antigravity Blog`;
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-image').src = post.image;
            document.getElementById('post-body').innerHTML = post.content;
        } else {
            document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
        }
    } catch (error) {
        console.error('Error loading post:', error);
    }
}
