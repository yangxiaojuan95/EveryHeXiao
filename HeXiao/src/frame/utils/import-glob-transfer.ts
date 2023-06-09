
 const defaultGetName = function(moduleFileName: string) {
  let registerModuleName = moduleFileName

  try {
    const matchNameResult = moduleFileName.match(/\.\/(.+?)\./)
    if (matchNameResult) {
      registerModuleName = matchNameResult[1]
    }
  
    if (!matchNameResult) {
      registerModuleName = moduleFileName.split('./')[1].split('.')[0]
    }
  } catch (error) {
    //    
  }

  return registerModuleName
}

/**
 * 聚合由import.meta.globEager导入文件中的export default的内容成一个新对象
 * @param modules
 * @param getName 获取模块的名称（对象的key值） 函数
 * @returns
 */

export default function importMetaGlobEagerDefaultContentTransferer(modules: AnyObject, getName = defaultGetName) {
  return Object.keys(modules).reduce((memo, moduleFileName) => {
    const moduleContent: any = modules[moduleFileName].default

    if (moduleContent) {
      let registerModuleName = getName(moduleFileName)
      memo[registerModuleName] = moduleContent
    }

    return memo
  }, {} as AnyObject)
}
