
// Setup the button click for voting
async function upvoteClickHandler(event) {
    event.preventDefault();

    // Get the post ID by splitting the URL and taking the last array slot.
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
  

  // The event listener
  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);