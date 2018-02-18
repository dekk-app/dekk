export const url = () => new URL(window.location.href)

export const hash = (page, fragment) => {
  if (fragment) {
    window.location.hash = `#!/${page}/${fragment}/`
  } else {
    window.location.hash = `#!/${page}/`
  }
}
