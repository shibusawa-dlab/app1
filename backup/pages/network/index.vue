<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container fluid class="py-5">
      <h1 class="mb-5">{{ $t('network_of_people') }}</h1>
      <p class="mt-2">
        {{ $t('network_lead') }}
      </p>

      <!-- 
      <v-row>
        <v-col
          ><v-btn
            v-show="otherId"
            color="primary"
            :to="
              localePath({
                name: 'network-id',
                params: {
                  id: otherId,
                },
              })
            "
            ><v-icon class="mr-2">mdi-account-network</v-icon>
            {{ otherId }}のネットワークをみる</v-btn
          ></v-col
        >
        <v-col>
          <div class="text-right">
            <v-chip label>{{
              '同一の日記に3回以上共起する人物ネットワーク'
            }}</v-chip>
          </div>
        </v-col>
      </v-row>
      -->
      <!--
      <v-overlay :value="loading && false">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      -->

      <p v-if="loading && false" class="text-center">
        表示に時間がかかります。
      </p>

      <v-row>
        <v-col cols="12" :sm="9">
          <client-only>
            <network2
              ref="network"
              :nodes="nodes"
              :edges="edges"
              :options="options"
              style="height: 800px; background-color: #f0f4c3"
              @click="highlight"
              @dblclick="onNodeSelected"
              @double-click="aaa"
              @stabilized_="stabilized"
            >
            </network2>
          </client-only>
        </v-col>
        <v-col cols="12" :sm="3">
          <v-sheet class="grey lighten-3 pa-2"
            ><h3>
              <v-icon>mdi-view-list</v-icon> {{ $t('people_list') }}
              <template v-if="counts.length > 0"
                >({{ counts.length }})</template
              >
            </h3></v-sheet
          >
          <v-list
            class="mt-4"
            dense
            style="max-height: 800px; overflow-y: auto"
          >
            <v-list-item
              v-for="(item, key) in counts"
              :key="key"
              @click="select(item.key)"
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
import { Network } from 'vue-vis-network'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
@Component({
  components: {
    network2: Network,
    Breadcrumbs,
  },
})
export default class network extends Vue {
  loading: boolean = true
  baseUrl: any = process.env.BASE_URL

  nodesOrg: any = []
  nodes: any = []
  nodesMap: any = {}

  edgesOrg: any = []
  edges: any = []
  edgesMap: any = {}

  counts: any = []

  options: any = {
    nodes: {
      /*
      // borderWidth: 4,
      shapeProperties: {
        useBorderWithImage: true,
      },
      
      */
      color: {
        background: 'lightgray',
        highlight: {
          background: 'lightgray',
          border: '#FF6E00',
        },
      },
      borderWidthSelected: 8,
      borderWidth: 4,
      shapeProperties: {
        useBorderWithImage: true,
      },
    },
    edges: {
      // color: 'lightgray',
    },
    physics: {
      // timestep: 0.01, // 100, // 0.1,
      timestep: 0.1,
      enabled: true,
    },
    layout: { randomSeed: 2 },
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
      },
    ]
  }

  /*
  async asyncData() {
    const data_ = await import(`~/static/data/agentials.json`)
    const results = data_.default
    return { results }
  }
  */

  results: any = {}

  async created() {
    const data_ = await import(`~/static/data/agentials.json`)
    this.results = data_.default

    const data: any = (this as any).results

    const nodesMap: any = {}

    const nodes = data.nodes

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      nodesMap[node.id] = node

      /*
      node.image = {
        unselected: node.image,
        selected: node.image
      }

      node.shapeProperties = {
        borderDashes: [15, 5],
            interpolation: false,
      }
      */
    }

    const edgesMap: any = {}
    const edges = data.edges

    for (let i = 0; i < edges.length; i++) {
      const e = edges[i]
      e.id = i
      e.color = 'lightgrey'
      edgesMap[i] = e
    }

    this.nodes = nodes
    // this.nodesOrg = JSON.parse(JSON.stringify(nodes))

    this.nodesMap = nodesMap
    this.edgesMap = edgesMap
    this.edges = data.edges

    /// //

    const counts: any = {}
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      counts[node.label] = node.count
    }

    const arr = Object.keys(counts).map((e) => ({ key: e, value: counts[e] }))

    arr.sort(function (a, b) {
      if (a.value < b.value) return 1
      if (a.value > b.value) return -1
      return 0
    })

    this.counts = arr

    const self = this
    window.setTimeout(function () {
      const network: any = self.$refs.network
      network.stopSimulation()
      self.options.physics.enabled = false
    }, 5000)
  }

  otherId = ''

  onNodeSelected(value: any) {
    const nodes = value.nodes
    if (nodes.length > 0) {
      const node = this.nodesMap[nodes[0]]
      this.otherId = node.label
    }
  }

  aaa(value: any) {
    const nodes = value.nodes
    if (nodes.length > 0) {
      const node = this.nodesMap[nodes[0]]
      this.$router.push(
        this.localePath({
          name: 'network-id',
          params: {
            id: node.label,
          },
        })
      )
    }
  }

  bbb(value: any) {
    this.$router.push(
      this.localePath({
        name: 'network-id',
        params: {
          id: value,
        },
      })
    )
  }

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
    this.options.physics.enabled = false
    this.loading = false
  }

  head() {
    const title = this.$t('network')
    return {
      title,
    }
  }

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

    const nodes = this.nodes
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

    const edges = this.edges
    for (const edge of edges) {
      const id = edge.id
      if (selectedEdges.includes(id)) {
        edge.color = 'orange'
      } else {
        edge.color = 'lightgray'
      }
    }
  }
}
</script>
