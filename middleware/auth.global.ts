// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()

  // Verificar si estamos en el lado del cliente
  if (process.client) {
    console.log('Verificando autenticación...')
    const token = localStorage.getItem('auth_token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')

    console.log('Token:', token)
    console.log('Client:', client)
    console.log('UID:', uid)

    if (token && client && uid) {
      console.log('Intentando validar el token...')
      try {
        const response = await axios.get(`${config.public.apiBase}/auth/validate_token`, {
          headers: {
            'access-token': token,
            'client': client,
            'uid': uid,
          },
        })

        console.log('Respuesta de validación:', response.status)
        if (response.status === 200) {
          console.log('Usuario autenticado.')
          return // Permite el acceso
        }
      }
      catch (error) {
        console.error('Error al validar el token:', error)
        // Remover tokens inválidos
        localStorage.removeItem('auth_token')
        localStorage.removeItem('client')
        localStorage.removeItem('uid')
      }
    }

    console.log('Redirigiendo a login...')
    if (to.path.startsWith('/app') && !to.path.startsWith('/login')) {
      return navigateTo('/login')
    }
  }
})
