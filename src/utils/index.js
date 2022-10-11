export const isEmptyObject = (obj) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
  return !Object.keys(obj).length
}

export const extendUrl = (url, params) => {
  if (isEmptyObject(params) || !params) return url
  let str = ''

  Object.entries(params).forEach(([k, v]) => {
    if (str !== '') str += '&'

    if (url.indexOf(`${k}=`) === -1) {
      str += `${k}=${encodeURIComponent(v)}`
    }
  })

  return str ? `${url}${url.indexOf('?') === -1 ? '?' : '&'}${str}` : url
}
