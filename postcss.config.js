const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './_site/**/*.html',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})
const postcssclean = require('postcss-clean')({
  level: 1
})

module.exports = {
  plugins: [
    require('postcss-preset-env'),
    ...(process.env.NODE_ENV === 'production' ? [postcssclean] : []),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ],
}
