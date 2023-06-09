import { isProduction } from '@/config'
import { UserState } from './modules/user'

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import modules from './modules'
import { SystemState } from './modules/system'

export interface RootState {
  user: UserState;
  system: SystemState;
}

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules,
  strict: isProduction
})
