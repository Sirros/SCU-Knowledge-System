import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isLogin: false,
    user: ''
  },
  mutations: {
    // 设置token
    userStatue(state, user) {
      if(user) {
        state.isLogin = true
        state.user = user
      } else if(user === null) {
        sessionStorage.setItem('userToken', null)
        sessionStorage.setItem('userName', '')
        state.isLogin = false
        state.user = null
        state.token = ''
      }
    },
    userToken(state, token) {
      state.token = token
    }
  },
  getters: {
    // 获取token
    getToken(state) {
      return state.token
    },
    getLogin(state) {
      return state.isLogin
    },
    getUser(state) {
      return state.user
    }
  },
  actions: {
    setUser(context, user) {
      context.commit('userStatue', user)
    },
    setToken(context, token) {
      context.commit('userToken', token)
    }
  },
  modules: {
  }
})
