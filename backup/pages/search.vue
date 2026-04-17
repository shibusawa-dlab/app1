<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <h2>{{ $t('fulltext_search') }}</h2>

      <p class="my-2">
        『渋沢栄一伝記資料』別巻第1,
        第2の本文を対象に検索します。検索するとその結果がハイライトされますが、ファセット・ナビゲーションを利用した際には機能しない場合があります。
      </p>

      <template v-if="loading">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            class="my-10"
          ></v-progress-circular>

          <p>
            初回はインデックスファイルのダウンロードに時間を要します。2回目以降はキャッシュにより待ち時間が改善します。
          </p>
        </div>
      </template>

      <template v-else>
        <v-row class="mt-2" dense>
          <v-col cols="12" md="12">
            <!-- <ais-search-box :placeholder="$t('add_a_search_term')"
            /> -->

            <v-text-field
              v-model="q"
              background-color="grey lighten-3"
              filled
              rounded
              dense
              :placeholder="$t('add_a_search_term')"
              append-icon="mdi-magnify"
              clearable
              clear-icon="mdi-close-circle"
              @click:append="search(q, $event)"
              @keydown.enter="search(q, $event)"
            ></v-text-field>
          </v-col>
        </v-row>

        <div v-if="filters.length > 0">
          <v-chip
            v-for="(filter, key) in filters"
            :key="key"
            class="mr-2 my-2"
            close
            dark
            @click:close="faceted(filter.label, filter.value)"
          >
            {{ aggs[filter.label].label }}: {{ filter.value }}
          </v-chip>

          <v-btn
            v-if="filters.length > 0"
            text
            color="primary"
            class="mr-2 my-2"
            @click="init()"
          >
            {{ $t('Clear all') }}
          </v-btn>
        </div>

        <v-row class="mt-5" dense>
          <v-col cols="12" sm="6">
            <h3 class="my-0">
              {{ $t('search_result') }}: {{ total.toLocaleString() }}
              {{ $t('hits') }}
            </h3>
          </v-col>
          <v-col cols="12" sm="4"></v-col>
          <v-col cols="12" sm="2"> </v-col>

          <v-col v-show="false" cols="12" sm="2"> </v-col>
        </v-row>

        <div class="text-center mt-5">
          <v-pagination
            v-model="page"
            :length="length"
            :total-visible="7"
          ></v-pagination>
        </div>

        <v-row class="mt-5">
          <v-col cols="12" sm="8" order-sm="12">
            <v-row>
              <v-col v-for="item in items" :key="item.objectID" cols="12">
                <v-card flat outlined>
                  <div class="pa-4">
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'item-id',
                          params: { id: item.objectID },
                        })
                      "
                    >
                      <h3>{{ item.label }}</h3>
                    </nuxt-link>
                    <div class="my-2">
                      <p v-if="item.category">
                        <small>
                          {{ item.category.lvl1 }}
                        </small>
                      </p>
                      <small>
                        <span class="mr-4">
                          <b>ID:</b>
                          {{ item.objectID }}
                        </span>
                        <span class="mr-4"
                          ><b>{{ $t('date') }}:</b>
                          <!-- $t('date_year') -->
                          {{ $utils.wareki(item.temporal) }}</span
                        >
                        <span
                          v-if="item.agential && item.agential.length > 0"
                          class="mr-4"
                        >
                          <b>{{ $t('agential') }}:</b>
                          {{ item.agential.join(', ') }}
                        </span>
                        <span v-if="item.spatial && item.spatial.length > 0">
                          <b>{{ $t('spatial') }}:</b>
                          {{ item.spatial.join(', ') }}
                        </span>
                      </small>
                    </div>

                    <!-- この条件は今後要検討 v-if="item._highlightResult" -->
                    <p
                      v-if="item.xml"
                      class="mt-4"
                      style="max-height: 200px; overflow-y: auto"
                      v-html="
                        highlightRelation(
                          //$utils.removeHead($utils.xml2html(item.xml))
                          convert(item.xml),
                          q
                        )
                      "
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="4" order-sm="1">
            <v-expansion-panels
              v-for="(aggList, aggField) in aggs"
              :key="aggField"
              :value="0"
              flat
              class="mb-4"
            >
              <v-expansion-panel>
                <v-expansion-panel-header class="grey lighten-2">
                  <h3>{{ aggList.label }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content outlined class="py-2">
                  <template v-for="(e, key) in aggList.value">
                    <div
                      v-if="key < limit || aggList.more"
                      :key="key"
                      style="cursor: pointer"
                      class="mt-1"
                      @click="faceted(aggField, e[0])"
                    >
                      <template v-if="checked(aggField, e[0])">
                        <v-icon color="primary"> mdi-checkbox-marked </v-icon>
                      </template>
                      <template v-else>
                        <v-icon> mdi-checkbox-blank-outline </v-icon>
                      </template>
                      {{ e[0] }}
                      <v-chip small>
                        {{ e[1] }}
                      </v-chip>
                    </div>
                  </template>

                  <v-btn
                    v-if="aggList.value.length >= limit"
                    color="primary"
                    small
                    rounded
                    depressed
                    class="mt-4"
                    @click="aggList.more = !aggList.more"
                    >{{ $t(aggList.more ? 'Show less' : 'Show more') }}</v-btn
                  >
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>

        <div class="text-center mt-10">
          <v-pagination
            v-model="page"
            :length="length"
            :total-visible="7"
          ></v-pagination>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
const _ = require('lodash')

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      page: 1,
      perPage: 24,
      total: 0,
      items: [],
      ids: [],
      q: '',
      limit: 10,
      aggs: {},
      facets: {},

      loading: true,

      bh: [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('fulltext_search'),
        },
      ],
    }
  },

  computed: {
    length() {
      return Math.ceil(this.total / this.perPage)
    },
    filters() {
      const query = this.$route.query
      const filters = []
      for (const key in query) {
        if (key.includes('refinementList')) {
          filters.push({
            label: key.split('[')[2].split(']')[0],
            value: query[key],
          })
        }
      }
      return filters
    },
  },

  watch: {
    page(val) {
      // this.list(val)
      const query = JSON.parse(JSON.stringify(this.$route.query))

      if (val === 1) {
        delete query['main[page]']
      } else {
        query['main[page]'] = val
      }

      this.$router.push(
        this.localePath({
          name: 'search',
          query,
        })
      )
    },

    $route(current, old) {
      // フィルタの実行条件は要検討
      this.filter()

      this.list()
    },
  },

  async mounted() {
    // 初期読み込み
    let docs = await axios.get(process.env.BASE_URL + '/data/docs.json')
    docs = docs.data
    this.docs = docs

    let index = await axios.get(process.env.BASE_URL + '/data/index.json')
    index = index.data
    this.index = index

    let facets = await axios.get(process.env.BASE_URL + '/data/facets.json')
    facets = facets.data
    this.facets = facets

    // クエリの処理
    const query = this.$route.query

    // ページの初期化
    const page = Number(query['main[page]']) || 1
    this.page = page

    // 検索キーワード
    const q = query['main[query]'] || ''
    this.q = q

    this.filter()

    // 初期検索の場合
    this.list()

    this.loading = false
  },

  methods: {
    init() {
      // this.page = 1 //なぜかうまくいかない

      const query = JSON.parse(JSON.stringify(this.$route.query))
      for (const key in query) {
        if (key.includes('refinementList')) {
          delete query[key]
        }
      }

      // ページは先頭へ
      delete query['main[page]']

      this.$router.push(
        this.localePath({
          name: 'search',
          query,
        })
      )
    },
    filter() {
      const query = JSON.parse(JSON.stringify(this.$route.query))

      const q = query['main[query]'] || ''

      const docs = this.docs
      const index = this.index

      let ids = []

      // 全文
      if (q === '') {
        ids = Object.keys(docs)
      } else {
        const terms = q.split('　').join(' ').split(' ')

        let idsFulltext = Object.keys(docs) // ids

        for (const keyword of terms) {
          const idsKeyword = []
          const keys = Object.keys(index).filter((x) => x.match(keyword))
          for (const key of keys) {
            idsKeyword.push(...index[key])
          }

          idsFulltext = _.intersection(idsFulltext, idsKeyword)
        }

        ids = idsFulltext
      }

      // ファセット
      const facets = this.facets

      for (const queryField in query) {
        if (queryField.includes('refinementList')) {
          const facetField = queryField.split('[')[2].split(']')[0]

          let values = query[queryField]
          if (typeof values === 'string') {
            values = [values]
          }

          for (const value of values) {
            const matchIds = facets[facetField][value]
            ids = _.intersection(ids, matchIds)
          }
        }
      }

      this.total = ids.length

      this.ids = ids.sort()

      this.getAggs()
    },
    getAggs() {
      const aggs = {
        category_lvl0: {
          sort: 'name:asc',
          label: this.$t('category_lvl0'),
          value: {},
          more: false,
        },
        category_lvl1: {
          sort: 'name:asc',
          label: this.$t('category_lvl1'),
          value: {},
          more: false,
        },
        date_lvl0: {
          sort: 'name:asc',
          label: this.$t('year'),
          value: {},
          more: false,
        },
        date_lvl1: {
          sort: 'name:asc',
          label: this.$t('yearAndMonth'),
          value: {},
          more: false,
        },
        date_lvl2: {
          sort: 'name:asc',
          label: this.$t('date'),
          value: {},
          more: false,
        },
        agential: {
          sort: '',
          label: this.$t('agential'),
          value: {},
          more: false,
        },
        spatial: {
          sort: '',
          label: this.$t('spatial'),
          value: {},
          more: false,
        },
        type: {
          sort: '',
          label: this.$t('type'),
          value: {},
          more: false,
        },
      }

      const docs = this.docs

      const ids = this.ids
      for (const id of ids) {
        const item = docs[id]

        for (const aggField in aggs) {
          const aggMap = aggs[aggField].value

          let values = item[aggField]

          if (typeof values === 'string') {
            values = [values]
          }

          if (!values) {
            continue
          }

          for (const value of values) {
            if (!aggMap[value]) {
              aggMap[value] = 0
            }
            aggMap[value] += 1
          }
        }
      }

      for (const aggField in aggs) {
        const aggMap = aggs[aggField]

        if (aggMap.sort !== 'name:asc') {
          var pairs = Object.entries(aggMap.value)
          pairs.sort(function (p1, p2) {
            const p1Val = p1[1]
            const p2Val = p2[1]
            return -(p1Val - p2Val)
          })
        } else {
          const tmp = aggMap.value

          const keys = Object.keys(tmp)
          keys.sort()

          const tmp2 = {}
          for (const key of keys) {
            tmp2[key] = tmp[key]
          }

          var pairs = Object.entries(tmp2)
        }

        const aggList = pairs.slice(0, 50) // Object.fromEntries(pairs);
        aggs[aggField].value = aggList
      }

      this.aggs = aggs
    },
    search() {
      const query = JSON.parse(JSON.stringify(this.$route.query))

      let q = this.q || ''
      q = q.trim()

      if (q === '') {
        delete query['main[query]']
      } else {
        query['main[query]'] = q
      }

      // ページは先頭へ
      delete query['main[page]']
      this.page = 1

      this.$router.push(
        this.localePath({
          name: 'search',
          query,
        })
      )
      // if (event.keyCode !== 13) return
    },
    list() {
      const query = this.$route.query

      const page = query['main[page]'] || 1

      const ids = this.ids

      const ids_ = ids.slice((page - 1) * this.perPage, page * this.perPage)
      const items = []
      for (const id of ids_) {
        items.push(this.docs[id])
      }
      this.items = items
    },

    faceted(field, value) {
      const query = JSON.parse(JSON.stringify(this.$route.query))

      let values = []
      for (const queryField in query) {
        if (queryField.includes('[' + field + ']')) {
          values.push(query[queryField])
          delete query[queryField]
        }
      }

      if (values.includes(value)) {
        values = values.filter((n) => n != value)
      } else {
        values.push(value)
      }

      for (let i = 0; i < values.length; i++) {
        query['main[refinementList][' + field + '][' + i + ']'] = values[i]
      }

      this.$router.push(
        this.localePath({
          name: 'search',
          query,
        })
      )
    },

    checked(field, value) {
      const query = this.$route.query

      const values = []
      for (const queryField in query) {
        if (queryField.includes('[' + field + ']')) {
          values.push(query[queryField])
        }
      }

      if (values.includes(value)) {
        return true
      } else {
        return false
      }
    },

    highlightRelation(xml, other) {
      const others = []

      const terms = other.split('　').join(' ').split(' ')
      for (const term of terms) {
        if (term && !others.includes(term)) {
          others.push(term)
        }
      }

      const filters = this.filters
      for (const filter of filters) {
        const label = filter.value
        if (!others.includes(label)) {
          others.push(label)
        }
      }

      xml = String(xml).replace(/<[^>]*>?/gm, '')

      // const map = {}

      for (const other2 of others.sort(function (a, b) {
        return b.length - a.length
      })) {
        // const uuid = getUniqueStr()
        /*
        map[uuid] =
          '<span style="font-weight: bold; background-color: #FFF59D;">' +
          other2 +
          '</span>'
        */

        try {
          const regexp = new RegExp(other2, 'g')
          xml = xml.replace(regexp, function (match) {
            // return uuid
            return (
              '<span style="font-weight: bold; background-color: #FFF59D;">' +
              match +
              '</span>'
            )
          })
        } catch (e) {
          console.log({ e })
        }

        // xml = xml.split(other2).join(uuid)
      }

      /*
      for (const uuid in map) {
        xml = xml.split(uuid).join(map[uuid])
      }
      */

      return xml
    },
    convert(xml) {
      const tmp = document.createElement('div')
      tmp.innerHTML = xml
      xml = tmp.textContent
      xml = xml.split('\n').join('') // .split(' ').join('')
      return xml
    },
  },

  head() {
    return {
      title: this.$t('fulltext_search'),
    }
  },
}

function getUniqueStr(myStrong) {
  let strong = 1000
  if (myStrong) strong = myStrong
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  )
}
</script>
<style>
mark {
  background-color: #ffc168;
}
</style>
