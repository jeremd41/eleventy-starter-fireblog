require("dotenv").config();
const moment = require('moment');
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");


// Filters
module.exports = function (eleventyConfig) {

  // ------------------------------------------------------------------------
  // Plugins
  // ------------------------------------------------------------------------

  const rss = require('@11ty/eleventy-plugin-rss');
  eleventyConfig.addPlugin(rss);

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', require('./utils/htmlmin.js'))
  }

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  // Responsive image
  eleventyConfig.addFilter("imgSuffix", (imgStr, suffix)=> {
    const i = imgStr.lastIndexOf('.');
    const imgPath = imgStr.substring(0, i);
    const ext = imgStr.substring(i + 1);
    return `${imgPath}-${suffix}.${ext}`;
  });

  // Debug utilities
  eleventyConfig.addFilter("dump", obj => util.inspect(obj));

  // JSONIFY
  eleventyConfig.addFilter('jsonify', function (variable) {
    return JSON.stringify(variable);
  });

  // Desaccentify
  eleventyConfig.addFilter("desaccentify", function (string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  });

  // Display the dirname of a file
  eleventyConfig.addFilter("dirname", function (filePath) {
    return path.dirname(filePath);
  });

  // Create an array in Liquid
  eleventyConfig.addFilter("push", function (array, element) {
    return array.concat(element).filter(n => n !== '');
  });

  // Give the lenght of an array or an object
  eleventyConfig.addFilter("length", function (element) {
    if (Array.isArray(element)) {
      return element.length;
    }
    if (typeof element === 'object') {
      return Object.keys(element).length;
    }
  });

  // Encode url
  eleventyConfig.addFilter("base64", function (url) {
    return Buffer.from(url).toString('base64');
  });

  // Date filter
  eleventyConfig.addFilter("dateIso", date => {
    return moment(date).toISOString();
  });

  // Date filter
  eleventyConfig.addFilter("date_to_string", function (date) {
    return moment(date).format('DD MMM YYYY');
  });

  // Date filter
  eleventyConfig.addFilter("date_to_long_string", function (date) {
    return moment(date).format('DD MMMM YYYY');
  });

  // Math filter
  eleventyConfig.addFilter("plus", function (val, number) {
    return Number(val) + Number(number);
  });

  // File format filter
  eleventyConfig.addFilter("filesizeconvert", function (bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '<small>' + sizes[i] + '</small>';
  });

  // Comma converter filter
  eleventyConfig.addFilter("commaconvert", function (num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  });

  // Humanize filter
  eleventyConfig.addFilter("humanize", function (str) {
    return str
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
  });

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  eleventyConfig.addPassthroughCopy("assets")
  eleventyConfig.addPassthroughCopy("manifest.webmanifest")
  eleventyConfig.addPassthroughCopy("sw-window.mjs")

  return {
    dir: {
      layouts: "_layouts",
      output: '_site',
      data: '_data'
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk'
  }
}
