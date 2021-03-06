<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-sheet v-if="entity.image" color="grey lighten-4">
      <v-img :src="entity.image" contain style="height: 300px"></v-img>
    </v-sheet>
    <v-container class="my-5">
      <h1>{{ id }}</h1>

      <p v-if="entity.description" class="my-5">
        {{ entity.description.value || entity.description }}（Wikipediaより）
      </p>

      <div class="text-center my-5">
        <v-btn
          v-if="field === 'agential'"
          color="primary"
          rounded
          depressed
          small_
          class="mr-5"
          :href_="uri"
          :to="
            localePath({
              name: 'network-id',
              params: {
                id,
              },
            })
          "
          icon_
          ><v-icon class="mr-2">mdi-account-network</v-icon
          >{{ $t('view_network') }}</v-btn
        >
        <v-tooltip v-if="rdf && false" bottom>
          <template #activator="{ on }">
            <v-btn small class="mr-5" :href="uri" icon v-on="on"
              ><v-img
                contain
                width="30px"
                :src="baseUrl + '/img/icons/rdf-logo.svg'"
            /></v-btn>
          </template>
          <span>RDF</span>
        </v-tooltip>
        <ResultOption
          :item="{
            url,
            label: id,
          }"
        />
      </div>
    </v-container>
    <v-container class="my-5">
      <div v-if="false">
        <h1 class="mb-5">
          {{ $t(field) }}: {{ id }}（{{ total.toLocaleString() }}）
        </h1>

        <template v-if="Object.keys(entity).length > 0">
          <v-row class="mb-5">
            <v-col v-if="entity.image" cols="12" sm="2">
              <v-img height="150px" contain :src="entity.image" />
            </v-col>
            <v-col cols="12" sm="10">
              <p v-if="entity.description">
                {{ entity.description.value || entity.description }}
              </p>
            </v-col>
          </v-row>
        </template>
      </div>

      <v-card flat class="my-5">
        <small>
          <h3 class="mt-5 text-center">
            {{ total.toLocaleString() + ' ' + $t('items') }}
          </h3>
        </small>
        <GChart
          v-if="total > 0"
          class="pb-10"
          type="ColumnChart"
          :data="chartData"
          :options="chartOptions"
        />
      </v-card>

      <v-btn
        class="mt-10"
        block
        color="primary"
        depressed
        rounded
        dark
        x-large
        :to="
          localePath({
            name: 'search',
            query: getQuery(field, id),
          })
        "
      >
        <v-icon class="mr-2">mdi-magnify</v-icon>
        {{ $t('fulltext_search') }}
      </v-btn>

      <template v-if="false">
        <h2 class="mt-10 text-center">
          {{ $t('items') }}
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                :to="
                  localePath({
                    name: 'search',
                    query: getQuery(field, id),
                  })
                "
                icon
                v-on="on"
                ><v-icon>mdi-magnify</v-icon></v-btn
              >
            </template>
            <span>{{ $t('search') }}</span>
          </v-tooltip>
        </h2>

        <div v-if="total > 50" class="text-center">
          <small>（{{ $t('上位') }} 50 {{ $t('items') }}）</small>
        </div>

        <v-simple-table class="mt-10">
          <template #default>
            <tbody>
              <tr v-for="(arr, key) in items" :key="key">
                <td width="30%">{{ key }}（{{ arr.length }}）</td>
                <td style="overflow-wrap: break-word" class="py-5">
                  <nuxt-link
                    v-for="(obj, key2) in arr"
                    :key="key2"
                    :to="
                      localePath({
                        name: 'item-id',
                        params: {
                          id: obj.objectID,
                        },
                      })
                    "
                    class="mr-5"
                  >
                    {{ obj.label }}
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>

      <HorizontalItems
        v-for="(field, key) in fields"
        :key="key"
        description="カッコ内の値は共起するアイテム数"
        :data="fields[key]"
        :title="`${$t('related')} ${$t(key)}`"
        height="100"
        width="200"
      />
    </v-container>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from 'axios'
