import { Module } from "vuex"
import { RootState } from ".."

export interface SystemState {
  systemInfo: UniApp.GetSystemInfoResult;
  navHeight: number;
}

const systemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state: {
    systemInfo: uni.getSystemInfoSync(),
  	navHeight: 0
  },
  mutations: {
    updateNavHeight(state, newVal) {
      state.navHeight = newVal
    }
  }
}

export default systemModule
