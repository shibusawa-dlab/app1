<template>
  <div>
    <template>
      <template v-if="loading"
        ><div class="pa-10 text-center">
          <p>Loading...</p>
          <p>{{ $t('読み込みに少し時間がかかります。') }}</p>
        </div>
      </template>

      <div v-show="!loading">
        <v-navigation-drawer
          v-model="drawer"
          style="z-index: 100000"
          app
          :temporary="false"
          :width="(256 * 3) / 2"
        >
          <v-btn class="ma-2" icon top right @click="drawer = !drawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <Menu v-if="xml != null"></Menu>
        </v-navigation-drawer>

        <v-navigation-drawer
          v-model="drawer2"
          app
          :temporary="false"
          right
          :width="256 * 2"
        >
          <v-btn class="ma-2" icon top right @click="drawer2 = !drawer2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <no-ssr>
            <Metadata></Metadata>
          </no-ssr>
        </v-navigation-drawer>

        <v-app-bar flat>
          <v-btn icon @click="drawer = !drawer"
            ><v-icon>mdi-view-list</v-icon></v-btn
          >

          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-app-bar-nav-icon @click.stop="drawer2 = !drawer2" />
        </v-app-bar>

        <v-container fluid>
          <v-row class="mt-2">
            <v-col cols="12" :sm="manifest ? 6 : 12">
              <v-card
                id="container"
                flat
                outlined
                class="scroll vertical"
                :style="`height: ${height * 0.85}px; width: ${
                  manifest && $vuetify.breakpoint.name != 'xs'
                    ? width / 2
                    : width
                }px;`"
              >
                <div class="pa-4 px-5">
                  <div id="tei" />
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" :sm="manifest ? 6 : 12">
              <iframe
                v-if="manifest"
                :src="
                  baseUrl +
                  `/mirador/?manifest=${manifest}&canvas=${canvas}&bottomPanel=false`
                "
                width="100%"
                :style="`height: ${height * 0.85}px;`"
                allowfullscreen="allowfullscreen"
                frameborder="0"
              >
              </iframe>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import $ from 'jquery'
import Menu from '~/components/viewer/Menu.vue'
import Metadata from '~/components/viewer/Metadata.vue'

export default {
  components: {
    Menu,
    Metadata,
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL || '',
      pages: process.env.github_pages,

      loading: false,

      width: -1, // window.innerWidth,
      height: -1, // window.innerHeight,

      drawer: false,
      drawer2: false,

      canvas: '',
      manifest: null,

      title: '',
    }
  },
  computed: {
    xml: {
      get() {
        return this.$store.getters.getXml
      },
      set(value) {
        this.$store.commit('setXml', value)
      },
    },
    id: {
      get() {
        return this.$store.getters.getId
      },
      set(value) {
        this.$store.commit('setId', value)
      },
    },
  },
  watch: {
    // この関数は question が変わるごとに実行されます。
    id(val) {
      this.$router.push(
        this.localePath({
          name: 'viewer-id',
          params: {
            id: this.$route.params.id,
          },
          query: {
            id: val,
          },
        }),
        () => {},
        () => {}
      )

      this.scroll()
    },
  },

  mounted() {
    this.loading = true

    if (process.browser) {
      document.getElementById('container').addEventListener('wheel', (e) => {
        e.preventDefault()
        document.getElementById('container').scrollLeft -= e.deltaY
      })

      window.addEventListener('resize', this.handleResize)

      this.width = window.innerWidth
      this.height = window.innerHeight
    }

    const fileId = this.$route.params.id
    const query = this.$route.query
    const url = query.u || this.pages + '/tei/' + fileId + '.xml'
    // const url = this.baseUrl + '/data/DKB01_チェック用.xml' // テスト
    const CETEIcean = new CETEI()

    CETEIcean.addBehaviors({
      tei: {
        graphic() {},
      },
    })

    const self = this
    CETEIcean.getHTML5(url, function (data) {

      self.xml = data
      self.title = $(data).find('tei-title')[0].textContent

      $('#tei').append(data)

      // マニフェスト
      const manifest = $('tei-facsimile').attr('source')
      self.manifest = manifest

      const pbs = $('tei-pb')
      for (let i = 0; i < pbs.length; i++) {
        const pb = pbs[i]

        if (!$(pb).attr('corresp')) {
          continue
        }
        const corresp = $(pb).attr('corresp').replace('#', '')

        const source = $('#' + corresp)
        const canvas = source.attr('source')

        const iiificon = $(
          `<div class="mx-2" style="cursor: pointer;"><img width="30px" src="${
            self.baseUrl
          }/img/icons/image-24px.svg"/><span class="ma-1" style="color : #9E9E9E">[Page @${$(
            pb
          ).attr('corresp')}]</span></div>`
        )
        iiificon.on('click', function () {
          self.canvas = canvas
        })
        $(pb).prepend(iiificon)
      }

      self.loading = false

      if (process.browser) {
        // 以下、少し時間を置く？
        window.setTimeout(function () {
          const queryId = query.id
          if (queryId) {
            self.id = queryId
          }
        }, 1)
      }
    })
  },

  methods: {
    handleResize() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth
      this.height = window.innerHeight
    },

    scroll() {
      if (!proccess.browser) {
        return
      }
      const id = this.id

      const point2 = document
        .querySelector('#container')
        .getBoundingClientRect()

      const options = {
        container: '#container',
        offset: -1 * point2.width, // + point.width,
        x: true,
      }
      VueScrollTo.scrollTo('#' + id, 0, options)
    },
  },
  head() {
    const title = this.title
    return {
      titleTemplate: null,
      title,
    }
  },
}
</script>
<style>
/* stylelint-disable */
.scroll {
  overflow-y: auto;
}

.vertical {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}

tei-persName {
  background-color: #ffccbc;
}

tei-placeName {
  background-color: #c8e6c9;
}

tei-date {
  background-color: #bbdefb;
}

tei-time {
  background-color: #fff9c4;
}

tei-head {
  margin: 20px;
  font-size: large !important;
  font-weight: bold;
}
</style>
