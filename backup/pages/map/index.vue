<template>
  <Main :bh="bh">
    <h1>{{ $t('map') }}</h1>
    <p class="mt-2">
      Wikipediaで位置情報が取得できた場所のみを表示しています。
    </p>
    <div id="map-wrap" style="height: 80vh" class="my-2">
      <mapc :markers="markers" :zoom="2" :center="[35.689556, 139.691722]" />
    </div>
  </Main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Mapc from '~/components/common/Map.vue'
import Main from '~/components/layout/Main.vue'

@Component({
  components: {
    Mapc,
    Main,
  },
})
export default class PageMap extends Vue {
  map: any = {}
  markers: any[] = []

  async asyncData({ payload }: any) {
    if (payload) {
      return { item: payload }
    } else {
      /*
      const results = await axios.get(
        process.env.BASE_URL + '/data/spatial.json'
      )
      */

      const data_ = await import(`~/static/data/spatial.json`)
      const results: any = data_.default

      const markers = []

      for (const label in results) {
        const obj = results[label]

        const param: any = {}
        const fcField = 'fc-spatial'
        param[fcField] = label

        const marker: any = {
          latlng: [obj.lat, obj.long],
          content: label,
          path: {
            name: 'entity-entity-id',
            params: {
              entity: 'spatial',
              id: label,
            },
          },
        }

        markers.push(marker)
      }

      return {
        markers,
      }
    }
  }

  get title() {
    return this.$t('map')
  }

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
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
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
        text: this.title,
      },
    ]
  }
}
</script>
