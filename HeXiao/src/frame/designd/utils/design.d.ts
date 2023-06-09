import { ConfigType, FormGetDataType } from "./enum";

declare global {
  interface PageDesignModel {
    id: number;
    name: string;
    title: string;
    config: string;
    type: ConfigType;
  }
  
  interface PageDesignConfigParsed {
    pageModelConfig: PageModel.Config;
    reflectionConfigList: ReflectionConfig[];
    globalEvents: AnyObject;
    dialogs: AnyObject[];
  }
  
  interface ReflectionConfig {
    name: string;
    getUrl: string;
    parseFn?: Function;
    _parseFnStringFn?: string;
    [key: string]: string | Function | undefined;
  }
  
  type FormDataConfig = {
    type: FormGetDataType;
    getUrl?: string;
    getMethod?: string;
    putUrl: string;
    putMethod: string;
  }

  interface FormDesignConfigParsed {
    pageModelFormConfig: PageModel.Form;
    reflectionConfigList: ReflectionConfig[];
    dataConfig: FormDataConfig;
    formActions: {
      style?: string;
      els: PageModel.Button[];
    }
  }

}
