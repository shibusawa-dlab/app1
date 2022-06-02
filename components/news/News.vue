<template>
  <div>
    <template v-if="items.length > 0">
      <ul>
        <li v-for="(item, key) in items" :key="key" class="mb-2">
          {{ item.date.split('T')[0] }}

          <nuxt-link
            class="ml-2"
            :to="
              localePath({
                name: 'news-slug',
                params: {
                  slug: item.slug,
                },
              })
            "
            >{{ item.title }}</nuxt-link
          >
        </li>
      </ul>
    </template>
    <template v-else>
      {{ 'no news.' }}
    </template>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class License extends Vue {
  @Prop({})
  size!: number

  items: any = []

  async created() {
    let lang = this.$i18n.locale
    if (lang === 'ja') {
      lang = ''
    } else {
      lang = lang + '/'
    }

    try {
      const items = await this.$content(lang + 'news')
        .sortBy('date', 'desc')
        .limit(this.size || '')
        .fetch()

      this.items = items
    } catch (e) {
      console.log({ e })
    }
  }
}
</script>
