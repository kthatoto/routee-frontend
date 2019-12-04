
export default {
  mode: 'spa',
  srcDir: 'src',
  env: {
    serverUrl: process.env.SERVER_URL || 'http://0.0.0.0:3000'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Routee',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/styles/element-ui-override.styl',
    '~/styles/common.styl',
    '~/styles/variables.styl'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vue-awesome.js',
    '~plugins/apiClient.js',
    '~plugins/element-ui.js',
    '~plugins/dayjs.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    vendor: ['vue-awesome']
  }
}
