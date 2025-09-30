import axios from 'axios'

// Axios instance for API calls; with Vite proxy, '/api' forwards to backend
const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add timeouts or interceptors here later
})

export default http
