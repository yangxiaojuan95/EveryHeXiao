import { parseArray } from "@juzhenfe/parse-design-config"
import { processdRequest } from "@/utils/request"

interface ReflectionConfig {
  name: string;
  getUrl: string;
  parseFn?: Function;
  _parseFnStringFn?: string;
  [key: string]: string | Function | undefined;
}

export const parseReflections = (reflectionConfigList: ReflectionConfig[], reflections: AnyObject) => {

  if (!reflectionConfigList) {
    return
  }

  const key = 'parseFn'

  const configList: ReflectionConfig[] = parseArray(reflectionConfigList, [
    {
      from: key.getStringFnProperty(),
      to: key
    }
  ])

  configList.forEach(async (item) => {
    const reqResult = await processdRequest.get(item.getUrl)

    // 解析规则
    const parsedResult = item.parseFn ? item.parseFn(reqResult) : reqResult
    reflections[item.name] = parsedResult
  })
}