import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config()

export default {
  mode: 'spa',
  srcDir: 'src',
  env: {
    SERVER_URL: process.env.SERVER_URL,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    '@/plugins/apiClient',
    '@/plugins/element-ui',
    '@/plugins/vue-awesome',
    '@/plugins/dayjs',
    '@/plugins/firebase',
    '@/plugins/globalComponents'
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: '.' }],
    ['nuxt-stylus-resources-loader', [
      resolve(__dirname, 'src/styles/sign_form.styl'),
      resolve(__dirname, 'src/styles/variables.styl')
    ]]
  ],
  css: [
    '~/styles/common.styl',
    '~/styles/element-ui-override.styl',
    'element-ui/lib/theme-chalk/index.css'
  ],
  axios: {},
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  }
}
