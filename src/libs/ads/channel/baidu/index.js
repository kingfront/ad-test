
const union_quick_app_sdk = getGlobalData('App').$def.union_quick_app_sdk
/**
 * baidu
 */
export default {
    // 创建激励视频
    createRewardedVideoAd(obj) {
        return union_quick_app_sdk.createRewardedVideoAd(obj)
    }
}
