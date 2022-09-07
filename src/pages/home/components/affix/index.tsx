import { Affix } from 'antd'
import React, { useState } from 'react'
import { _getHtmlGenerator } from 'umi'
import './index.less'

class HomeAffix extends React.Component {
  handleClick(event: { target: any }) {
    const target = event.target
    let divContainer = null
    switch (target.id) {
      case 'us':
        divContainer = document.getElementsByClassName('introductionOuter')
        break
      case 'hardware':
        divContainer = document.getElementsByClassName('hardwareOuter')
        break
      case 'course':
        divContainer = document.getElementsByClassName('courseOutere')
        break
      case 'work':
        divContainer = document.getElementsByClassName('workContext')
        break
      case 'software':
        divContainer = document.getElementsByClassName('softwareOuter')
        break
      default:
        break
    }
    if (divContainer) {
      const targetContainer = divContainer[0] as HTMLElement //Error:类型“Element”上不存在属性“offsetTop”,add 'as HTMLElement'
      if (targetContainer) {
        //TypeError: Cannot read properties of undefined (reading 'offsetTop')，add了if
        const targetY = targetContainer.offsetTop
        const currentY = document.documentElement.scrollTop
        scrollAnimation(currentY, targetY)
      }
      // 设置样式
      const siblingsElement = target.parentElement.parentElement.children
      for (let i = 0; i < siblingsElement.length; i++) {
        if (siblingsElement[i].firstChild.hasAttribute('class')) {
          siblingsElement[i].firstChild.removeAttribute('class')
        }
      }
      target.className = 'current'
    }
  }
  scrollHandle = () => {
    //Error:类型“Element”上不存在属性“offsetTop”,add 'as HTMLElement'
    const nodeList = document.querySelectorAll(
      '.homeContainer>div'
    ) as unknown as HTMLCollectionOf<HTMLElement>
    const affixContext = document.querySelectorAll('.affixContext>dl>dd>span')
    let containerOffsetTop = []
    for (let i = 3; i < nodeList.length; i++) {
      containerOffsetTop[i - 3] = nodeList[i].offsetTop
    }

    scrollHandleAffix(affixContext, containerOffsetTop)
  }

  handleScroll() {
    window.addEventListener('scroll', this.scrollHandle)
  }
  render() {
    return (
      <Affix className="affixContainer" offsetTop={50}>
        <div className="affixContext" onClick={this.handleClick.bind(this)}>
          <dl>
            <dd>
              <span id="us">关于我们</span>
            </dd>
            <dd>
              <span id="hardware">硬件系统</span>
            </dd>
            <dd>
              <span id="course">课程案例</span>
            </dd>
            <dd>
              <span id="work">我的作品</span>
            </dd>
            <dd>
              <span id="software">软件下载</span>
            </dd>
          </dl>
        </div>
      </Affix>
    )
  }

  componentDidMount() {
    this.handleScroll()
  }
}

export default HomeAffix

//对于两个函数的声明：

function scrollAnimation(currentY: number, targetY: number) {
  let newCurrentY = currentY || document.documentElement.scrollTop || document.body.scrollTop
  let needScrollTop = targetY - newCurrentY
  function scrollTopTo() {
    const distance = Math.ceil(needScrollTop / 10)
    newCurrentY += distance
    needScrollTop = targetY - newCurrentY
    document.documentElement.scrollTop = newCurrentY
    // 下面是停止条件
    if (needScrollTop < -10 || needScrollTop > 10) {
      requestAnimationFrame(scrollTopTo)
    }
  }
  requestAnimationFrame(scrollTopTo)

  document.documentElement.scrollTop = newCurrentY
  throw new Error('Function not implemented.')
}

function scrollHandleAffix(affixContext: any | NodeListOf<Element>, containerOffsetTop: any) {
  const body = document.documentElement
  const affixLen = affixContext.length
  const bodyScrollTop = document.documentElement.scrollTop
  for (let i = 0; i < containerOffsetTop.length; i++) {
    // 大于上一个div的一半时切换到当前div
    if (
      bodyScrollTop >= containerOffsetTop[i] - 100 &&
      bodyScrollTop < containerOffsetTop[i + 1] - 100
    ) {
      affixContext[i].className = 'current'
    } else {
      affixContext[i].className = ''
    }
    if (bodyScrollTop + body.clientHeight >= body.scrollHeight) {
      affixContext[affixLen - 1].className = 'current'
    }
  }
}
