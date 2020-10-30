

async function deleteFormHandler(event) {
    event.preventDefault();
  
    router.delete('/:id',  (req, res) => {
        Post.findOne({
          where: {id: req.params.id},
          include: [Comment]
        })
        .then(post => {
          post.comments.forEach(comment => {
            comment.destroy();
          })
          post.destroy();
          res.end();
        })
    })
  };
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);