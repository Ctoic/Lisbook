fetch('data/blogs.json')
  .then(res => res.json())
  .then(blogs => {
    const list = document.getElementById('blog-list');
    blogs.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <h2>${post.title}</h2>
        <p><em>${post.date} • ${post.author}</em></p>
        <p>${post.excerpt}</p>
        <a href="blog-post.html?id=${post.id}">Read More</a>
      `;
      list.appendChild(card);
    });
  });
