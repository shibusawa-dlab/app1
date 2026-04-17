<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <h2 class="mb-5">{{ title }}</h2>

      <News />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import News from '~/components/news/News.vue'

@Component({
  components: {
    Breadcrumbs,
    News,
  },
})
export default class Item extends Vue {
  baseUrl: any = process.env.BASE_URL

  get title() {
    return this.$t('news')
  }

  head() {
    const title = this.title
    return {
      title,
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
<style>
.nuxt-content h2 {
  margin-top: 12px;
  margin-bottom: 8px;
}

.nuxt-content h3 {
  margin-top: 12px;
  margin-bottom: 8px;
}

.nuxt-content h4 {
  margin-top: 12px;
  margin-bottom: 8px;
}
</style>
