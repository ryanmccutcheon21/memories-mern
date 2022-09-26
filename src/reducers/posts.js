// in reducer, state always needs to be equal to something, so we set the default value to an empty array since our posts will be an array
// state will always be posts since we're in a posts reducer so we name it post

export default (posts = [], action) => {
    switch (action.type) {

        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        default:
            return posts;
    }
}