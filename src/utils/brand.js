import device from './device'

const getBrand = async () => {
  let { brand } = await device.getInfo()
  brand = brand.toLowerCase()

  if (brand === 'xiaomi' || brand === 'redmi') {
    return 'xiaomi'
  } else if (['huawei', 'honor'].includes(brand)) {
    return 'huawei'
  } else if (['oppo', 'realme', 'oneplus'].includes(brand)) {
    return 'oppo'
  } else {
    return brand
  }
}

export { getBrand }
