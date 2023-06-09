import introJs from 'intro.js'

const guideDescription: {[key: string]: any} = {
  '系统': {
    desc: '系统模块可以进行内部部门、角色、账号的管理。'
  },
  '基础': {
    desc: '基础模块为系统提供了底层数据的支持，包括合作商家及其部门，产品及其SKU的维护。'
  },
  '仓库': {
    desc: '仓库模块主要进行仓库、仓位的数据建立，以及库存信息的查看。'
  },
}


export function useGuide(element: HTMLElement, showMenus: MenuModel[]) {

  const steps: introJs.Step[] = showMenus.filter(a => guideDescription[a.name]).map(item => {
    const guideItem = guideDescription[item.name]
    return {
      intro: guideItem.desc,
      element: element.querySelector(`.menu-${item.id}`),
      position: 'right'
    }
  })
  var intro = introJs().setOption("dontShowAgain", true).setOption("dontShowAgainLabel", '不再显示').setOptions({
    prevLabel: '上一步',
    nextLabel: '下一步',
    doneLabel: '结束',
    exitOnOverlayClick: false,
    steps: steps
  })

  return intro
}
