module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-normalize': options.normalize ? options.normalize : false,
    'autoprefixer': options.autoprefixer ? options.autoprefixer : false,
    'postcss-clean': options.clean ? options.clean : false
  }
})
