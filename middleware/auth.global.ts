import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()

  if (process.client) {
    console.log('Middleware executed')
    const token = localStorage.getItem('auth_token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')

    console.log('Token:', token)
    console.log('Client:', client)
    console.log('UID:', uid)

    // Si no hay token y la ruta no es la de login, redirigir al login
    if (!token || !client || !uid) {
      if (to.path !== '/login') {
        console.log('User not authenticated, redirecting to /login')
        return navigateTo('/login')
      }
      return // Permite el acceso a la página de login
    }

    // Validar el token con el backend
    try {
      console.log('Validating token...')
      const response = await axios.get(`${config.public.apiBase}/auth/validate_token`, {
        headers: {
          'access-token': token,
          'client': client,
          'uid': uid,
        },
      })

      console.log('Response status:', response.status)
      // Si la respuesta no es válida, redirigir al login
      if (response.status !== 200) {
        console.log('Invalid token, redirecting to /login')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('client')
        localStorage.removeItem('uid')
        if (to.path !== '/login') {
          return navigateTo('/login')
        }
      }
    }
    catch (error) {
      console.error('Error al validar el token:', error)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('client')
      localStorage.removeItem('uid')
      if (to.path !== '/login') {
        return navigateTo('/login')
      }
    }
  }
})
