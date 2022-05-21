import laravel from './laravel'

const config = {
    headers: {
        'Accept': 'Applcation/json',
        'Content-Type': 'Application/json'
    }
}


const api = {

    save: (data, comic) => laravel.axiosInstance.post(
        `/comic/${comic}/scanlations`, 
        data , 
        config),

    update: (data, comic) => laravel.axiosInstance.post(
        `/comic/${comic}/scanlations?_method=PUT`, 
        data, 
        config),
    search: (input) => laravel.axiosInstance.get(
        `/scanlation/search?q=${input}`)

}

export default api