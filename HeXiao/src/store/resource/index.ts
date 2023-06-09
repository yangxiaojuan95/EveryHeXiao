import { processdRequest } from "@/utils/request"
import { defineStore } from "pinia"
import projectLoadJson from 'public/config/index.json'

type ProjectConfig = {
  loginPageProjectName: string,
  loginPageSlogan1: string,
  loginPageSlogan2: string,
  loginPageSloganAnimation: boolean;
  loginPageRigthsStartYear: number,
  loginPageRigthsReserveCompany: string,
  loginPageLogo: string,
  loginPageLogoWidth: string,
  loginPageLogoHeight: string,
  loginPageBg: string,
  navBarProjectName: string,
  navBarLogo: string,
  navBarLogoWidth: string,
  navBarLogoHeight: string
  cssVars: AnyObject
}

export type ResourceState = {
  project: ProjectConfig
}

const STORE_NAME = 'RESOURCE'

export const useResourceStore = defineStore(STORE_NAME, {
  state: (): ResourceState => {
    return {
      
      // 项目配置
      project: {
        loginPageProjectName: '',
        loginPageSlogan1: '',
        loginPageSlogan2: '',
        loginPageSloganAnimation: false,
        loginPageRigthsStartYear: 2000,
        loginPageRigthsReserveCompany: '',
        loginPageLogo: '',
        loginPageLogoWidth: '',
        loginPageLogoHeight: '',
        loginPageBg: '',
        navBarProjectName: '',
        navBarLogo: '',
        navBarLogoWidth: '',
        navBarLogoHeight: '',
        cssVars: {}
      }
    }
  },
  actions: {
    updateProjectConfig(projectConfig: ProjectConfig) {
      this.project = projectConfig
    },
    async loadConfig() {
      return processdRequest.get<ProjectConfig>(`${location.origin}/config/${projectLoadJson.project}/config.json?v=${new Date().getTime()}`)
      .then(res => {
        this.updateProjectConfig(res)
        setRootVariables(res.cssVars)
      })
    }
  }
})

function setRootVariables(variables: AnyObject) {
  if (!variables) {
    return false
  }
  Object.keys(variables).forEach(key => {
    document.documentElement.style.setProperty(key, variables[key])
  })
}
