document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
  
    postForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const postText = document.getElementById('post-text').value.trim();
      if (postText !== '') {
        createPost(postText);
        document.getElementById('post-text').value = '';
      }
    });
  
    function createPost(text) {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
  
      const postContent = document.createElement('p');
      postContent.textContent = text;
  
      const postActions = document.createElement('div');
      postActions.classList.add('post-actions');
  
      const likeButton = document.createElement('button');
      likeButton.textContent = 'Like';
      likeButton.classList.add('post-like');
      likeButton.addEventListener('click', function() {
        toggleLike(likeButton);
      });
  
      postActions.appendChild(likeButton);
  
      postDiv.appendChild(postContent);
      postDiv.appendChild(postActions);
  
      postsContainer.appendChild(postDiv);
    }
  
    function toggleLike(button) {
      button.classList.toggle('liked');
      if (button.classList.contains('liked')) {
        button.textContent = 'Liked';
      } else {
        button.textContent = 'Like';
      }
    }
  });
  