import { DefineComponent } from "vue";

declare module 'vue' {
  export interface GlobalComponents {
    PageModel: DefineComponent<{}>
  }
}
