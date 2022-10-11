import ad from '@service.ad'
import device from '@system.device'
import prompt from '@system.prompt'
import { getAdConfig } from '/src/services/adConf'

const DefaultTimeout = 5e3
const VENDORS = ['xiaomi', 'oppo', 'vivo', 'huawei']

class EmAwaredAd {
  constructor() {
    this.__ad__ = null
    this.timeoutResolve = null
    this.adResolve = null
    this.adProvider = null
    this.adConfig = null
    this.slotIds = []
    this.currentSlotId = null
    this.isLoaded = false // 广告是否加载完成
    this.isLoading = false // 广告是否加载中
    this.errorFn = null // 调用者提供的错误回调
    this.loadFn = null // 调用者提供的已加载回调
    this.closeFn = null // 调用者提供的关闭回调
    this.timer = null
    this.debounceTimer = null
  }

  /* public */
  async create() {
    this.adConfig = await getAdConfig()
    console.log('create', this.adConfig)
    this.slotIds = ['2870dadd595b457bb66745fb55e15a9d']
    // this.slotIds = this.adConfig.rewardedSlotIds
    // this._initAd()
  }

  /* public */
  load() {
    console.log('load')
    this._initAd()
  }

  /* public */
  loadNext() {
    this._initAd()
  }

  /* public */
  show() {
    if (this.isLoaded) {
      this.isLoaded = false
      console.log('show')
      this.__ad__.show()
    }
  }

  /* public */
  isReady() {
    return this.isLoaded
  }

  /* public */
  onLoad(loadFn) {
    this.loadFn = loadFn
  }

  /* public */
  onError(errorFn) {
    this.errorFn = errorFn
  }

  /* public */
  onClose(closeFn) {
    this.closeFn = closeFn
  }

  /* internal */
  async _initAd() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.isLoaded = false

    if (!this.currentSlotId) {
      this.currentSlotId = this.slotIds.shift()
    }

    if (!this.currentSlotId) {
      this._processError()
      return
    }

    this.provider = await this._getAdProvider()

    if (!VENDORS.includes(this.provider)) {
      this._processError()
      return
    }

    this._intResolver()
    this.timer = setTimeout(() => {
      this.timeoutResolve('timeout')
    }, DefaultTimeout)

    if (!this.__ad__) {
      this.__ad__ = ad.createRewardedVideoAd({ adUnitId: this.currentSlotId })
    }

    if (this.adProvider === 'huawei') {
      this.__ad__ && this.__ad__.destroy && this.__ad__.destroy()
    }

    this.__ad__.onError(this._onError.bind(this))
    this.__ad__.onClose(this._onClose.bind(this))
    this.__ad__.onLoad(this._onLoad.bind(this))

    if (this.adProvider !== 'vivo') {
      this.__ad__.load()
    }
  }

  /* internal */
  async _getAdProvider() {
    let _provider = ad.getProvider()
    if (_provider === '') {
      const res = await device.getInfo()
      const brand = res.data.brand
      if (brand === 'redmi') {
        _provider = 'xiaomi'
      }
    } else {
      _provider = _provider.toLowerCase()
    }
    return _provider
  }

  /* internal */
  _onLoad() {
    this.adResolve('adload')
    this.timer && clearTimeout(this.timer)
    this.isLoaded = true
    this.isLoading = false
    this.loadFn && this.loadFn()
  }

  /* internal */
  _onError(err) {
    console.count('_onError')
    console.log('_onError, err', err, Date.now())

    this.adResolve('aderror')
    this.timer && clearTimeout(this.timer)
    this._processError(err)
    prompt.showToast({ message: err })

    // const fn = this.debounce(() => {
    //   console.log('_onError err', err)
    //   this.adResolve('aderror')
    //   this.timer && clearTimeout(this.timer)
    //   this._processError(err)
    // })
    // fn()
  }

  /* internal */
  _onClose(res) {
    this.timer && clearTimeout(this.timer)
    this.isLoaded = false
    this.isLoading = false
    this.closeFn && this.closeFn(res)
  }

  /* internal */
  _intResolver() {
    const a = new Promise((resolve) => (this.timeoutResolve = resolve))
    const b = new Promise((resolve) => (this.adResolve = resolve))
    const p = Promise.race([a, b])
    p.then((res) => {
      if (res !== 'timeout') return

      let err = { msg: 'timeout' }
      this._processError(err)
    })
  }

  /* internal */
  _processError(err) {
    this.isLoaded = false
    this.isLoading = false
    this.errorFn && this.errorFn(err)
  }

  debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }
}

export default EmAwaredAd
