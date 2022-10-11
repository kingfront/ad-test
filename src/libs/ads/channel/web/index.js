
const webview = require('@system.webview')
/**
* web广告
*/
export default {
    // 前往广告网页
    createWebAd(obj) {
        webview.loadUrl({
            url: obj.url,
            allowthirdpartycookies: true
        })
    }
}
