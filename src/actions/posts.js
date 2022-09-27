// import everything from the actions as api
import * as api from '../api'

// Action Creators
// redux thunk is the async (dispatch) arrow function added to getPosts
export const getPosts = () => async (dispatch) => {
    try {

        const { data } = await api.fetchPosts()
        dispatch({ type: 'FETCH_ALL', payload: data })

    } catch (e) {
        console.log(e)
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: 'CREATE', payload: data })
    } catch (e) {
        console.log(e)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)

        dispatch({ type: 'UPDATE', payload: data })
    } catch (e) {
        console.log(e)
    }
}

export const deletePost = id => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({ type: 'DELETE', payload: id })
    } catch (e) {
        console.log(e)
    }
}