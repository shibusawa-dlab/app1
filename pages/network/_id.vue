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
    <v-container fluid class="py-5">
      <h2 class="mb-5">{{ title }}</h2>
      <p class="mt-2">
        {{$t("network_lead")}}
      </p>
      <v-row class="mt-5" dense>
        <v-col cols="12" :sm="3">
          <v-sheet class="grey lighten-3 pa-2"
                ><h3><v-icon class="mr-2">mdi-account</v-icon>{{$t("person_information")}}</h3></v-sheet
              >

          <!-- Main -->
          <v-card flat outlined class="mt-5 mb-5">
            <v-img
              v-if="
                nodesMap[$route.params.id] && nodesMap[$route.params.id].image
              "
              :src="nodesMap[$route.params.id].image"
              contain
              style="height: 150px"
              width="100%"
              class="grey lighten-2"
            ></v-img>

            <div class="pa-4" :style="'max-height: 200px; overflow-y: auto;'">
              
              <nuxt-link
                :to="
                  item.to ||
                  localePath({
                    name: 'entity-entity-id',
                    params: { entity: 'agential', id: item._id },
                  })
                "
              >
                
                <h4 v-html="$utils.formatArrayValue(item._source._label)"></h4>
              </nuxt-link>
              
              <!-- eslint-disable-next-line vue/no-v-html -->
              
              <!--
              <h4 v-html="$utils.formatArrayValue(item._source._label)"></h4>
              -->

              <!--
              <p v-if="item._source.description" class="mt-2 mb-0">
                {{ item._source.description }}
              </p>
              -->

              <template
                v-if="
                  nodesMap[$route.params.id] &&
                  nodesMap[$route.params.id].description
                "
              >
                <div class="mt-2">
                  {{ nodesMap[$route.params.id].description }}（Wikiepdiaより）
                </div>
              </template>
            </div>

            <template v-if="!item.share_hide">
              <v-divider />

              <v-card-actions>
                <v-btn
                  v-if="tab === 0"
                  color="primary"
                  @click="select($route.params.id)"
                  ><v-icon class="mr-2">mdi-image-filter-center-focus</v-icon>{{ $t('focus') }}</v-btn
                >
                <v-spacer></v-spacer>
                <ResultOption
                  :item="{
                    label: $utils.formatArrayValue(item._source._label),
                    url: $utils.formatArrayValue(item._source._url),
                  }"
                />
              </v-card-actions>
            </template>

            
          </v-card>

          <!-- Other -->

          <v-card v-if="otherId" flat outlined class="mb-5">
            <v-img
              v-if="nodesMap[otherId] && nodesMap[otherId].image"
              :src="nodesMap[otherId].image"
              contain
              style="height: 150px"
              width="100%"
              class="grey lighten-2"
            ></v-img>

            <div class="pa-4" :style="'max-height: 200px; overflow-y: auto;'">
              
              <nuxt-link
                :to="
                  localePath({
                    name: 'entity-entity-id',
                    params: { entity: 'agential', id: otherId },
                  })
                "
              >
                
                <h4>{{ otherId }}</h4>
              </nuxt-link>
              
              <!-- eslint-disable-next-line vue/no-v-html -->

              <!--
              <h4>{{ otherId }}</h4>
              -->

              <!--
              <p v-if="item._source.description" class="mt-2 mb-0">
                {{ item._source.description }}
              </p>
              -->

              <template
                v-if="nodesMap[otherId] && nodesMap[otherId].description"
              >
                <div class="mt-2">
                  {{ nodesMap[otherId].description }}（Wikiepdiaより）
                </div>
              </template>
            </div>

            <template v-if="!item.share_hide">
              <v-divider />

              <v-card-actions>
                <template>
                  <v-btn
                    color="primary"
                    :to="
                      localePath({
                        name: 'network-id',
                        params: {
                          id: otherId,
                        },
                      })
                    "
                    ><v-icon class="mr-2">mdi-account-network</v-icon>{{$t("view_network")}}</v-btn
                  >
                </template>
                <v-spacer></v-spacer>
                <ResultOption
                  :item="{
                    label: otherId,
                    url:
                      baseUrl +
                      localePath({
                        name: 'entity-entity-id',
                        params: { entity: 'agential', id: otherId },
                      }),
                  }"
                />
              </v-card-actions>
            </template>

            
          </v-card>

          <h3 v-if="false" class="mt-10">
            アイテム
            <nuxt-link
              :to="
                localePath({
                  name: 'search',
                  query: getQuery(),
                })
              "
              ><v-icon>mdi-magnify</v-icon></nuxt-link
            >
          </h3>
          <!--
          <ul class="my-5" style="max-height: 200px; overflow-y: auto">
            <li v-for="i in 50" :key="i">aaa</li>
          </ul>
          <p class="text-right"><a>もっと見る</a></p>
          -->
          <p v-if="false" class="mt-5">
            <nuxt-link
              :to="
                localePath({
                  name: 'search',
                  query: getQuery(),
                })
              "
              >もっと見る <v-icon>mdi-magnify</v-icon></nuxt-link
            >
          </p>
        </v-col>
        <v-col cols="12" :sm="6">

          <v-tabs
          v-model="tab"
          fixed-tabs
        >

          <v-tab
          >
            {{$t("network")}}
          </v-tab>
          <v-tab
          >
            {{$t("つながりを表すアイテム")}}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item
      >
      <no-ssr>
        <network
                ref="network"
                :nodes="network.nodes"
                :edges="network.edges"
                :options="network.options"
                style="height: 800px; background-color: #f0f4c3"
                @click="onNodeSelected"
                @double-click="aaa"
                @stabilized="stabilized"
              >
              </network>
              </no-ssr>
      </v-tab-item>

      <v-tab-item
      >
        <div
                id="container"
                class="grey lighten-2 mb-5"
                style="height: 850px; overflow-y: auto"
              >
                &nbsp;
                <v-card
                  v-for="(item, key) in items"
                  :id="item.key"
                  :key="key"
                  flat
                  outlined
                  class="mb-5 mx-5"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <nuxt-link
                        :to="
                          item.to ||
                          localePath({
                            name: 'entity-entity-id',
                            params: { entity: 'agential', id: item.key },
                          })
                        "
                      >
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <h3>{{ item.key }}</h3>
                      </nuxt-link>
                      <div v-if="nodesMap[item.key].description" class="mt-2">
                        {{ nodesMap[item.key].description }}（Wikiepdiaより）
                      </div>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80">
                      <v-img :src="nodesMap[item.key].image" contain />
                    </v-list-item-avatar>
                  </v-list-item>

                  <div class="pa-4 grey lighten-3">
                    <h4 class="mb-4">
                      <v-icon class="mr-2">mdi-file</v-icon> つながりを表すアイテム
                    </h4>

                    <div v-if="!documents[item.key]" class="text-center py-10">
                      <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
                    </div>

                    <div
                      v-for="(item2, key2) in documents[item.key]"
                      :key="key2"
                      class="px-2"
                    >
                      <h4 class="my-2">
                        <nuxt-link
                          :to="
                            localePath({
                              name: 'item-id',
                              params: {
                                id: item2.objectID,
                              },
                            })
                          "
                          >{{ item2.label }}
                          <small>（{{ item2.objectID }}）</small></nuxt-link
                        >
                        <small
                          ><b>{{ item2.temporal }}</b></small
                        >
                      </h4>
                      <div
                        style="max-height: 200px; overflow-y: auto"
                        class="mb-2"
                        v-html="
                          highlightRelation(
                            $utils.removeHead(
                              //$utils.xml2html(item2._highlightResult.xml.value)
                              $utils.xml2html(item2.xml)
                            ),
                            item.key
                          )
                        "
                      ></div>
                      <v-divider />
                    </div>

                    <template v-if="nodesMap[key] && nodesMap[key].description">
                      <div class="mt-2">
                        {{ nodesMap[key].description }}
                      </div>
                    </template>
                  </div>
                </v-card>
              </div>
      </v-tab-item>
    </v-tabs-items>
          
        </v-col>
        <v-col cols="12" :sm="3">
          <v-sheet class="grey lighten-3 pa-2"
                ><h3><v-icon class="mr-2">mdi-view-list</v-icon>{{$t("relation")}}
                <template v-if="items.length > 0">({{items.length}})</template></h3></v-sheet
              >
              <v-list class="mt-4" dense style="max-height: 800px; overflow-y: auto">
                <v-list-item
                  v-for="item in items"
                  :key="item.key"
                  @click="
                    otherId = item.key
                    scroll(item.key)
                    select(item.key)
                  "
                   @dblclick="bbb(item.key)"
                >
                  <v-list-item-avatar>
                    <v-img :src="nodesMap[item.key].image"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.key"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    {{ item.value }}
                  </v-list-item-action>
                </v-list-item>
              </v-list>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
