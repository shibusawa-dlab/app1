<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="py-5">
      <h2 class="my-5">{{ title }}</h2>
      <nuxt-content :document="data" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class about extends Vue {
  async asyncData({ $content }: any) {
    const data = await $content('about', 'index').fetch()
    return { data }
  }

  get title(): any {
    return this.$t((this as any).data.title)
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

  head() {
    const title = this.title
    return {
      title,
    }
  }
}
</script>
