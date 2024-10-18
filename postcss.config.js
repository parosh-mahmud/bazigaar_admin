module.exports = {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  }

  module.exports = {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ]
  }

//   module.exports = {
//     plugins: {
//       tailwindcss: {},
//       autoprefixer: {},
//       ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
//     }
//   }