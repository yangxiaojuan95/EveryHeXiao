import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean | string;
  }
}
