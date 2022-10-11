import storage from '@system.storage'

const store = {
  get(key) {
    return new Promise((resolve, reject) => {
      storage.get({
        key,
        success(data) {
          resolve(data)
        },
        fail(data, code) {
          reject(new Error(JSON.stringify({ data, code })))
        },
      })
    })
  },
  set(key, value) {
    return new Promise((resolve, reject) => {
      storage.set({
        key,
        value,
        success(data) {
          resolve('success')
        },
        fail(data, code) {
          reject(new Error(JSON.stringify({ data, code })))
        },
      })
    })
  },
  clear() {
    return new Promise((resolve, reject) => {
      storage.clear({
        success(data) {
          resolve(data)
        },
        fail(data, code) {
          reject(new Error(JSON.stringify({ data, code })))
        },
      })
    })
  },
  delete(key) {
    return new Promise((resolve, reject) => {
      storage.delete({
        key,
        success(data) {
          resolve(data)
        },
        fail(data, code) {
          reject(new Error(JSON.stringify({ data, code })))
        },
      })
    })
  },
}

export default store
