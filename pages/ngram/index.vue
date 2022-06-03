<template>
  <div>
    <!-- <Breadcrumbs :items="bh" /> -->
    <v-container class="my-5 mb-10">
      <h1 class="mb-5">{{ title }}</h1>

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
        <v-row class="mb-5">
          <v-col cols="12" md="10">
            <v-text-field
              v-model="q"
              autocomplete="off"
              light
              single-line
              filled
              rounded
              dense
              hide-details
              :clearable2="true"
              :clear-icon="mdiClose"
              background-color="#E0E0E0"
              :placeholder="$t('inputSearchKeyword')"
              :append-icon="mdiMagnify"
              @click:append="search"
              @keydown.enter="trigger"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-switch
              v-model="isHelp"
              class="mt-1"
              dense
              hide-details
              inset
              :label="`ヘルプ`"
            ></v-switch>
          </v-col>
        </v-row>

        <v-sheet v-show="isHelp" class="pa-5 mb-5" color="grey lighten-3">
          <p>
            年代ごとの出現頻度を可視化します。<!--（可視化対象は、デフォルトでは総出現頻度上位5件です）-->
            <br />可視化グラフの縦軸は、年代ごとに何回出現したかを表す出現頻度と、出現頻度を出版年代ごとの総ngram数で割った値を表す出現比率の2種類を切り替えることができます。
            <br />
          </p>
          <ul>
            <li class="mb-2">
              複数のキーワードをスラッシュ(/)区切りでクエリに指定することで、出現頻度を重ねて表示することができます。
              <div>
                例：「<nuxt-link
                  :to="
                    localePath({
                      name: 'ngram',
                      query: { keyword: '第一銀行/日本銀行' },
                    })
                  "
                  >第一銀行/日本銀行</nuxt-link
                >」
              </div>
            </li>

            <li class="mb-2">
              正規表現を利用したクエリが可能です。
              <div>
                例：「<nuxt-link
                  :to="
                    localePath({
                      name: 'ngram',
                      query: { keyword: '浅野..郎' },
                    })
                  "
                  >浅野..郎</nuxt-link
                >」
              </div>
            </li>
          </ul>
          <div v-if="false">
            【注意】クエリにスラッシュ(/)が含まれる場合、正規表現は無効化されます。つまり複数キーワードクエリと正規表現クエリを併用することはできません。
          </div>
          <div>
            【注意】処理の特性により、総出現頻度が5程度以下のものについては集計漏れが発生することがあります。
          </div>
        </v-sheet>

        <div v-if="results.hits">
          <p>
            {{ results.hits.total.value.toLocaleString() }} 件ヒットしました。
          </p>
        </div>

        <div v-if="results.hits && results.hits.hits.length > 0" id="result">
          <v-radio-group v-model="type" row>
            <v-radio label="出現頻度" value="freq"></v-radio>
            <v-radio
              label="出現比率（年ごとの出現頻度/年ごとの総対象Ngram数）"
              value="ratio"
            ></v-radio>
          </v-radio-group>

          <LineChart :data="data" :option="option" class="mb-10"></LineChart>

          <v-data-table
            v-model="selected"
            :sort-by="['freq']"
            :sort-desc="[true]"
            :headers="headers"
            :items="items"
            item-key="label"
            :items-per-page="20"
            show-select
          >
            <template v-slot:item.link="{ item }">
              <nuxt-link
                :to="
                  localePath({
                    name: 'search',
                    query: { 'main[query]': item.label },
                  })
                "
                >検索</nuxt-link
              >
            </template>
          </v-data-table>

          <v-simple-table v-if="false">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">キーワード</th>
                  <th class="text-left">総頻度</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, key) in results.hits.hits.slice(0, 200)"
                  :key="key"
                >
                  <td>{{ item._source.label }}</td>
                  <td>{{ item._source.count.toLocaleString() }}</td>
                  <td>
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'search',
                          query: { keyword: item._source.label },
                        })
                      "
                      >検索</nuxt-link
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mdiMagnify, mdiClose } from '@mdi/js'
// import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import axios from 'axios'
import LineChart from '~/components/LineChart.vue'

@Component({
  components: {
    LineChart,
    // Breadcrumbs,
  },
})
export default class Ngram extends Vue {
  loading: boolean = false
  searchAgg: string = ''

  isHelp: boolean = true

  tabs: any = null

  aggs: any = process.env.aggs

  q: string = ''

  mdiMagnify: string = mdiMagnify
  mdiClose: string = mdiClose

  results: any = {}

  data: any = {}

  type: string = 'freq'

  selected: any = []

  loading: boolean = true