import ResultOption from '~/components/display/ResultOption.vue'
import HorizontalItems from '~/components/display/HorizontalItems.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

export default {
  components: {
    GChart,
    ResultOption,
    HorizontalItems,
    Breadcrumbs,
  },
  asyncData({ payload, app }) {
    if (payload) {
      return { item: payload }
    } else {
      const id = app.context.params.id
      const field = app.context.params.entity

      /*
      const results = {
        hits: []
      }
      */

      return { field, id /*, facets */ }
    }
  },

  data() {
    return {
      configIndex: process.env.index,
      baseUrl: process.env.BASE_URL,
      github: process.env.github_pages,
      host: process.env.host,
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
      },
      entities: [],
      uri: '',
      fields: { agential: [], spatial: [] },

      map: {},
      index: {},

      rdf: false,

      facets: [],
    }
  },

  computed: {
    total() {
      let total = 0
      const facets = this.facets

      for (let i = 0; i < facets.length; i++) {
        const facet = facets[i]

        total += facet.count
      }

      return total
    },
    chartData() {
      // const items = this.items
      let minYear = 2000
      let maxYear = 0

      const facets = this.facets
      const items = {}

      for (let i = 0; i < facets.length; i++) {
        const facet = facets[i]
        const year = Number(facet.value)
        items[year] = facet.count

        if (minYear > year) {
          minYear = year
        }
        if (maxYear < year) {
          maxYear = year
        }
      }

      const years = [['Year', 'Appearances']]
      for (let year = minYear; year < maxYear + 1; year++) {
        let freq = 0
        if (items[year]) {
          freq = items[year]
        }
        years.push([year + '', freq])
      }

      return years
    },

    title() {
      return this.id
    },
    /*
    id() {
      return this.$route.params.id
    },
    */
    url() {
      return this.baseUrl + this.$route.path
    },

    entity() {
      const entities = this.entities
      if (entities.length > 0) {
        return entities[0]
      } else {
        return {}
      }
    },
    bh() {
      const field = this.field
      return [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('person_place'),
          disabled: false,
          to: this.localePath({ name: 'entity' }),
          exact: true,
        },
        {
          text: this.$t(field),
          disabled: false,
          to: this.localePath({
            name: 'entity-id',
            params: { id: field === 'spatial' ? 'place' : field },
          }),
          exact: true,
        },
        {
          text: this.title,
        },
      ]
    },
  },

  async created() {
    let response = await axios.get(process.env.BASE_URL + '/data/docs.json')
    response = response.data

    const field = this.field
    const id = this.id

    const facetsMap = {}

    for (const key in response) {
      const e = response[key]
      if (e[field] && e[field].includes(id)) {
        const year = e.year

        if (!facetsMap[year]) {
          facetsMap[year] = 0
        }

        facetsMap[year] += 1
      }
    }

    const facets = []

    for (const year in facetsMap) {
      facets.push({
        value: year,
        count: facetsMap[year],
      })
    }

    this.facets = facets

    let results = await axios.get(this.baseUrl + '/data/entity.json')
    results = results.data

    // const field = this.field
    const tmp = field === 'agential' ? field : 'spatial'

    const map = {}

    for (const key in results) {
      const tmp = {}
      for (const item of results[key]) {
        tmp[item.id] = item
      }
      map[key] = tmp
    }

    // agentialとspatialの両方
    this.map = map
    this.index = map[tmp]

    this.getInformation()

    this.getRelatedItems()
    this.getRelatedItems('agential')
  },

  methods: {
    getInformation() {
      // console.log('getInformation')

      const map = {
        spatial: 'place',
        temporal: 'time',
        agential: 'chname',
      }

      const id = this.id
      /*
      if (id === '兜町') {
        id = '日本橋兜町'
      }
      */

      const uri =
        'https://www.kanzaki.com/works/2014/pub/ld-browser?u=' +
        encodeURIComponent(
          this.baseUrl + '/api/' + map[this.field] + '/' + id
        ) +
        '.json&t=jsonld'
      this.uri = uri

      const index = this.index

      // console.log({ index })

      const entities = []

      if (index[id]) {
        this.rdf = true
        entities.push(index[id])
      }

      this.entities = entities
    },
    async getRelatedItems(field = 'spatial') {
      const id = this.id

      const index = this.map[field]

      let response = await axios.get(process.env.BASE_URL + '/data/docs.json')
      response = response.data

      const facetsMap = {}

      for (const key in response) {
        const e = response[key]
        if (e[this.field] && e[this.field].includes(id)) {
          const values = e[field]

          for (const value of values) {
            if (!facetsMap[value]) {
              facetsMap[value] = 0
            }

            facetsMap[value] += 1
          }
        }
      }

      let arr = Object.keys(facetsMap).map((e) => ({
        key: e,
        value: facetsMap[e],
      }))

      arr.sort(function (a, b) {
        if (a.value < b.value) return 1
        if (a.value > b.value) return -1
        return 0
      })

      arr = arr.slice(0, 10) // 最大50

      const facets = {
        facetHits: [],
      }

      for (const obj of arr) {
        facets.facetHits.push({
          value: obj.key,
          count: obj.value,
        })
      }

      const hits = facets.facetHits
      if (hits.length === 0) {
        return
      }

      const moreLikeThisData0 = []

      const counts = {}

      for (let i = 0; i < hits.length; i++) {
        const facet = hits[i]

        let image = [field === 'spatial' ? 'mdi-map' : 'mdi-account']

        const value = facet.value

        // 同一Entityの場合はスキップ
        if (value === id) {
          continue
        }

        const to = this.localePath({
          name: 'entity-entity-id',
          params: { entity: field, id: value },
        })

        // indexの反映
        if (index[value] && index[value].image) {
          image = [index[value].image]
        }

        // 初期データ
        moreLikeThisData0.push({
          _id: 'abc',
          _source: {
            _label: [value + '（' + facet.count + '）'],

            _thumbnail: image,
            _url: [this.baseUrl + to],
          },
          to,
          facet,
        })

        counts[value] = facet.count
      }

      this.fields[field] = moreLikeThisData0

      /*

      // 以上、初期データ

      const ids = []
      for (let i = 0; i < hits.length; i++) {
        const facet = hits[i]
        if (facet.value === id) {
          continue
        }
        const uri =
          this.github +
          '/api/' +
          field.replace('spatial', 'place').replace('agential', 'chname') +
          '/' +
          facet.value
        ids.push(`?s = <${uri}>`)
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

      // -------------

      const map = {}

      for (let i = 0; i < results.length; i++) {
        const hit = results[i]
        map[hit.s] = hit
      }

      for (let i = 0; i < moreLikeThisData0.length; i++) {
        const item = moreLikeThisData0[i]

        if (!item) {
          continue
        }

        const facet = item.facet
        const uri =
          this.github +
          '/api/' +
          field.replace('spatial', 'place').replace('agential', 'chname') +
          '/' +
          facet.value

        if (!map[uri]) {
          continue
        }
        const rdf = map[uri]

        const image = rdf.image
          ? [rdf.image]
          : [field === 'spatial' ? 'mdi-map' : 'mdi-account']

        item._source._thumbnail = image
      }

      this.fields[field] = moreLikeThisData0

      */
    },
    getQuery(label, value) {
      const field = `${this.configIndex}[refinementList][${label}][0]`
      const query = {}
      query[field] = value
      return query
    },

    getValues(data) {
      if (!data) {
        return []
      }
      return Array.isArray(data) ? data : [data]
    },

    dwnJson() {
      /*
      if (!process.browser){
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
      */
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
