<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      message: '',
    }
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('https://api.example.com/register', this.form)
        this.message = 'Registro exitoso'
      }
      catch (error) {
        this.message = `Error en el registro: ${error.response.data.message}`
      }
    },
  },
}
</script>

<template>
  <div />
</template>

  <style scoped>
  div {
    margin: 10px 0;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #35a16e;
  }
  p {
    color: red;
    font-weight: bold;
  }
  </style>