  get option(): any {
    let ticks: any = {
      beginAtZero: true,
    }
    if (this.type === 'freq') {
      ticks = {
        beginAtZero: true,
        callback(value: number) {
          if (value % 1 === 0) {
            return value
          }
        },
      }
    }
    return {
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        Axes: [
          {
            // ここで軸を時間を設定する
            type: 'time',
            time: {
              unit: 'year',
            },
          },
        ],
        yAxes: [
          {
            id: 'y-axis-1',
            position: 'left',
            scaleLabel: {
              // 軸ラベル
              display: true, // 表示設定
              labelString:
                this.type === 'freq'
                  ? 'キーワードの出現頻度'
                  : 'キーワードの出現比率',
            },
            ticks,
          },
          {
            id: 'y-axis-2',
            position: 'right',
            scaleLabel: {
              // 軸ラベル
              display: true, // 表示設定
              labelString: '総ngram数',
            },
            ticks: {
              beginAtZero: true,
              callback(value: number) {
                if (value % 1 === 0) {
                  return value
                }
              },
            },
          },
        ],
      },
    }
  }

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return
    this.search()
  }

  headers: any[] = [
    { text: 'キーワード', value: 'label' },
    { text: 'キーワードの総出現頻度（Term Frequency）', value: 'freq' },
    { text: 'アイテムの総出現頻度（Document Frequency）', value: 'df' },
    { text: '', value: 'link' },
  ]

  items: any[] = []

  async asyncData() {
    /*
    const data_ = await import(`~/static/data/ngram.json`)
    const results = data_.default
    */

    // const dataDf = await import(`~/static/data/ngram.json`)
    // const resultsDf = dataDf.default

    const dataNgramAll = await import(`~/static/data/all.json`)
    const ngramAll = dataNgramAll.default
    /*
     */

    // const data2_ = await import(`~/static/data/ngram_keys.json`)
    // const keys = data2_.default

    return {
      // index: results.tf,
      // indexDf: /* resultsDf */ results.df,
      ngramAll /*, keys */,
    }
  }

  index: any = []
  indexDf: any = []

  async mounted() {
    // const dataNgramAll = await import(`~/static/data/all.json`)
    // const ngramAll = dataNgramAll.default
    // const {data} = await axios.get(process.env.BASE_URL + "/static/")
    const data_ = await import(`~/static/data/ngram.json`)
    const results = data_.default

    this.loading = false

    // console.log({ results })

    this.index = results.tf
    this.indexDf = results.df

    if (this.$route.query.keyword) {
      this.q = String(this.$route.query.keyword)

      // 初期読み込み
      this.exec()
    }
  }

  @Watch('$route')
  watchRoute(n: any, o: any) {
    const nk = n.query.keyword
    const ok = o.query.keyword
    if (nk !== ok) {
      this.q = String(nk)
      this.exec()
    }
    /*
    if (this.$route.query.keyword) {
      this.q = String(this.$route.query.keyword)
      this.exec()
    }
    */
    // this.exec()
  }

  @Watch('type')
  watchType() {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    query.type = this.type

    this.$router.push(
      this.localePath({
        name: 'ngram',
        query,
      })
    )

    // this.draw()
    this.watchSelected()
  }

  search() {
    this.$router.push(
      this.localePath({
        name: 'ngram',
        query: {
          keyword: this.q,
        },
      }),
      () => {},
      () => {}
    )

    // this.exec()
  }

  /* async */ exec() {
    const query: any = this.$route.query
    // query.max = -1
    // query.keyword = query.keyword
    query.sort = 'count:desc'

    // const routeQuery = query
    // const esQuery = this.$es.createNgramQuery(routeQuery, this.aggs)

    // const endpoint = (process as any).env.api.replace('/es', '/ngram')

    // const data = await (this as any).$axios.$post(endpoint, esQuery)
    const data = this.ngram(/* endpoint, esQuery */)

    // 何用？
    this.results = data // .slice(0, 200)

    // テーブル表示用
    const items: any[] = []
    const selected = []
    for (const item of data.hits.hits) {
      const row = {
        label: item._source.label,
        freq: item._source.count,
        df: item._source.countDf,
      }
      items.push(row)

      if (items.length < 5) {
        selected.push(row)
      }
    }
    this.items = items
    this.selected = selected
  }

  @Watch('selected')
  watchSelected() {
    const colors = [
      // '#F44336', '#9C27B0', '#3F51B5', '#03A9F4', '#009688'
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF',
      '#000000',
      '#800000',
      '#008000',
      '#000080',
      '#808000',
      '#800080',
      '#008080',
      '#808080',
      '#C00000',
      '#00C000',
      '#0000C0',
      '#C0C000',
      '#C000C0',
      '#00C0C0',
      '#C0C0C0',
      '#400000',
      '#004000',
      '#000040',
      '#404000',
      '#400040',
      '#004040',
      '#404040',
      '#200000',
      '#002000',
      '#000020',
      '#202000',
      '#200020',
      '#002020',
      '#202020',
      '#600000',
      '#006000',
      '#000060',
      '#606000',
      '#600060',
      '#006060',
      '#606060',
      '#A00000',
      '#00A000',
      '#0000A0',
      '#A0A000',
      '#A000A0',
      '#00A0A0',
      '#A0A0A0',
      '#E00000',
      '#00E000',
      '#0000E0',
      '#E0E000',
      '#E000E0',
      '#00E0E0',
      '#E0E0E0',
    ]
    const data = this.results

    let minYear = 2022
    let maxYear = 1

    const ngramAll = (this as any).ngramAll

    const datasets = []

    if (!data.hits) {
      return
    }

    // テーブルで選択済みのhitに絞る

    const selectedLabels = []
    const selected = this.selected
    for (const e of selected) {
      selectedLabels.push(e.label)
    }

    let hits = this.results.hits.hits
    const hits2 = []
    for (const h of hits) {
      if (selectedLabels.includes(h._source.label)) {
        hits2.push(h)
      }
    }

    hits = hits2

    // テーブルで選択済みのhitに絞る

    for (let i = 0; i < hits.length; i++) {
      // for (const hit of hits) {
      const hit = hits[i]
      const freq = hit._source.freq

      freq.sort((a: any, b: any) => (a.year > b.year ? 1 : -1))

      const xys: any = {}
      for (const f of freq) {
        const year = f.year

        if (Number(year) === 9999) {
          continue
        }

        if (year < minYear) {
          minYear = year
        }

        if (year > maxYear) {
          maxYear = year
        }

        const count = f.count

        /*
        if (!xys[year - 1]) {
          xys[year - 1] = 0
        }

        if (!xys[year + 1]) {
          xys[year + 1] = 0
        }
        */

        xys[year] = count
      }

      const dataset = {
        label: hit._source.label,
        fill: false,
        borderColor: colors[i], // randomRgba(),
        data: xys,
      }
      datasets.push(dataset)
    }

    const labels = []
    for (let i = minYear; i <= maxYear; i++) {
      labels.push(i)
    }

    for (let i = 0; i < hits.length; i++) {
      // for (const hit of hits) {
      // const hit = hits[i]
      // const freq = hit._source.freq

      // freq.sort((a: any, b: any) => (a.year > b.year ? 1 : -1))

      const xysMap = datasets[i].data
      const xys = []

      for (let i = minYear; i <= maxYear; i++) {
        const year = i
        let count = 0
        if (xysMap[year]) {
          count = xysMap[year]
          if (this.type === 'ratio') {
            count = count / ngramAll[year]
          }
        }
        xys.push({
          x: String(year),
          y: count,
        })
      }

      /*
      for (let j = 0; j < labels.length; j++) {
        // for (const year of labels) {
        const year = labels[j]
        let count = 0
        if (xysMap[year]) {
          count = xysMap[year]
        }
        if (true || j === 0 || j === labels.length - 1) {
          // count > 0 ||
          xys.push({
            x: String(year),
            y: count,
          })
        }
      }
      */

      datasets[i].data = xys
    }

    const labels2 = []
    const xys = []
    for (let i = minYear; i <= maxYear; i++) {
      const yearStr = String(i)
      labels2.push(yearStr)

      if (ngramAll[yearStr] != null) {
        xys.push(ngramAll[yearStr])
      } else {
        xys.push(0)
      }
    }

    const dataset = {
      label: '総ngram',
      // fill: false,
      data: xys,
      pointBackgroundColor: 'transparent',
      borderColor: 'transparent',
      // borderColor: 'black',
      backgroundColor: 'rgba(255, 165, 0, 0.5)',
      yAxisID: 'y-axis-2',
    }
    datasets.push(dataset)

    this.data = {
      labels: labels2,
      datasets,
    }
  }

  containsSymbol(string: string) {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

    if (format.test(string)) {
      return true
    } else {
      return false
    }
  }

  ngram(/* endpoint, esQuery */) {
    const results = (this as any).index
    const resultsDf = (this as any).indexDf
    const keyword: any = this.$route.query.keyword
    const keywords: any = keyword.split('/')
    let keys: any[] = []
    for (const key of keywords) {
      let keys2 = []
      if (this.containsSymbol(key)) {
        keys2 = Object.keys(results).filter((x) => x.match(key))
      } else {
        keys2 = Object.keys(results).filter((x) => x === key)
      }
      keys = [...new Set([...keys, ...keys2])]
    }
    const items = []
    const freq: any = {}
    for (const key of keys) {
      // items.push(results[key])
      freq[key] = results[key]._source.count
    }

    const arr = Object.keys(freq).map((e) => ({ key: e, value: freq[e] }))
    arr.sort(function (a: any, b: any) {
      if (a.value < b.value) return 1
      if (a.value > b.value) return -1
      return 0
    })

    for (const item of arr) {
      const item2 = results[item.key]
      item2._source.countDf = resultsDf[item2._source.label]._source.count
      items.push(item2)
    }

    return {
      hits: {
        total: {
          value: items.length,
        },
        hits: items,
      },
    }
    // return items
  }

  headersAggs: any[] = [
    {
      text: this.$t('name'),
      value: 'label',
    },
    {
      text: this.$t('results'),
      value: 'value',
    },
  ]

  tabValue: any = null

  // items: any[] = []

  get label() {
    // return this.$t(this.aggs[this.$route.params.slug].label)
    return 'abc'
  }

  get bh(): any[] {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
        exact: true,
      },
      {
        text: this.title,
      },
    ]
  }

  getQuery(value: string) {
    const obj: any = {}
    obj['fc-' + this.$route.params.slug] = value
    return obj
  }

  title: string = 'Ngram Viewer'

  head() {
    return {
      title: this.title,
    }
  }
}
</script>
