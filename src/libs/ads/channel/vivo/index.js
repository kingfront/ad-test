const ad = require('@service.ad')
/**
 * vivo厂商
 */
export default {
  // 创建激励视频
  createRewardedVideoAd(obj) {
    console.info(obj)
    return ad.createRewardedVideoAd(obj)
  },
  // Banner广告
  createBannerAd(obj) {
    return ad.createBannerAd(obj)
  },
  // 插屏广告
  createInterstitialAd(obj) {
    return ad.createInterstitialAd(obj)
  },
  preloadAd(obj) {
    return ad.preloadAd(obj)
  },
  // 原生 native 广告
  createNativeAd(obj) {},
}
