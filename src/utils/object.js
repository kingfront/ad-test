function cleanObj(obj) {
  let tmp = {}
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    tmp = value !== '' ? { ...tmp, [key]: value } : tmp
  })
  return tmp
}

export { cleanObj }
