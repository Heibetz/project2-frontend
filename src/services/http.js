import axios from 'axios'

// Axios instance for API calls; with Vite proxy, '/api' forwards to backend

var baseURL = import.meta.env.DEV === true ? 'http://localhost:3000/course-t5' : '/course-t5'
const http = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add timeouts or interceptors here later
})

export default http
