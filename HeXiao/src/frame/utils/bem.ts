/**
 * 创建BEM形式的className
 */

function createBEMNameSpace(name: string) {
  return {
    BEMSpace: name,
    createBEMName(className: string) {
      return `${name}__${className}`
    }
  }
}

export default createBEMNameSpace
