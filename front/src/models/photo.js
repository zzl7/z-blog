import axios from 'axios';

const Index = {
    getPhoto(params){ 
        return axios.get(`/channel/listjson?pn=0&rn=${params.rn}&tag1=${params.tag1}&tag2=${params.tag2}&ftags=${params.ftags}&ie=utf8`) 
    },
}

export default Index;