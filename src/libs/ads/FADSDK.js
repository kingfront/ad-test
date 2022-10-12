/**
 * 朝发广告聚合SDK
 */
import manufacturer from './channel/index'
class FADSDK {
    constructor({ provider }) {
        this.version = '1.0.0'
        this.ads = manufacturer[provider]
        $utils.showToast(`广告类型：${provider}`)
    }
    // 是否开启日志，测试阶段打开
    setLogDebug(debug) {
        this.debug = debug
    }
    // 获取sdk版本号
    getSDKVersion() {
        return this.version
    }
    // 激励视频
    createRewardedVideoAd(obj) {
        let rewardVideo = this.ads.createRewardedVideoAd(obj)
        this._makeNotEvent(rewardVideo)
        return rewardVideo
    }
    // Banner广告
    createBannerAd(obj) {
        let bannerAd = this.ads.createBannerAd(obj)
        this._makeNotEvent(bannerAd, ['hide', 'onResize', 'offResize'])
        return bannerAd
    }
    // 插屏广告
    createInterstitialAd(obj) {
        let interstitialAd = this.ads.createInterstitialAd(obj)
        this._makeNotEvent(interstitialAd)
        return interstitialAd
    }
    // 原生 native 广告
    createNativeAd(obj) {
        let nativeAd = this.ads.createNativeAd(obj)
        this._makeNotEvent(nativeAd)
        return nativeAd
    }

    // web广告
    createWebAd(obj) {
        let webAd = this.ads.createWebAd(obj)
        return webAd
    }

    // 原生视频
    preloadAd(obj) {
        let preloadAd = this.ads.preloadAd(obj)
        return preloadAd
    }

    // 处理个别平台缺失事件
    _makeNotEvent(adObj, array = []) {
        const eventArray = [...array, 'show', 'onLoad', 'offLoad', 'onClose', 'offClose', 'offError', 'destroy']
        eventArray.forEach((event) => {
            adObj[event] instanceof Function
                ? true
                : adObj[event] = () => new Promise(resolve => resolve(false))
        })
    }
}

export default FADSDK
export { FADSDK }