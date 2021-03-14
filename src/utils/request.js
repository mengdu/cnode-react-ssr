import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cnodejs.org/api/v1/'
})

export default instance
