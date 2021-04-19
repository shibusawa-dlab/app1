<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="bh">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>
    <v-container class="my-5">
      <h2>{{ $t('fulltext_search') }}</h2>

      <nuxt-link :to="localePath({name : 'item-id', params: {id: 'DKB10001m-1'}})">
        aaa
      </nuxt-link>

      <p class="my-2">
        『渋沢栄一伝記資料』別巻第1, 第2の本文を対象に検索します。
      </p>

      <v-row class="mt-2" dense>
        <v-col cols="12" md="12">
          <!-- <ais-search-box :placeholder="$t('add_a_search_term')"
          /> -->

          <v-text-field
          background-color="grey lighten-3"
          filled
              rounded
            v-model="q"
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

      <template v-if="loading">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            class="my-10"
          ></v-progress-circular>

          <p>初回はインデックスファイルのダウンロードに時間を要します。</p>
          <p>2回目以降はキャッシュにより待ち時間が改善します。</p>
        </div>
      </template>

      <template v-else>
        <div v-if="filters.length > 0">
          <v-chip
            v-for="(filter, key) in filters"
            :key="key"
            class="mr-2 my-2"
            close
            @click:close="faceted(filter.label, filter.value)"
            label
          >
            {{ aggs[filter.label].label }}: {{ filter.value }}
          </v-chip>

          <v-chip v-if="filters.length > 0" @click="init()" label class="mr-2 my-2">
            {{ $t('Clear all') }}
          </v-chip>
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

        aaa

        <v-row class="mt-5" v-if="false">
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
                          ><b>{{ $t('date_year') }}:</b>
                          {{ item.temporal }}</span
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
                          $utils.removeHead($utils.xml2html(item.xml)),
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
              :value="0"
              flat
              class="mb-4"
              v-for="(aggList, aggField) in aggs"
              :key="aggField"
            >
              <v-expansion-panel>
                <v-expansion-panel-header class="grey lighten-2">
                  <h3>{{ aggList.label }}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content outlined class="py-2">
                  <template v-for="(e, key) in aggList.value">
                    <div
                      style="cursor: pointer"
                      v-if="key < limit || aggList.more"
                      :key="key"
                      @click="faceted(aggField, e[0])"
                      class="mt-1"
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
                    class="mt-4"
                    @click="aggList.more = !aggList.more"
                    >{{ $t(aggList.more ? 'Show less' : 'Show more') }}</v-btn
                  >
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>

        bbb

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
var _ = require('lodash')

export default {
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

  head() {
    return {
      title: this.$t('fulltext_search'),
    }
  },

  watch: {
    page: function (val) {
      //this.list(val)
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

    $route: function (current, old) {
      //フィルタの実行条件は要検討
      this.filter()

      this.list()
    },
  },

  computed: {
    length: function () {
      return Math.ceil(this.total / this.perPage)
    },
    filters: function () {
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

  async mounted() {
    //初期読み込み
    let docs = await axios.get(process.env.BASE_URL + '/data/list.json')
    docs = docs.data
    this.docs = docs

    let index = await axios.get(process.env.BASE_URL + '/data/index.json')
    index = index.data
    this.index = index

    let facets = await axios.get(process.env.BASE_URL + '/data/facets.json')
    facets = facets.data
    this.facets = facets

    //クエリの処理
    const query = this.$route.query

    //ページの初期化
    const page = Number(query['main[page]']) || 1
    this.page = page

    //検索キーワード
    const q = query['main[query]'] || ''
    this.q = q

    /*

    

    this.filter()

    

    */

    //初期検索の場合
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

      //ページは先頭へ
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

      if (q === '') {
        ids = Object.keys(docs)
      } else {
        for (const key in index) {
          if (key.includes(q)) {
            ids = ids.concat(index[key])
          }
        }
      }

      const facets = this.facets

      for (let queryField in query) {
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

      this.ids = ids

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

        for (let aggField in aggs) {
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

        var pairs = Object.entries(aggMap.value)

        if (aggMap.sort !== 'name:asc') {
          pairs.sort(function (p1, p2) {
            var p1Val = p1[1],
              p2Val = p2[1]
            return -(p1Val - p2Val)
          })
        }

        const aggList = pairs.slice(0, 50) //Object.fromEntries(pairs);
        aggs[aggField].value = aggList
      }

      this.aggs = aggs
    },
    search() {
      const query = JSON.parse(JSON.stringify(this.$route.query))

      let q = this.q || ""
      q = q.trim()

      if (q === '') {
        delete query['main[query]']
      } else {
        query['main[query]'] = q
      }

      //ページは先頭へ
      delete query['main[page]']
      this.page = 1

      this.$router.push(
        this.localePath({
          name: 'search',
          query,
        })
      )
      //if (event.keyCode !== 13) return
    },
    list() {
      const query = this.$route.query

      const page = query['main[page]'] || 1

      const ids = this.ids

      /*

      const ids_ = ids.slice((page - 1) * this.perPage, page * this.perPage)
      const items = []
      for (const id of ids_) {
        items.push(this.docs[id])
      }

      console.log({items})

      */

      const items = []
      console.log({items})

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
      xml = String(xml).replace(/<[^>]*>?/gm, '')
      xml = xml
        .split(other)
        .join(
          '<span style="font-size : large; font-weight: bold; background-color: #FFF59D;">' +
            other +
            '</span>'
        )

      const id = this.$route.params.id
      xml = xml
        .split(id)
        .join(
          '<span style="font-size : large; font-weight: bold; background-color: #FFF59D;">' +
            id +
            '</span>'
        )

      return xml
    },
  },
}
</script>
<style>
mark {
  background-color: #ffc168;
}
</style>
