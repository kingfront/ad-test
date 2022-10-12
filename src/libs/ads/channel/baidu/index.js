
/**
 * baidu
 */
export default {
    // 创建激励视频
    createRewardedVideoAd(obj) {
        console.info(getGlobalData('App'))
        const { union_quick_app_sdk } = getGlobalData('App').$def
        return union_quick_app_sdk.createRewardedVideoAd(obj)
    }
}
