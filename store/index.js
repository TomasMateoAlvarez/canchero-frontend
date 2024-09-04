// store/index.js
export function state() {
  return {
    authToken: localStorage.getItem('authToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.authToken = token
    localStorage.setItem('authToken', token)
  },
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  CLEAR_AUTH(state) {
    state.authToken = null
    state.user = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },
}

export const actions = {
  nuxtServerInit({ commit }) {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')

    if (token) {
      commit('SET_TOKEN', token)
      commit('SET_USER', JSON.parse(user))
    }
  },
}
