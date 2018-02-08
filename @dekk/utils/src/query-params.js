export const getQueryParams = search => {
  const queryParams = {}
  search
    .replace(/^\?/, '')
    .split('&')
    .forEach(str => {
      const [key, value] = str.split('=')
      switch (value) {
        case 'true':
          queryParams[key] = true
          break
        case 'false':
          queryParams[key] = false
          break
        default:
          queryParams[key] = value
          break
      }
    })
  return queryParams
}
