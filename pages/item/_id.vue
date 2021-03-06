<template>
  <div>
    <Breadcrumbs :items="items" />
    <v-container class="pt-5">
      <p class="mb-5 text-center">
        <v-btn
          v-if="item.next"
          dark
          rounded
          depressed
          class="mx-1"
          :to="
            localePath({
              name: 'item-id',
              params: { id: item.next },
            })
          "
          ><v-icon>mdi-chevron-left</v-icon> {{ $t('next') }}</v-btn
        >

        <v-btn
          v-if="item.prev"
          dark
          rounded
          depressed
          class="mx-1"
          :to="
            localePath({
              name: 'item-id',
              params: { id: item.prev },
            })
          "
          ><v-icon>mdi-chevron-right</v-icon> {{ $t('previous') }}</v-btn
        >
      </p>
    </v-container>

    <v-sheet color="grey lighten-3 pa-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card
            flat
            outlined
            class="scroll vertical"
            :style="`height: ${/*height * 0.85*/ 600}px; width: ${
              $vuetify.breakpoint.name != 'xs' ? width / 2 : width
            }px`"
          >
            <div class="pa-4 px-5">
              <span v-html="$utils.xml2html(item.xml, true)"> </span>
              <v-sheet class="pa-4 mx-10" color="grey lighten-3">
                <b class="ma-2">{{ $t('legend') }} :</b>
                <span class="ma-2 teiPersName">{{ $t('agential') }}</span>
                <span class="ma-2 teiPlaceName">{{ $t('spatial') }}</span>
                <span class="ma-2 teiDate">{{ $t('date') }}</span>
                <span class="ma-2 teiTime">{{ $t('temporal') }}</span>
              </v-sheet>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <iframe
            :src="`${baseUrl}/mirador/?manifest=${item.manifest}&canvas=${item.canvas}&bottomPanel=false`"
            width="100%"
            :style="`height: ${/*height * 0.85*/ 600}px;`"
            allowfullscreen="allowfullscreen"
            frameborder="0"
          >
          </iframe>
        </v-col>
      </v-row>
    </v-sheet>

    <v-container>
      <div class="text-center mt-10">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              v-if="item.source"
              :to="
                localePath({
                  name: 'viewer-id',
                  params: {
                    id: item.source
                      .split('/tei/')[1]
                      .split('_')[0]
                      .split('.')[0],
                  },
                  query: { id },
                })
              "
              icon
              class="mx-2"
              v-on="on"
            >
              <v-icon>mdi-text</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('fulltext') }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon class="mx-2" v-on="on">
              <a @click="dwnData">
                <v-img
                  contain
                  width="30px"
                  :src="baseUrl + '/img/icons/tei.png'"
                />
              </a>
            </v-btn>
          </template>
          <span>TEI/XML</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon class="mx-2" v-on="on">
              <a :href="item.manifest" target="_blank">
                <v-img
                  contain
                  width="30px"
                  :src="baseUrl + '/img/icons/manifest.png'"
                />
              </a>
            </v-btn>
          </template>
          <span>IIIF</span>
        </v-tooltip>
        <v-tooltip v-if="item.manifest" bottom>
          <template #activator="{ on }">
            <v-btn
              class="mx-2"
              :href="
                baseUrl +
                '/mirador/?manifest=' +
                item.manifest +
                '&canvas=' +
                item.canvas
              "
              icon
              target="_blank"
              x-small
              v-on="on"
              ><v-img
                contain
                width="24px"
                :src="baseUrl + '/img/icons/mirador3.svg'"
            /></v-btn>
          </template>
          <span>Mirador</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn small icon class="mx-2" v-on="on">
              <a @click="dwnJson">
                <v-img
                  contain
                  width="24px"
                  :src="baseUrl + '/img/icons/json-logo.svg'"
                />
              </a>
            </v-btn>
          </template>
          <span>JSON</span>
        </v-tooltip>

        <ResultOption
          :item="{
            label: title,
            url: url,
          }"
        />
      </div>

      <v-simple-table class="mt-10">
        <template #default>
          <tbody>
            <tr>
              <td width="30%">{{ $t('category') }}</td>
              <td style="overflow-wrap: break-word" class="py-5">
                <v-treeview dense open-all :items="categories">
                  <template #label="{ item }">
                    <nuxt-link
                      :to="localePath({ name: 'search', query: item.query })"
                      >{{ item.name }}</nuxt-link
                    >
                    <v-tooltip
                      v-if="item.name && item.name.split(' ')[0].includes('m')"
                      bottom
                    >
                      <template #activator="{ on }">
                        <v-btn
                          icon
                          :to="
                            localePath({
                              name: 'ad-id',
                              params: { id: item.name.split(' ')[0] },
                            })
                          "
                          v-on="on"
                        >
                          <v-icon>mdi-book</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('detail') }}</span>
                    </v-tooltip>
                  </template>
                </v-treeview>
              </td>
            </tr>
            <tr v-if="dates.length > 0">
              <td width="30%">{{ $t('date') }}</td>
              <td style="overflow-wrap: break-word" class="py-5">
                <v-treeview dense open-all :items="dates">
                  <template #label="{ item }">
                    <nuxt-link
                      :to="localePath({ name: 'search', query: item.query })"
                      >{{
                        lang === 'ja' ? $utils.wareki(item.name) : item.name
                      }}</nuxt-link
                    >

                    <v-tooltip
                      v-if="item.name && item.name.split('-').length > 1"
                      bottom
                    >
                      <template #activator="{ on }">
                        <v-btn
                          icon
                          :to="
                            localePath({
                              name: 'calendar-type-year-month-day',
                              params: getCalendarParams(item.name),
                            })
                          "
                          v-on="on"
                        >
                          <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('calendar') }}</span>
                    </v-tooltip>
                  </template>
                </v-treeview>
              </td>
            </tr>

            <template v-for="(tag, key) in fields">
              <tr v-if="item[tag].length > 0" :key="key">
                <td width="30%">{{ $t(tag) }}</td>
                <td style="overflow-wrap: break-word" class="py-5">
                  <template v-for="(value, key2) in getValues(item[tag])">
                    <span :key="key2" class="mr-4">
                      <nuxt-link
                        :to="
                          localePath({
                            name: 'search',
                            query: getQuery(tag, value),
                          })
                        "
                      >
                        {{ value }}
                      </nuxt-link>

                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-btn
                            icon
                            :to="
                              localePath({
                                name: 'entity-entity-id',
                                params: {
                                  entity: tag,
                                  id: value,
                                },
                              })
                            "
                            v-on="on"
                          >
                            <v-icon>{{
                              tag === 'spatial' ? 'mdi-map' : 'mdi-account'
                            }}</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('detail') }}</span>
                      </v-tooltip>
                    </span>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>

      <HorizontalItems
        v-if="false"
        :data="entity.agential"
        :title="$t('agential')"
        height="200"
      />

      <HorizontalItems
        v-if="false"
        :data="entity.spatial"
        :title="$t('spatial')"
        height="200"
      />

      <!--

        <dl class="row mb-5">
          <dt class="col-sm-3 text-muted pb-0"><b>URL</b></dt>
          <dd class="col-sm-9" style="overflow-wrap: break-word">
            <a :href="url">{{ url }}</a>
          </dd>
        </dl>

        <dl class="row mb-5">
          <dt class="col-sm-3 text-muted pb-0">
            <b>{{ $t('category') }}</b>
          </dt>
          <dd class="col-sm-9" style="overflow-wrap: break-word">
            <v-treeview dense open-all :items="categories">
              <template #label="{ item }">
                <nuxt-link
                  :to="localePath({ name: 'search', query: item.query })"
                  >{{ item.name }}</nuxt-link
                >
              </template>
            </v-treeview>
          </dd>
        </dl>

        <dl class="row mb-5">
          <dt class="col-sm-3 text-muted pb-0">
            <b>{{ $t('date') }}</b>
          </dt>
          <dd class="col-sm-9" style="overflow-wrap: break-word">
            <v-treeview dense open-all :items="dates">
              <template #label="{ item }">
                <nuxt-link
                  :to="localePath({ name: 'search', query: item.query })"
                  >{{ item.name }}</nuxt-link
                >
              </template>
            </v-treeview>
          </dd>
        </dl>

        <template v-for="(tag, key) in ['agential', 'spatial' /*, 'temporal'*/]">
          <dl v-if="item[tag].length > 0" :key="key" class="row mb-5">
            <dt class="col-sm-3 text-muted pb-0">
              <b>{{ $t(tag) }}</b>
            </dt>
            <dd class="col-sm-9">
              <template v-for="(value, key2) in getValues(item[tag])">
                <span :key="key2" class="mr-4">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'entity-entity-id',
                        params: {
                          entity: tag,
                          id: value,
                        },
                      })
                    "
                  >
                    {{ value }}
                  </nuxt-link>

                  <v-tooltip bottom>
                    <template #activator="{ on }">
                      <v-btn
                        icon
                        :to="
                          localePath({
                            name: 'search',
                            query: getQuery(tag, value),
                          })
                        "
                        v-on="on"
                      >
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t('search') }}</span>
                  </v-tooltip>
                </span>
              </template>
            </dd>
          </dl>
        </template>

        -->

      <HorizontalItems
        v-if="/*false*/ true"
        :title="`${$t('similar')} ${$t('items')}`"
        :data="moreLikeThisData"
      />
    </v-container>

    <v-sheet class="text-center pa-10 mt-10 mb-10">
      <small>
        <h3 class="mb-5">{{ $t('license') }}</h3>

        <template v-if="$i18n.locale == 'ja'">
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
            ><img
              alt="クリエイティブ・コモンズ・ライセンス"
              style="border-width: 0"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
          ><br />この作品は<a
            rel="license"
            href="http://creativecommons.org/licenses/by/4.0/"
            >クリエイティブ・コモンズ 表示 4.0 国際 ライセンス</a
          >の下に提供されています。
        </template>
        <template v-else>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
            ><img
              alt="Creative Commons License"
              style="border-width: 0"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
          ><br />This work is licensed under a
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
            >Creative Commons Attribution 4.0 International License</a
          >.
        </template>
      </small>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios'
import ResultOption from '~/components/display/ResultOption.vue'
import HorizontalItems from '~/components/display/HorizontalItems.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

export default {
  components: {
    ResultOption,
    HorizontalItems,
    Breadcrumbs,
  },
  async asyncData({ payload, app }) {
    if (payload) {
      return { item: payload }
    } else {
      let id = app.context.params.id

      const spl = id.split('-')

      id = spl[0] + '-' + String(Number(spl[1])).padStart(4, '0')

      const data_ = await import(`~/static/data/docs.json`)
      const response = data_.default

      const item = response[id]

      return { item }
    }
  },

  data() {
    return {
      index: process.env.index,
      baseUrl: process.env.BASE_URL,
      github: process.env.github_pages,
      moreLikeThisData: [],
      fields: ['agential', 'spatial' /*, 'temporal' */],
      width: -1,
      entity: {
        agential: [],
        spatial: [],
      },
      lang: this.$i18n.locale,
    }
  },

  computed: {
    dates() {
      const dates = this.item.date
      if (!dates) {
        return []
      }
      const keys = Object.keys(dates)
      const date = dates[keys[keys.length - 1]]
      if (!date) {
        return []
      }
      const es = date.split(' > ')
      const data = []
      const index = this.index
      if (es.length >= 1) {
        const query = {}
        // query[`${index}[hierarchicalMenu][date.lvl0][0]`] = es[0]
        query[`${index}[refinementList][date_lvl0][0]`] = es[0]
        data.push({
          id: 1,
          name: es[0],
          children: [],
          query,
        })
      }
      if (es.length >= 2) {
        const query = {}
        // query[`${index}[hierarchicalMenu][date.lvl0][0]`] = es[0]
        // query[`${index}[hierarchicalMenu][date.lvl0][1]`] = es[1]
        query[`${index}[refinementList][date_lvl1][0]`] = es[1]
        data[0].children.push({
          id: 2,
          name: es[1],
          children: [],
          query,
        })
      }

      if (es.length === 3) {
        const query = {}
        // query[`${index}[hierarchicalMenu][date.lvl0][0]`] = es[0]
        // query[`${index}[hierarchicalMenu][date.lvl0][1]`] = es[1]
        // query[`${index}[hierarchicalMenu][date.lvl0][2]`] = es[2]
        query[`${index}[refinementList][date_lvl2][0]`] = es[2]
        data[0].children[0].children.push({
          id: 3,
          name: es[2],
          query,
        })
      }
      return data
    },
    categories() {
      try {
        // console.log("item", this.item)
        const values = this.item.category
        const keys = Object.keys(values)
        const value = values[keys[keys.length - 1]]
        if (!value) {
          return []
        }
        const es = value.split(' > ')
        const index = this.index
        const query1 = {}
        // query1[`${index}[hierarchicalMenu][category.lvl0][0]`] = es[0]
        query1[`${index}[refinementList][category_lvl0][0]`] = es[0]
        const query2 = {}
        query2[`${index}[refinementList][category_lvl1][0]`] = es[1]
        // query2[`${index}[hierarchicalMenu][category.lvl0][0]`] = es[0]
        // query2[`${index}[hierarchicalMenu][category.lvl0][1]`] = es[1]
        return [
          {
            id: 1,
            name: es[0],
            query: query1,
            children: [
              {
                id: 2,
                name: es[1],
                query: query2,
              },
            ],
          },
        ]
      } catch (e) {
        console.log({ e })
        return []
      }
    },

    title() {
      return this.item.label
    },
    id() {
      return this.$route.params.id
    },
    url() {
      return this.baseUrl + this.$route.path
    },
    items() {
      return [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('search'),
          disabled: false,
          to: this.localePath({ name: 'search' }),
        },
        {
          text: this.title,
        },
      ]
    },
  },

  mounted() {
    // const item = this.item

    // this.getEntity('agential')
    // this.getEntity('spatial')

    this.getSimilarItems()
    if (process.browser) {
      this.width = window.innerWidth
    }
  },

  methods: {
    async getSimilarItems() {
      const item = this.item

      const response = await this.$axios.$get(
        process.env.BASE_URL + '/data/docs.json'
      )

      const arr = []
      if (!item.texts) {
        return
      }
      for (const id of item.texts) {
        if (!response[id]) {
          continue
        }
        const hit = response[id]
        arr.push({
          _id: id,
          _source: {
            _label: [hit.label],
            description: [
              '<p class="mt-4"><b>' +
                this.$t('date') +
                '</b>: ' +
                hit.temporal +
                '</p>' +
                hit.xml,
            ],
            _thumbnail: [],
            _url: [this.baseUrl + '/item/' + hit.objectID],
          },
        })
      }

      this.moreLikeThisData = arr
    },
    /*
    async getSimilarItems(){

      const item = this.item

      const es = []
      const fields = this.fields
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        const values = item[field]
        for (let j = 0; j < values.length; j++) {
          es.push(values[j])
        }
      }

      const query = es.join(' ').substring(0, 128)

      const client = algoliasearch(config.appId, config.apiKey)
      const index = client.initIndex(config.index)
      const item2 = await index.search('', {
        similarQuery: query,
      })

      const arr = []
      const hits = item2.hits
      for (let i = 1; i < hits.length; i++) {
        const hit = hits[i]
        arr.push({
          _id: hit.objectID,
          _source: {
            _label: [hit.label],
            description: [
              '<p class="mt-4"><b>' +
                this.$t('date') +
                '</b>: ' +
                hit.temporal +
                '</p>' +
                hit.xml,
            ],
            _thumbnail: [],
            _url: [this.baseUrl + '/item/' + hit.objectID],
          },
        })
      }

      this.moreLikeThisData = arr

    },
    */
    async getEntity(field = 'spatial') {
      const values = this.item[field]

      const moreLikeThisData0 = []

      const ids = []

      for (let i = 0; i < values.length; i++) {
        const image = [field === 'spatial' ? 'mdi-map' : 'mdi-account']

        const value = values[i]

        const to = this.localePath({
          name: 'entity-entity-id',
          params: { entity: field, id: value },
        })

        moreLikeThisData0.push({
          _id: 'abc',
          _source: {
            _label: [value],
            _thumbnail: image,
            _url: [this.baseUrl + to],
          },
          to,
        })

        const uri =
          this.github +
          '/api/' +
          field.replace('spatial', 'place').replace('agential', 'chname') +
          '/' +
          value
        ids.push(`?s = <${uri}>`)
      }

      this.entity[field] = moreLikeThisData0

      if (ids.length === 0) {
        return
      }

      const filter = ids.join(' || ')

      const query = `
      PREFIX schema: <http://schema.org/>
      PREFIX type: <https://jpsearch.go.jp/term/type/>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX hpdb: <https://w3id.org/hpdb/api/>
      PREFIX sh: <http://www.w3.org/ns/shacl#>
      SELECT DISTINCT * WHERE {
        ?s rdfs:label ?label .
        filter (${filter})
        optional { ?s schema:description ?description }
        optional { ?s schema:image ?image }
      }
      `

      let url = process.env.endpoint + '?query='

      url = url + encodeURIComponent(query) + '&output=json'

      const res = await axios.get(url)
      const results = res.data

      const map = {}

      for (let i = 0; i < results.length; i++) {
        const hit = results[i]
        map[hit.s] = hit
      }

      for (let i = 0; i < values.length; i++) {
        const item = moreLikeThisData0[i]

        if (!item) {
          continue
        }

        const facet = values[i]
        const uri =
          this.github +
          '/api/' +
          field.replace('spatial', 'place').replace('agential', 'chname') +
          '/' +
          facet

        if (!map[uri]) {
          continue
        }
        const hit = map[uri]

        const image = hit.image
          ? [hit.image]
          : [field === 'spatial' ? 'mdi-map' : 'mdi-account']

        if (hit.description) {
          const description = hit.description.value || hit.description
          item._source.description = [description + '（Wikipediaより）']
        }

        item._source._thumbnail = image
      }

      this.entity[field] = moreLikeThisData0
    },
    getCalendarParams(data) {
      let type = ''
      let year = -1
      let month = -1
      let day = -1
      if (!data) {
        return {}
      }
      const es = data.split('-')
      if (es.length === 2) {
        type = 'month'
        year = Number(es[0])
        month = Number(es[1])
        day = 1
      } else if (es.length === 3) {
        type = 'day'
        year = Number(es[0])
        month = Number(es[1])
        day = Number(es[2])
      }
      return {
        type,
        year,
        month,
        day,
      }
    },
    getQuery(label, value) {
      const index = this.index
      const field = `${index}[refinementList][${label}][0]`
      /*
      const query = {
        'dev_MAIN[sortBy]': 'dev_MAIN', // 'dev_MAIN_temporal_asc',
      }
      */
      const query = {}
      query[`${index}[sortBy]`] = index
      query[field] = value
      return query
    },

    getValues(data) {
      if (!data) {
        return []
      }
      return Array.isArray(data) ? data : [data]
    },

    dwnData() {
      if (!process.browser) {
        return
      }
      // 保存するJSONファイルの名前
      const fileName = this.item.objectID + '.xml'

      // データをJSON形式の文字列に変換する。
      const data = this.item.xml

      // HTMLのリンク要素を生成する。
      const link = document.createElement('a')

      // リンク先にJSON形式の文字列データを置いておく。
      link.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(data)

      // 保存するJSONファイルの名前をリンクに設定する。
      link.download = fileName

      // ファイルを保存する。
      link.click()
    },

    dwnJson() {
      if (!process.browser) {
        return
      }
      // 保存するJSONファイルの名前
      const fileName = this.item.objectID + '.json'

      // データをJSON形式の文字列に変換する。
      const data = JSON.stringify(this.item, null, 2)

      // HTMLのリンク要素を生成する。
      const link = document.createElement('a')

      // リンク先にJSON形式の文字列データを置いておく。
      link.href =
        'data:application/json;charset=utf-8,' + encodeURIComponent(data)

      // 保存するJSONファイルの名前をリンクに設定する。
      link.download = fileName

      // ファイルを保存する。
      link.click()
    },
  },

  head() {
    const title = this.title
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
}
</script>
<style>
.scroll {
  overflow-y: auto;
}

.vertical {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
