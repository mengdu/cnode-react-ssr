import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cnodejs.org/api'
})

export default instance
