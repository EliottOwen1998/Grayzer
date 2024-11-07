import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addReply, upvoteComment, downvoteComment } from '../comments/commentsSlice';

const Post = ({ title, content, votes, media, author, authorDetails = {} }) => {
    const [voteCount, setVoteCount] = useState(votes);
    const [newComment, setNewComment] = useState("");
    const [newReply, setNewReply] = useState("");
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const comments = useSelector((state) => state.comments.items);
    const dispatch = useDispatch();

    const handleUpvote = () => setVoteCount(voteCount + 1);
    const handleDownvote = () => setVoteCount(voteCount - 1);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            dispatch(addComment(newComment));
            setNewComment("");
        }
    };

    const handleReplySubmit = (commentId) => {
        if (newReply.trim()) {
            dispatch(addReply({ parentCommentId: commentId, reply: newReply }));
            setNewReply("");
            setReplyingCommentId(null);
        }
    };

    return (
        <div className="post">
            {/* Display Author Details */}
            <div className="author-details">
                {authorDetails.profilePic && (
                    <img src={authorDetails.profilePic} alt={`${author}'s profile`} className="profile-pic" />
                )}
                <div className="author-info">
                    <p>Posted by: {author}</p>
                    <p>Bio: {authorDetails.bio}</p>
                    <p>Location: {authorDetails.location}</p>
                </div>
            </div>

            <h3>{title}</h3>
            <p>{content}</p>

            {/* Display media if exists */}
            {media && (
                <div className="media-preview">
                    <img src={media} alt="Post media" style={{ maxWidth: '100%' }} />
                </div>
            )}

            <div className="post-actions">
                <button onClick={handleUpvote}>Upvote</button>
                <button onClick={handleDownvote}>Downvote</button>
                <span>Votes: {voteCount}</span>
            </div>

            <div className="comment-section">
                <button onClick={() => setShowComments(!showComments)}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
                {showComments && (
                    <>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                required
                            />
                            <button type="submit">Submit Comment</button>
                        </form>
                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                    <p>{comment.text}</p>
                                    <div className="comment-actions">
                                        <button onClick={() => dispatch(upvoteComment(comment.id))}>Upvote</button>
                                        <button onClick={() => dispatch(downvoteComment(comment.id))}>Downvote</button>
                                        <span>Votes: {comment.votes}</span>
                                        <button
                                            onClick={() =>
                                                setReplyingCommentId(replyingCommentId === comment.id ? null : comment.id)
                                            }
                                        >
                                            {replyingCommentId === comment.id ? 'Cancel' : 'Reply'}
                                        </button>
                                    </div>

                                    {/* Conditional rendering of reply input for the specific comment */}
                                    {replyingCommentId === comment.id && (
                                        <div className="reply-section">
                                            <textarea
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                                placeholder="Add a reply..."
                                                required
                                            />
                                            <button onClick={() => handleReplySubmit(comment.id)}>Submit Reply</button>
                                        </div>
                                    )}

                                    {/* Display Replies */}
                                    {comment.replies.length > 0 && (
                                        <div className="replies">
                                            {comment.replies.map((reply, index) => (
                                                <p key={index} className="reply">
                                                    {reply.text}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Post;
