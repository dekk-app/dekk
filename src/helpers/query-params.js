export const getQueryParams = search => {
  const queryParams = {}
  search.replace(/^\?/, '').split('&').forEach(str => {
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

const {live, present, edit} = getQueryParams(window.location.search)

export {
  edit as EDIT,
  live as LIVE,
  present as PRESENT
}
