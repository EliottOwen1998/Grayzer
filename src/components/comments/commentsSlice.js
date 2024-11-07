import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        items: [
            { id: 1, text: 'Great post!', votes: 2, replies: [] },
            { id: 2, text: 'I totally agree!', votes: 5, replies: [] },
        ],
    },
    reducers: {
        addComment: (state, action) => {
            const newComment = {
                id: Date.now(),
                text: action.payload,
                votes: 0,
                replies: []
            };
            state.items.push(newComment);
        },
        addReply: (state, action) => {
            console.log('Action payload:', action.payload); // Debug log
            const { parentCommentId, reply } = action.payload;
            const parentComment = state.items.find((comment) => comment.id === parentCommentId);
            if (parentComment) {
                parentComment.replies.push({ id: Date.now(), text: reply });
            }
        },
        upvoteComment: (state, action) => {
            const comment = state.items.find((c) => c.id === action.payload);
            if (comment) comment.votes += 1;
        },
        downvoteComment: (state, action) => {
            const comment = state.items.find((c) => c.id === action.payload);
            if (comment) comment.votes -= 1;
        }
    }
});

export const { addComment, addReply, upvoteComment, downvoteComment } = commentsSlice.actions;
export default commentsSlice.reducer;

