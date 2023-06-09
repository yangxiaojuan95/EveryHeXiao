import { token } from "@/apis/api"
import { getUserInfo } from "@/apis/api/modules/user"
import { Module } from "vuex"
import { RootState } from ".."

export interface UserState {
	userData: any | null;
	configDetail: any | null;
}

const userModule: Module<UserState, RootState> = {
	namespaced: true,
	state: {
		userData: null,
		configDetail: null
	},
	mutations: {
		updateUserData(state, info: any) {
			state.userData = info
		},
		updateconfigDetail(state, info: any) {
			state.configDetail = info
		}
	},
	actions: {
		/**
		 * 获取用户数据
		 */
		async getUserData({ commit }) {
			try {
				const result = await getUserInfo()
				if (result) {
					commit('updateUserData', result.Result)
					return result.Result
				}
			} catch (error) {
				token.remove()
				return null
			}
		}
	}
}

export default userModule