import fs from 'fs'
const environment = process.env.NODE_ENV
const env = require(`./env/${environment}.ts`)

const conf = JSON.parse(fs.readFileSync('static/data/conf.json'))

for (const key in conf) {
  env[key] = conf[key]
}

env.github = 'https://github.com/shibusawa-dlab/lab1'
env.github_pages = 'https://shibusawa-dlab.github.io/lab1'
env.host = env.BASE_URL
env.prefix = 'https://shibusawa-dlab.github.io'
env.endpoint = 'https://dydra.com/ut-digital-archives/shibusawa/sparql'
env.index = 'main'

env.menu = [
  /*
  {
    label: 'about_',
    to: {
      name: 'about-slug',
    },
    icon: 'mdi-information',
    top: true,
    type: 'about',
    weight: 0,
    // description: 'このサイトは、ＷＥＢ上で正保琉球国絵図の画像を公開するとともに、絵図に描き込まれた情報を分析するために構築されたデジタルアーカイブです。',
  },
  */
  {
    label: 'news',
    to: {
      name: 'news',
    },
    top: false,
    type: 'about',
    weight: 3,
    // description: 'このサイトは、ＷＥＢ上で正保琉球国絵図の画像を公開するとともに、絵図に描き込まれた情報を分析するために構築されたデジタルアーカイブです。',
  },

  /*
  {
    label: 'progress',
    to: {
      name: 'about-slug',
      params: { slug: 'progress' },
    },
    top: false,
    type: 'about',
    weight: 1,
    // description: 'このサイトは、ＷＥＢ上で正保琉球国絵図の画像を公開するとともに、絵図に描き込まれた情報を分析するために構築されたデジタルアーカイブです。',
  },
  {
    label: 'team',
    to: {
      name: 'about-slug',
      params: { slug: 'team' },
    },
    top: false,
    type: 'about',
    weight: 2,
    // description: 'このサイトは、ＷＥＢ上で正保琉球国絵図の画像を公開するとともに、絵図に描き込まれた情報を分析するために構築されたデジタルアーカイブです。',
  },
  {
    label: 'news',
    to: {
      name: 'news',
    },
    top: false,
    type: 'about',
    weight: 3,
    // description: 'このサイトは、ＷＥＢ上で正保琉球国絵図の画像を公開するとともに、絵図に描き込まれた情報を分析するために構築されたデジタルアーカイブです。',
  },
  */
  {
    label: 'search',
    to: {
      name: 'search',
    },
    icon: 'mdi-magnify',
    // description: '正保の琉球国絵図３舗に書き込まれた文字などの情報（全895件）を検索できます。',
    top: true,
    type: 'tools',
    weight: 0,
  },
  {
    label: 'category',
    to: {
      name: 'category',
    },
    icon: 'mdi-tag',
    // description: '正保の琉球国絵図３舗に書き込まれた文字などの情報（全895件）につき、島や村などの分類によって検索できます。',
    top: true,
    type: 'tools',
    weight: 1,
  },
  {
    label: 'Ngram Viewer',
    to: {
      name: 'ngram',
    },
    icon: 'mdi-chart-bar',
    // description: '正保の琉球国絵図３舗に書き込まれた文字などの情報（全895件）につき、島や村などの分類によって検索できます。',
    top: true,
    type: 'tools',
    weight: 2,
  },
  /*
  {
    label: 'category',
    to: {
      name: 'category',
    },
    icon: 'mdi-tag',
    // description: '正保の琉球国絵図３舗に書き込まれた文字などの情報（全895件）につき、島や村などの分類によって検索できます。',
    top: true,
    type: 'tools',
    weight: 2,
  },
  */
  /*
  {
    label: 'list_',
    to: {
      name: 'collection',
    },
    icon: 'mdi-view-list',
    // description: '正保の琉球国絵図３舗につき、絵図の画像データの閲覧と、書き込まれた文字の検索ができます。',
    top: true,
    type: 'tools',
    weight: 1,
  },

  
  {
    label: 'khirin-t',
    href: 'https://khirin-t.rekihaku.ac.jp/',
    target: '_blank',
    type: 'links',
    weight: 0,
  },
  
  {
    label: '総合資料学',
    href: 'https://www.metaresource.jp/',
    target: '_blank',
    type: 'links',
    weight: 1,
  },
  */
  {
    label: '史料集版面ギャラリー',
    href: 'https://www.hi.u-tokyo.ac.jp/publication/dip',
    target: '_blank',
    type: 'links',
    weight: 0,
  },
  {
    label: 'Digital Image Publisher',
    href:
      'https://www.hi.u-tokyo.ac.jp/dip/?u=https%3A%2F%2Fwww.hi.u-tokyo.ac.jp%2Fassets%2Fjson%2Fdip%2Finternal.json',
    target: '_blank',
    type: 'links',
    weight: 1,
  },
  {
    label: '東京大学史料編纂所',
    href: 'https://www.hi.u-tokyo.ac.jp/',
    target: '_blank',
    type: 'links',
    weight: 2,
  },

  {
    label: '史料集の統計分析例(Googleデータポータル)',
    top: true,
    href: 'https://datastudio.google.com/s/r-3IeQHVmwA',
    target: '_blank',
    type: 'about',
    weight: 4,
    icon: 'mdi-table',
  },

  {
    label: 'OCR結果の確認(IIIFコレクション)',
    top: true,
    href:
      'https://www.kanzaki.com/works/2016/pub/image-annotator?u=https://d2fgucnbaqurvq.cloudfront.net/v3/top.json',
    target: '_blank',
    type: 'about',
    icon: 'mdi-ocr',
    weight: 5,
  },
]

