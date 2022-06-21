<template>
  <div>
    <Breadcrumbs :items="bh" />

    <v-container>
      <h2 class="my-5">
        {{ title }} <small>（{{ total.toLocaleString() }}）</small>
      </h2>

      <template v-if="loadingFlag">
        <div class="text-center my-5">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </template>
      <template v-else>
        <v-row align="center" class="mt-5">
          <v-col cols="12">
            <v-text-field
              v-model="keyword /*keywordStr*/"
              single-line
              background-color="grey lighten-3"
              class="px-4"
              filled
              rounded
              dense
              :label="$t('add_a_search_term')"
              append-icon="mdi-magnify"
              clearable
              clear-icon="mdi-close-circle"
              @click:append="updateQuery()"
              @keydown.enter="trigger"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center mt-5 mb-10">
          <v-pagination
            v-model="currentPage"
            :length="paginationLength"
            :total-visible="7"
            @input="setCurrentPage"
          ></v-pagination>
        </div>

        <grid :col="4" :list="people"></grid>

        <div class="text-center my-5">
          <v-pagination
            v-model="currentPage"
            :length="paginationLength"
            :total-visible="7"
            @input="setCurrentPage"
          ></v-pagination>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class PageCategory extends Vue {
  @Watch('$route', { deep: true })
  watchTmp(): void {
    this.search()
  }

  baseUrl: any = process.env.BASE_URL

  keyword: string = ''

  settings: any = {
    agential: {
      type: 'type:Agent',
      query: 'fc-agentials',
      label: '人物',
    },
    place: {
      type: 'type:Place',
      query: 'fc-places',
      label: '場所',
    },
  }

  loadingFlag: boolean = true
  results: any[] = []
  label: string = ''
  people: any[] = []

  total: number = 0
  perPage: number = 20

  currentPage: number = 1

  id: string = ''

  async asyncData() {
    const data_ = await import(`~/static/data/entity.json`)
    const results = data_.default
    return { results }
  }

  // state
  async mounted() {
    await this.createIndex()

    await this.search()
  }

  index: any = {}

  /* async */ createIndex() {
    // let results: any = await axios.get(this.baseUrl + '/data/entity.json')
    // results = results.data
    const results = this.results

    const id: any = this.$route.params.id

    const keyword: any = this.$route.query.keyword || ''
    this.keyword = keyword

    const tmp = id === 'agential' ? id : 'spatial'

    this.id = id
    this.index = results[tmp]
    // console.log({results})
  }

  get paginationLength() {
    return Math.ceil(this.total / this.perPage)
  }

  /*
  async getTotal() {
    const type = this.id === 'agential' ? 'Agent' : 'Place'

    const keyword = this.$route.query.keyword || ''

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
      SELECT DISTINCT (count(DISTINCT ?s) as ?c) WHERE {
        ?cho ?x ?s . 
        ?s rdf:type type:${type} . 
        ${
          keyword !== ''
            ? "?s rdfs:label ?label . filter regex(?label, '" +
              keyword +
              "', 'i')"
            : ''
        }
      }
    `

    let url = 'https://dydra.com/ut-digital-archives/shibusawa/sparql?query='

    url = url + encodeURIComponent(query) + '&output=json'

    const results = await axios.get(url)

    return results.data[0].c
  }
  */

  search() {
    const index = this.index

    const id = this.id

    const tmp = id === 'agential' ? id : 'spatial'

    this.loadingFlag = true

    const from = Number(this.$route.query.from) || 0
    this.currentPage = from / this.perPage + 1

    const keyword = this.keyword // this.$route.query.keyword || ''

    let list = []

    for (const obj of index) {
      // const obj = index[label]
      const label = obj.id

      if (keyword !== '' && !label.includes(keyword)) {
        continue
      }

      const entity: any = {
        label: label + ' (' + obj.value.toLocaleString() + ')',
        path: {
          /*
          name: 'search',
          query: queryObj,
          */
          name: 'entity-entity-id',
          params: {
            entity: tmp,
            id: label,
          },
        },
      }

      if (obj.image) {
        entity.image = obj.image
      } else {
        entity.image = process.env.BASE_URL + '/img/icons/no-image.webp'
      }

      const url = process.env.BASE_URL + '/snorql/?describe=' + obj.id
      entity.url = url

      list.push(entity)
    }

    this.total = list.length

    list = list.slice(from, from + this.perPage)

    this.people = list
    this.loadingFlag = false
  }

  /*
  async search2() {
    const id: any = this.$route.params.id
    this.id = id

    const total = await this.getTotal()
    this.total = total

    this.loadingFlag = true

    const setting = this.settings[id]

    const type = setting.type

    const from = Number(this.$route.query.from) || 0
    this.currentPage = from / this.perPage + 1

    const keyword = this.$route.query.keyword || ''

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
      SELECT DISTINCT ?s ?label ?image (count(DISTINCT ?cho) as ?c) WHERE {
        ?cho ?x ?s . 
        ?s rdfs:label ?label;  rdf:type ${type} . 
        ${keyword !== '' ? "filter regex(?label, '" + keyword + "', 'i')" : ''}
            optional { ?s schema:image ?image } 
      }
      GROUP BY ?s ?label ?image
      ORDER BY desc(?c)
      LIMIT ${this.perPage}
      OFFSET ${from}
    `

    let url = 'https://dydra.com/ut-digital-archives/shibusawa/sparql?query='

    url = url + encodeURIComponent(query) + '&output=json'

    axios.get(url).then((response: any) => {
      const results = response.data

      const people = []
      for (let i = 0; i < results.length; i++) {
        const obj = results[i]

        if (obj.label.value) {
          continue
        }

        const tmp = id === 'agential' ? id : 'spatial'

        const field = `dev_MAIN[refinementList][${tmp}][0]`

        const queryObj: any = {
          // 'dev_MAIN[sortBy]': 'dev_MAIN', // _temporal_asc',
        }
        queryObj[field] = obj.label

        const person: any = {
          label: obj.label + ' (' + obj.c.toLocaleString() + ')',
          path: {
            
            //name: 'search',
            //query: queryObj,
            
            name: 'entity-entity-id',
            params: {
              entity: tmp,
              id: obj.label,
            },
          },
        }

        if (obj.image) {
          person.image = obj.image
        } else {
          person.image = process.env.BASE_URL + '/img/icons/no-image.png'
        }

        const url = process.env.BASE_URL + '/snorql/?describe=' + obj.s
        person.url = url

        people.push(person)
      }
      this.people = people
      this.loadingFlag = false
    })
  }
  */

  get title() {
    return this.$t(this.settings[this.$route.params.id].label)
  }

  head() {
    return {
      title: this.$t('category') + ' : ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('search_by_category'),
        },
      ],
    }
  }

  setCurrentPage(value: number) {
    const from: any = (value - 1) * this.perPage
    const query: any = Object.assign({}, this.$route.query)
    query.from = from
    this.$router.push(
      this.localePath({
        name: 'entity-id',
        params: {
          id: this.id,
        },
        query,
      }),
      () => {},
      () => {}
    )
  }

  keywordStr: string = ''

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return

    this.updateQuery()
  }

  updateQuery() {
    const query: any = Object.assign({}, this.$route.query)

    /*

    let keywordStr = this.keywordStr

    if (!keywordStr) {
      keywordStr = ''
    }

    let keywords
    if (keywordStr.startsWith('"') && keywordStr.endsWith('"')) {
      keywords = [keywordStr]
    } else {
      keywords = keywordStr.split(' ')
    }

    query.keyword = keywords

    */

    query.keyword = this.keyword

    delete query.from

    this.$router.push(
      this.localePath({
        name: 'entity-id',
        params: {
          id: this.id,
        },
        query,
      }),
      () => {},
      () => {}
    )
  }

  updateQuery2() {
    const query: any = Object.assign({}, this.$route.query)

    let keywordStr = this.keywordStr

    if (!keywordStr) {
      keywordStr = ''
    }

    let keywords
    if (keywordStr.startsWith('"') && keywordStr.endsWith('"')) {
      keywords = [keywordStr]
    } else {
      keywords = keywordStr.split(' ')
    }

    query.keyword = keywords

    delete query.from

    this.$router.push(
      this.localePath({
        name: 'entity-id',
        params: {
          id: this.id,
        },
        query,
      }),
      () => {},
      () => {}
    )
  }

  get bh() {
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
        text: this.title,
      },
    ]
  }
}
</script>
