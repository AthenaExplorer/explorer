export default {

  head: {
    title: '雅典娜浏览器 - 专业存储供应商数据服务' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no' },
      { hid: 'description', name: 'description', content: '雅典娜浏览器是专业存储供应商数据服务工具，为用户提供分布式存储激励层相关数据及存储供应商排行，包含存储供应商信息、存储区块奖励指数、最新高度、Gas动态，独创存储区块奖励满存算力产出、存储算力产出预估计算器。'},
      { hid: 'keywords', name: 'keywords', content: 'FIL,雅典娜浏览器,Gas,IPFS,filecoin,雅典娜云池,atpool,Athena Explorer,雅典娜区块链浏览器,Athena Filecoin Explorer,扇区质押,fil计算器,fil区块链浏览器,fil价格,f0{参数},fil节点查询,fil算力查询,filgas费查询' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/umeng.js' },
      {
        src: '/qrcode.min.js'  
      },
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  serverMiddleware: [
    '~/server/app.js'
  ],
  router: {
    middleware: ['i18n']
  },

  loading: { color: '#FFF2AF' },

  css: [
    '~/assets/css/base.css'
  ],

  plugins: [
    '~/plugins/axios.js',
    '~/plugins/element-ui.js',
    '~/plugins/components.js',
    '~/plugins/echarts.js',
    '~/plugins/filter.js',
    '~/plugins/i18n.js',
    '~/plugins/vue-count-to.js',
    '~/plugins/bus-inject.js',
    '~/plugins/vue-json-excel.js'
  ],

  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://[::1]:3000',
      changeOrigin: true
    }
  },

  purgeCSS: {
    enabled: false
  },

  build: {
    vendor: ['vue-i18n'],
    babel: {
      plugins: [
        ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
      ]
    },
    extractCSS: true,
 
    extend(config, { ctx, isClient }) {
      if (isClient) {
        config.performance = {
          hints: false
        }
      }
    }
  },
  watch: ['~/server']
}