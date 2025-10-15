const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

fetch('data/blogs.json')
  .then(res => res.json())
  .then(blogs => {
    const post = blogs.find(p => p.id == postId);
    const container = document.getElementById('post-container');

    if (!post) {
      container.innerHTML = "<p>Post not found.</p>";
      return;
    }

    container.innerHTML = `
      <h1>${post.title}</h1>
      <p><em>${post.date} • ${post.author}</em></p>
      <div class="blog-content">${marked.parse(post.content)}</div>
    `;
  });
