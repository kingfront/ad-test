import device from '@system.device'

const getUserId = () => {
  return new Promise((resolve, reject) => {
    device.getUserId({
      success(data) {
        resolve(data.userId)
      },
      fail(data, code) {
        reject(data)
      },
    })
  })
}

const getInfo = () => {
  return new Promise((resolve, reject) => {
    device.getInfo({
      success(data) {
        resolve(data)
      },
      fail(data) {
        reject(data)
      },
    })
  })
}

export default { getUserId, getInfo }
export { getUserId, getInfo }
