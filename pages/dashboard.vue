<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false) // Estado para controlar la autenticación
const router = useRouter()

onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')

    // Si los tokens existen, el usuario está autenticado
    if (token && client && uid) {
      isAuthenticated.value = true
    }
    else {
      // Si no existen tokens, redirigir al login
      router.push('/login')
    }
  }
})
</script>

<template>
  <!-- Solo se muestra el dashboard si el usuario está autenticado -->
  <div v-if="isAuthenticated">
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de control.</p>
  </div>
</template>

<style scoped>
/* Estilos específicos para la página del dashboard */
</style>
