import axios from "axios"

function makeUrl(path){
    return laravel.domain + path
}

const ngrok = "https://16fb-2001-1388-6660-79e8-959a-89ff-6962-8e4a.ngrok.io/api"

const axiosInstance = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/api'
    }
)

const laravel = {
    domain: 'http://127.0.0.1:8000/api',
    makeUrl,
    axiosInstance
}

export default laravel

