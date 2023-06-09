
/**
 * 开发环境
 */
export const isProduction = process.env.NODE_ENV === 'production'


/**
 * 请求地址
 */

const devURL = '/api/magic'
// const devURL = 'http://localhost:5000'
// const devURL = 'http://yash.nbxuanma.com'

const proURL = '/api/magic'
export const pathUrl = 'https://approvalsale.nbxuanma.com'

export const baseURL = isProduction ? proURL : devURL
