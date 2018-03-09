import axios from 'axios';

const Index = {
    getUser(){ 
        return axios.get(`/v1/user`) 
    },
    createUser(params){
        return axios.post('/v1/user', params) 
    },
    login(params){
        return axios.post(`/v1/user/login`, params) 
    }
}

export default Index;