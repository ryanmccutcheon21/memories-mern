import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5500' })

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

const url = 'http://localhost:5500/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = newPost => axios.post(url, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = id => axios.delete(`${url}/${id}`)
export const likePost = id => axios.patch(`${url}/${id}/likePost`)

export const signIn = formData => API.post('/user/signin', formData)
export const signUp = formData => API.post('/user/signup', formData)