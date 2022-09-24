// import everything from the actions as api
import * as api from '../api'

// Action Creators
// redux thunk is the async (dispatch) arrow function added to getPosts
export const getPosts = () => async (dispatch) => {
    try {

        const { data } = await api.fetchPosts()
        dispatch({ type: 'FETCH_ALL', payload: data })

    } catch (e) {
        console.log(e.message)
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: 'CREATE', payload: data })
    } catch (e) {
        console.log(e.message)
    }
}