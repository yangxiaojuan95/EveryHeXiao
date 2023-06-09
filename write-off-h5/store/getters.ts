/**
 * vuex 计算属性
 */

import { RootState } from ".";

export const userData = (state: RootState) => state.user.userData || null
export const IsLeader = (state: RootState) => state.user.IsLeader || null