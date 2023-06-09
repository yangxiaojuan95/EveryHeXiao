import { token } from "@/apis/api"
// import { getUserInfo } from "@/apis/api/modules/user"
import { Module } from "vuex"
import { RootState } from ".."

export interface UserState {
	userData: any | null;
	IsLeader: any | null;
}

const userModule: Module<UserState, RootState> = {
	namespaced: true,
	state: {
		userData: null,
		IsLeader: null
	},
	mutations: {
		updateUserData(state, info: any) {
			state.userData = info
		},
		updateIsLeader(state,play: any){
			state.IsLeader = play
		}
	},
	actions: {
		/**
		 * 获取用户数据
		 */
		// async getUserData({ commit }) {
		// 	try {
		// 		const result = await getUserInfo()
		// 		if (result) {
		// 			commit('updateUserData', result)
		// 			return result
		// 			console.log('xxxx')
		// 		}
		// 	} catch (error) {
		// 		token.remove() 
		// 		return null
		// 	}
		// },
		/**
		 * 跳转到首页
		 */
		toBusinessCenterPage({ commit, state }) {
			const userData = state.userData
			
			if (!userData) {
				return false
			}
			
			const currentPage = getCurrentPages().slice(-1)[0]
			if (currentPage && currentPage.route === 'pages/login/index') {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} 
		}
	}
}

export default userModule