/// /

// path
const baseUrl = env.BASE_URL || ''
const baseDir = env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = '渋沢栄一ダイアリー'
env.siteName = siteName

const siteDesc =
  '『渋沢栄一伝記資料』別巻第1, 第2掲載の渋沢栄一の日記および集会日時通知表を公開しています。\n\n本サイトは、令和2（2020）年度国立歴史民俗博物館総合資料学奨励研究「TEIを用いた『渋沢栄一伝記資料』テキストデータの再構築と活用」の成果として構築されました。'
env.siteDesc = siteDesc

const footer = 'abc'
env.footer = footer
const siteKeywords = 'IIIF, TEI'

// images
const iconImages = baseDir + 'img/icons/'
const ogpImages = basePath + 'img/ogp/' // cdnPath + 'img/ogp/'
const assets = basePath + 'assets/css/'

env.top = basePath + 'img/ogp/home.webp'

// pwa
const shortName = 'shibusawa'
const manifestIcon = 'img/icons/icon-512.png'
// const splashscreens = cdnPath + 'img/splashscreens/'

/* nuxt.config.js */
// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/app1/', // '/genji/',
        },
      }
    : {}

export default {
  ...routerBase,
  // Target (https://go.nuxtjs.dev/config-target)

  ssr: env.ssr,
  target: 'static',
  // srcDir: 'src/',

  env,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang,
    },
    titleTemplate: `%s - ${siteName}`,
    title: siteName,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no',
      },
      // SEO関連
      { hid: 'description', name: 'description', content: siteDesc },
      { hid: 'keywords', name: 'keywords', content: siteKeywords },
      // ogp関連
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: siteName,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:title', property: 'og:title', content: siteName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDesc,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogpImages}home.webp`,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    link: [
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: iconImages + 'favicon-16.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: iconImages + 'favicon-32.png',
      },
      {
        rel: 'icon',
        sizes: '48x48',
        type: 'image/png',
        href: iconImages + 'favicon-48.png',
      },
      {
        rel: 'icon',
        sizes: '72x72',
        type: 'image/png',
        href: iconImages + 'favicon-72.png',
      },
      // apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: iconImages + 'apple-touch-icon.png',
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      },
      {
        rel: 'stylesheet',
        href: assets + 'CETEIcean.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
    script: [
      {
        // src: 'https://unpkg.com/mirador@latest/dist/mirador.min.js',
      },
    ],
  },

  manifest: {
    lang,
    name: siteName,
    short_name: shortName,
    description: siteDesc,
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
  },
  icon: {
    iconFileName: manifestIcon,
  },

  loading: { color: '#E64A19', height: '5px' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/utils.ts',
    /* { src: '@/plugins/gtag.js', ssr: false }, */
    { src: '~plugins/leaflet.js', ssr: false },
    { src: '~plugins/cetei.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    [
      '@nuxt/typescript-build',
      {
        typeCheck: false,
      },
    ],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  moment: {
    // ここにオプションが記述できる
    locales: ['ja'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-gtag',
    'nuxt-i18n',
    // Simple usage
    // '@nuxtjs/amp',
    '@nuxt/content',
  ],

  'google-gtag': {
    id: env.gtag, // サイトのID
    debug: true, // 開発環境でも表示したい場合
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: baseUrl ? new URL(baseUrl).origin : baseUrl,
    routes: async () => {
      let pages = []
      pages = pages.concat(getPageList())

      return pages
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    defaultAssets: {
      font: false,
      icons: 'mdi',
    },
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en_US', file: 'en.json' },
      { code: 'ja', iso: 'ja_JP', file: 'ja.json' },
    ],
    defaultLocale: 'ja',
    vueI18nLoader: true,
    lazy: true,
    langDir: 'lang/',
    // strategy: 'no_prefix'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    optimization: {
      splitChunks: {
        name: true,
      },
    },
    standalone: true, // これを追加！
  },

  generate: {
    optimization: {
      splitChunks: {
        name: true,
      },
    },
    crawler: false,
    exclude: [
      /^\/tei/, // /admin で始まるパス
    ],
    routes() {
      return getPageList()
    },
  },
}

