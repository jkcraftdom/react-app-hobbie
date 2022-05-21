import laravel from './laravel'

const config = {
    headers: {
        'Accept': 'Applcation/json',
        'Content-Type': 'Application/json'
    }
}


const api = {

    search: (query, comic) => laravel.axiosInstance.get(
        `comic/${comic}/character?page=1&q=${query}`
        ),
}

export default api