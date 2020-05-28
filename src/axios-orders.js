import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-28985.firebaseio.com/'
})

export default instance