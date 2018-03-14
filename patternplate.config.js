module.exports = {
  docs: ["manual/**/*.md"],
  entry: ["@dekk/**/lib/**/demo.js"],
  render: "@patternplate/render-styled-components/render",
  mount: "@patternplate/render-styled-components/mount",
  logo: `
  <svg height="48" width="48" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="hsl(212, 44%, 29%)"></rect>
    <polygon fill="hsl(50, 70%, 70%)" points="5,5.07 13,5.07 17,12 13,18.92 5,18.92"></polygon>
    <polygon fill="hsl(50, 10%, 90%)" stroke="hsl(212, 44%, 29%)" stroke-width="1" points="9,6.8 15,6.8 18,12 15,17.19 9,17.19"></polygon>
  </svg>`,
  ui: {
    title: "Dekk"
  }
};
