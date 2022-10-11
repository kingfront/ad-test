import ad from '@service.ad'

const defaultParams = { type: 'native', adCount: 1 }

function preloadAd(params) {
  const mergedParams = { ...defaultParams, ...params }
  console.log('vivo preloadAd params: ', JSON.stringify(mergedParams, null, 2))

  return new Promise((resolve, reject) => {
    ad.preloadAd({
      ...mergedParams,
      success(data) {
        console.log('vivo preloadAd success data: ', JSON.stringify(data, null, 2))
        resolve(data.adList[0])
      },
      fail(data, code) {
        if (code === 205) {
          resolve(data.adList[0])
        } else {
          reject(data)
        }
      },
    })
  })
}

const vivoAd = { preloadAd }

export default vivoAd

export { preloadAd }
