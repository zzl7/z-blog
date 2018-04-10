import axios from 'axios';

const Index = {
    // getPhoto(params){ 
    //     return axios.get(`/channel/listjson?pn=0&rn=${params.rn}&tag1=${params.tag1}&tag2=${params.tag2}&ftags=${params.ftags}&ie=utf8`) 
    // },
    uploadImg(params){
        return axios.post('/v1/photo/upload', params);
    },
    photo(params){
        return axios.post('/v1/photo', params);
    },
    getPhoto(params){
        return axios.get('/v1/photo');
    }
}

export default Index;