import VueScrollTo from 'vue-scrollto'
import ResultOption from '~/components/display/ResultOption.vue'
const { Network } = require('vue-vis-network')

@Component({
  components: {
    network: Network,
    ResultOption,
  },
})
export default class about extends Vue {
  baseUrl: any = process.env.BASE_URL

  index: any = process.env.index

  tab: number = 0

  nodesMap: any = {}
  edgesMap: any = {}

  otherId: string = ''

  items: any[] = []

  documents: any = {}

  counts: any = {}

  network: any = {
    nodes: [],
    edges: [],
    options: {
      nodes: {
        color: {
          background: 'lightgray',
          highlight: {
            background: 'lightgray',
            border: '#FF6E00',
          },
        },
        borderWidth: 4,
        borderWidthSelected: 4,
        shapeProperties: {
          useBorderWithImage: true,
        },
      },
      edges: {
        // color: 'orange',
      },
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 20,
        },
      },
      layout: { randomSeed: 2 },
    },
  }

  item2: any = {
    _source: {
      _thumbnail: [
        'http://commons.wikimedia.org/wiki/Special:FilePath/Asano_souichiro.jpg?width=300',
      ],
      _label: ['浅野総一郎'],
      description: [
        '浅野 総一郎（淺野總一郎 あさの そういちろう、1848年4月13日（嘉永元年3月10日） - 1930年（昭和5年）11月9日）は、日本の実業家。一代で浅野財閥を築いた。',
      ],
    },
  }

  get item(): any {
    return {
      _id: this.$route.params.id,

      _source: {
        _thumbnail: ['mdi-account'],
        _label: [this.$route.params.id],
        _url: [
          this.baseUrl +
            this.localePath({
              name: 'entity-entity-id',
              params: { entity: 'agential', id: this.$route.params.id },
            }),
        ],
      },
    }
  }

  get title(): string {
    return this.$route.params.id + 'のネットワーク'
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
        text: this.$t('network'),
        disabled: false,
        to: this.localePath({ name: 'network' }),
        exact: true,
      },
      {
        text: this.title,
      },
    ]
  }

  async created() {
    const id = this.$route.params.id

    const mode = this.$route.query.mode
    if (mode === 'list') {
      this.tab = 1
    }

    let results: any = await axios.get(
      this.baseUrl + '/data/agentials/' + id + '.json'
    )

    const nodes = results.data.nodes

    this.network.edges = results.data.edges

    const nodesMap: any = {}
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      nodesMap[node.id] = node
    }

    this.network.nodes = nodes

    const map: any = {}

    const edgesMap: any = {}

    for (let i = 0; i < results.data.edges.length; i++) {
      const edge = results.data.edges[i]
      edge.id = i
      if (edge.from === id || edge.to === id) {
        if (edge.from === id) {
          map[edge.to] = edge.value
        } else {
          map[edge.from] = edge.value
        }
      }
      edgesMap[edge.id] = edge
    }

    let arr = Object.keys(map).map((e) => ({ key: e, value: map[e] }))

    arr.sort(function (a, b) {
      if (a.value < b.value) return 1
      if (a.value > b.value) return -1
      return 0
    })

    this.items = arr

    this.nodesMap = nodesMap
    this.edgesMap = edgesMap

    const network: any = this.$refs.network
    

    /// //

    const counts: any = {}
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      counts[node.label] = node.count
    }

    arr = Object.keys(counts).map((e) => ({ key: e, value: counts[e] }))

    arr.sort(function (a, b) {
      if (a.value < b.value) return 1
      if (a.value > b.value) return -1
      return 0
    })

    this.counts = arr

    /// ///

    await this.getRelatedItems()
  }

  async getRelatedItems(){
    const id = this.$route.params.id

    const field = 'agential'

    let response: any = await axios.get(process.env.BASE_URL + "/data/docs.json");    

    const hits: any[] = []

    const results = {
      hits
    }

    response = response.data

    for(const key in response){
      const e = response[key]
      //console.log(e)
      if(e[field] && e[field].includes(id)){
        results.hits.push(e)
      }
    }

    /*
    const client = algoliasearch(config.appId, config.apiKey)
    const index = client.initIndex(this.index) // _temporal_asc

    const results = await index.search('', {
      filters: field + ':' + id,
      hitsPerPage: 200,
    })
    */

    

    const documents: any = {}

    for (let i = 0; i < results.hits.length; i++) {
      
      const obj: any = results.hits[i]
      const agentials = obj.agential
      for (let j = 0; j < agentials.length; j++) {
        const agential = agentials[j]
        if (!documents[agential]) {
          documents[agential] = []
        }
        documents[agential].push(obj)
      }
    }

    this.documents = documents

  }

  onNodeSelected(value: any) {
    const nodes = value.nodes
    if (nodes.length > 0) {
      const node = this.nodesMap[nodes[0]].id

      /*
      this.$router.push(
        this.localePath({
          name: 'network-id',
          params: {
            id: node,
          },
        })
      )
      */
      if (node !== this.$route.params.id) {
        this.otherId = node
      } else {
        this.otherId = ''
      }
    } else {
      this.otherId = ''
    }

    this.highlight(value)
  }

  aaa(value: any) {
    const nodes = value.nodes
    if (nodes.length > 0) {
      const node = this.nodesMap[nodes[0]].id

      /*
      this.$router.push(
        this.localePath({
          name: 'network-id',
          params: {
            id: node,
          },
        })
      )
      */
      if (node !== this.$route.params.id) {
        // this.otherId = node

        this.$router.push(
          this.localePath({
            name: 'network-id',
            params: {
              id: node,
            },
          })
        )
      } else {
        this.otherId = ''
      }
    } else {
      this.otherId = ''
    }
  }

  bbb(value: any){
    this.$router.push(
        this.localePath({
          name: 'network-id',
          params: {
            id: value,
          },
        })
      )
  }

  /*
  @Watch('otherId')
  onIdChanged() {
    if (this.otherId) {
      console.log('aaa')
      const network: any = this.$refs.network
      network.selectNodes([this.otherId])
      network.focus(this.otherId)
    }
  }
  */

  select(id: string) {
    this.otherId = ''
    if (id !== this.$route.params.id) {
      this.otherId = id
    }

    const network: any = this.$refs.network
    network.selectNodes([id])
    network.focus(id)
  }

  stabilized() {
    this.network.options.physics.enabled = false
  }

  head() {
    const title = this.title
    return {
      title,
    }
  }

  highlightRelation(xml: any, other: string) {
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
  }

  /*
  toggle() {
    this.dialog = !this.dialog

    const mode = this.dialog ? 'network' : 'list'

    this.$router.push(
      this.localePath({
        name: 'network-id',
        params: {
          id: this.$route.params.id,
        },
        query: {
          mode,
        },
      })
    )
  }
  */

  highlight(value: any) {
    const edgesMap = this.edgesMap
    const neighbors: any[] = []
    const selectedEdges = value.edges

    for (const edge of selectedEdges) {
      const edgeObj = edgesMap[edge]

      const to = edgeObj.to
      if (!neighbors.includes(to)) {
        neighbors.push(to)
      }

      const from = edgeObj.from
      if (!neighbors.includes(from)) {
        neighbors.push(from)
      }
    }

    const nodes = this.network.nodes
    for (const node of nodes) {
      const id = node.id
      if (neighbors.includes(id) || neighbors.length === 0) {
        node.color = {
          border: 'lightgreen',
        }
      } else {
        node.color = {
          border: 'lightgray',
        }
      }
    }

    const edges = this.network.edges
    for (const edge of edges) {
      const id = edge.id
      if (selectedEdges.includes(id)) {
        edge.color = 'orange'
      } else {
        edge.color = 'lightgray'
      }
    }
  }

  getQuery() {
    const query: any = {}
    query[
      `${this.index}[refinementList][agential][0]`
    ] = this.$route.params.id
    return query
  }

  scroll(id: string) {
    const options = {
      container: '#container',
    }
    VueScrollTo.scrollTo('#' + id, 500, options)
  }
}
</script>
