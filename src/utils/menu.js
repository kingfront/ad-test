import device from '@system.device'

async function getMenuRect(self) {
  let { windowWidth, statusBarHeight, getMenuBarBoundingRect, getMenuBarRect } = self.$page

  const { data } = await device.getInfo()

  if (!windowWidth) {
    windowWidth = data.windowWidth
  }

  if (!statusBarHeight) {
    statusBarHeight = data.statusBarHeight
  }

  const designWidth = 750
  const ratio = designWidth / windowWidth
  let dpi = Math.max(1, ratio)
  statusBarHeight = statusBarHeight * ratio
  let menuRectStyle = null

  if (getMenuBarBoundingRect) {
    try {
      menuRectStyle = getMenuBarBoundingRect()
      dpi = 1
    } catch (error) {
      menuRectStyle = null
    }
  } else if (getMenuBarRect) {
    menuRectStyle = getMenuBarRect()
    if (menuRectStyle.menuBarRight >= designWidth) {
      dpi = ratio
    }
  }

  if (!menuRectStyle || menuRectStyle.menuBarHeight < 10 || menuRectStyle.menuBarBottom > 500) {
    // default
    menuRectStyle = {
      menuBarBottom: statusBarHeight + 75,
      menuBarHeight: 55,
      menuBarLeft: 558.3,
      menuBarRight: 716.7,
      menuBarTop: statusBarHeight + 20,
      menuBarBottom: statusBarHeight + 20 + 55,
      menuBarWidth: 158.3,
    }
  }

  Object.keys(menuRectStyle).forEach((k) => {
    menuRectStyle[k] = menuRectStyle[k] * dpi
  })

  return {
    statusBarHeight: Number(statusBarHeight.toFixed(2)),
    menuBarHeight: Number(menuRectStyle.menuBarHeight.toFixed(2)),
    menuBarWidth: Number(menuRectStyle.menuBarWidth.toFixed(2)),
    menuBarTop: Number(menuRectStyle.menuBarTop.toFixed(2)),
    menuBarBottom: Number(menuRectStyle.menuBarBottom.toFixed(2)),
    paddingLeft: Number((designWidth - menuRectStyle.menuBarRight).toFixed(2)),
    paddingRight: Number((menuRectStyle.menuBarWidth + designWidth - menuRectStyle.menuBarRight).toFixed(2)),
    paddingBottom: Number((menuRectStyle.menuBarTop - statusBarHeight).toFixed(2)),
  }
}

const menu = {
  getMenuRect,
}

export { getMenuRect }
export default menu