function getPageList() {
  const pages = []

  const fs = require('fs')

  const docs = JSON.parse(fs.readFileSync('static/data/docs.json'))

  for (const id in docs) {
    const payload = docs[id] || {}

    pages.push({
      route: `/item/${id}`,
      payload,
    })

    pages.push({
      route: `/en/item/${id}`,
      payload,
    })
  }

  // calendar

  /*

  const years = JSON.parse(fs.readFileSync('static/data/years.json'))

  // const docs = JSON.parse(fs.readFileSync('static/data/docs.json'))

  for (const year in years) {
    for (const month in years[year]) {
      // console.log({ year, month })

      const payload = {}

      pages.push({
        route: `/calendar/month/${year}/${month}`,
        payload,
      })

      pages.push({
        route: `/en/calendar/month/${year}/${month}`,
        payload,
      })
    }
  }

  */

  // entity

  /*
  const entity = JSON.parse(fs.readFileSync('static/data/entity.json'))

  for (const field in entity) {
    for (const item of entity[field]) {
      const payload = {
        field,
        id: item.id,
      }

      pages.push({
        route: `/entity/${field}/${item.id}`,
        payload,
      })

      pages.push({
        route: `/en/entity/${field}/${item.id}`,
        payload,
      })
    }
  }
  */

  const xmls = ['DKB01', 'DKB02']

  for (const xml of xmls) {
    pages.push({
      route: `/viewer/${xml}`,
    })

    pages.push({
      route: `/en/viewer/${xml}`,
    })
  }

  const ads = JSON.parse(fs.readFileSync('static/data/ad.json'))

  for (const ad of ads) {
    if (!ad['@id']) {
      continue
    }
    const id = ad['@id'].split('/items/')[1]

    pages.push({
      route: `/ad/${id}`,
    })

    pages.push({
      route: `/en/ad/${id}`,
    })
  }

  return pages
}
