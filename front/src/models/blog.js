import axios from 'axios';

const Index = {
    getBlogs(params){
        return axios.get(`/v1/blogs`) 
    }
}

export default Index;