import axios from 'axios';

const Index = {
    getBlogs(params){
        return axios.get(`/v1/user/login`) 
    }
}

export default Index;