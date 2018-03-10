import axios from 'axios';

const Index = {
    getBlogs(params){
        return axios.get(`/v1/blogs`) 
    },
    getBlog(id){
        return axios.get(`/v1/blog/${id}`) 
    },
    addBlog(params) {
        return axios.post('/v1/blog', params); 
    },
    deleteBlog(id){
        return axios.delete(`/v1/blog/${id}`)
    },
    getRecentBlog(){
        return axios.get(`/v1/blogs/recent`) 
    },
    commentBlog(id, params){
        return axios.put(`/v1/blog/${id}/comment`, params) 
    },
}

export default Index;