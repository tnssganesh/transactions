import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, type} = commentDetails

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div>
          <p className="comment">{name}</p>
          <p className="comment">{comment}</p>
          <p className="comment">{type}</p>
        </div>
      </div>
      <div className="buttons-container">
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
