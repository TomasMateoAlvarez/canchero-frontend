<script>
import axios from 'axios' // Importa axios para hacer la solicitud a la API

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  methods: {
    async register() {
      // Validación simple de contraseñas
      if (this.password !== this.passwordConfirmation) {
        alert('Las contraseñas no coinciden')
        return
      }

      try {
        const response = await axios.post('http://127.0.0.1:3000/api/v1/auth', {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        alert('Registro exitoso')
        console.log(response.data) // Maneja la respuesta del servidor
      }
      catch (error) {
        console.error('Error durante el registro:', error.response ? error.response.data : error.message)
        alert('Error durante el registro. Por favor, intenta nuevamente.')
      }
    },
  },
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h1>Registro</h1>
      <form @submit.prevent="register">
        <!-- Llama al método `register` al enviar el formulario -->
        <div class="form-group">
          <label for="username">Usuario:</label>
          <input id="username" v-model="username" type="text">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email">
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input id="password" v-model="password" type="password">
        </div>
        <div class="form-group">
          <label for="password_confirmation">Repetir Contraseña:</label>
          <input id="password_confirmation" v-model="passwordConfirmation" type="password">
        </div>
        <button type="submit">
          Registrar
        </button>
      </form>
    </div>
  </div>
</template>

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
