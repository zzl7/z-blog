import axios from 'axios';

const Index = {
    getUser(){ 
        return axios.get(`/v1/user`) 
    },
}

export default Index;