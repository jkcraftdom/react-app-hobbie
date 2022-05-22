import axios from "axios"

function makeUrl(path){
    return laravel.domain + path
}

const ngrok = "https://ca3f-2001-1388-6660-79e8-7127-38cc-6999-c903.ngrok.io/api"


const remote = true;

const axiosInstance = axios.create(
    {
        baseURL: remote? ngrok:'http://127.0.0.1:8000/api'
    }
)

const laravel = {
    domain: remote? ngrok:'http://127.0.0.1:8000/api',
    makeUrl,
    axiosInstance
}

export default laravel

