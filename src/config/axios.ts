import axios from 'axios';
import history from './history'

const appID = "am7UHycTV275XiSCxc82RMcB"
const appSecret = "n8bqtjgE3B8BzoMYTyTQHDrb"

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
  }, (error) => {
      console.error(error)
      return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Do something with response data
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response;
}, (error) => {
    if(error.response.status === 401){
      history.push('/login')
    }
    // Do something with response error
    return Promise.reject(error);
});


export default instance