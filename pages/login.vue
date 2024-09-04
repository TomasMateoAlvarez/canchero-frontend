<script>
import axios from 'axios' // Importa axios para hacer la solicitud a la API
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      email: '', // Usamos `email` para la autenticación
      password: '', // `password` para la autenticación
    }
  },
  methods: {
    async login() {
      const router = useRouter() // Obtén la instancia del enrutador

      try {
        // Enviar una solicitud POST a la API con email y password
        const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/sign_in', {
          email: this.email,
          password: this.password,
        })

        // Si la autenticación es exitosa, guarda el token en localStorage
        localStorage.setItem('auth_token', response.headers['access-token'])
        localStorage.setItem('client', response.headers.client)
        localStorage.setItem('uid', response.headers.uid)

        // Redirigir al usuario a la página de dashboard después del inicio de sesión
        navigateTo('/dashboard')

        console.log('Inicio de sesión exitoso')
      }
      catch (error) {
        console.error('Error durante el inicio de sesión:', error.response ? error.response.data : error.message)
        alert('Error durante el inicio de sesión. Por favor, intenta nuevamente.')
      }
    },
  },
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h1>Logeate</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email">
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input id="password" v-model="password" type="password">
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<!-- <script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Reactive variables
const email = ref('');
const password = ref('');

// Setup router
const router = useRouter();

// Login method
const login = async () => {
  try {
    // Enviar una solicitud POST a la API con email y password
    const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/sign_in', {
      email: email.value,
      password: password.value
    });

    // Si la autenticación es exitosa, guarda el token en localStorage
    localStorage.setItem('auth_token', response.headers['access-token']);
    localStorage.setItem('client', response.headers['client']);
    localStorage.setItem('uid', response.headers['uid']);

    alert('Inicio de sesión exitoso');

    // Redirigir al usuario a otra página después del inicio de sesión
    router.push({ path: '/dashboard' }); // Asegúrate de tener configurada esta ruta
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error.response ? error.response.data : error.message);
    alert('Error durante el inicio de sesión. Por favor, intenta nuevamente.');
  }
};
</script> -->

<style scoped>
/* Tus estilos existentes aquí */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(18, 18, 18);
}

.register-box {
  background-color: #2e2e2e;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 600px;
  height: 600px;
}

h1 {
  text-align: center;
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ddd;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
