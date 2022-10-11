import ad from '@service.ad'
import store from './store'

const channel = store.get('Pid')

const Shit = {
  preloadAd(params) {
    return new Promise((resolve, reject) => {
      ad.preloadAd({
        ...params,
        channel,
        success(data) {
          resolve(data.adList[0])
        },
        fail(data, code) {
          if (code === 205) {
            resolve(data.adList[0])
          } else {
            reject(data)
          }
        }
      })
    })
  }
}

export default Shit
