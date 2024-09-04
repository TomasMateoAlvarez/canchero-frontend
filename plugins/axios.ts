import axios from 'axios'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Asegúrate de que esta URL sea la de tu backend en Rails
  })

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
