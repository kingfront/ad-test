
const ad = require('@service.ad')
/**
 * oppo厂商
 */
export default {
    // 创建激励视频
    createRewardedVideoAd(obj) {
        let reward =  ad.createRewardedVideoAd(obj)
        return reward
    },
    // Banner广告
    createBannerAd(obj) {
        return ad.createBannerAd(obj)
    },
    // 插屏广告
    createInterstitialAd(obj) {
        return ad.createInterstitialAd(obj)
    },
    // 原生 native 广告
    createNativeAd(obj) {
        return ad.createNativeAd(obj)
    }
}
