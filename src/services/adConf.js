import store from '../utils/store'
import { cleanObj } from '../utils/object'
import request from '../cmps/em-request/index'
import { getGlobalData, setGlobalData } from '../global'
const { get } = request
import sampleAdConfig from './sampleAdConfig'

const UnattrModes = [2, 3, 4, 5] // 无归因的模式

async function getAdConfig() {
  const App = getGlobalData('App')

  const pid = await store.get('Pid')
  const clickid = await store.get('ClickId')
  const adid = await store.get('Adid')

  // 开发时用
  // const pid = 't221005'
  // const clickid = 'ccccccccccccccccccccccccccccccccccccccc'
  // const adid = 'cccccccccccccccccccccccccccccccccccccc'
  // // 开发时用

  try {
    const params = { pid, clickid, adid }
    console.log('params', params, now())
    const { data: serverAdConfig } = await get('/qa-conf', params)

    const adConfig = cleanObj(serverAdConfig)
    // const adConfig = sampleAdConfig

    // console.log('adConfig', JSON.stringify(adConfig, null, 2))
    // console.log('adConfig.mode', adConfig.mode)

    if (adConfig.mode === 1) {
      // 用户投诉，直接退出
      App.exit()
      return
    }

    setGlobalData('IsAttr', !UnattrModes.includes(adConfig.mode))
    setGlobalData('AdConfig', adConfig)
    store.set('AdConfig', adConfig)

    return adConfig
  } catch (error) {
    console.log('getAdConfig error', error)
    throw new Error(error.message)
  }
}

export { getAdConfig }
