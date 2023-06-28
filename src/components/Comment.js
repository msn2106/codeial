import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';

import styles from '../styles/home.module.css';
import { toggleLike } from '../api';

const Comment = ({ comment }) => {
  const { addToast } = useToasts();

  const handleCommentLikeClick = async() => {
    const response = await toggleLike(comment._id, 'Comment');
    if (response.success) {
      if (response.data.deleted) {
        addToast('Comment Like removed successfully!', {
          appearance: 'success',
        });
      } else {
        addToast('Comment Liked successfully!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>
      <div className={styles.postCommentContent}>{comment.content}</div>
      <div className={styles.commentLike}>
        <button onClick={handleCommentLikeClick}>
          <img
            src="https://img.icons8.com/?size=512&id=DFU1kReSUccu&format=png"
            alt="likes-icon"
          />
        </button>
        <span>{comment.likes.length}</span>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
