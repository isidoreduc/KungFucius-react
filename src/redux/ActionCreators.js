import * as ActionTypes from './ActionTypes.js';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId, // same as dishId = dishId
        rating,
        author,
        comment
    }
});
