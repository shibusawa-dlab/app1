<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="py-5">
      <h2 class="my-5">{{ title }}</h2>

      <p>
        『渋沢栄一伝記資料』別巻第1、第2の人名および地名（一部）を対象にし、実験的な分析を行っているため、結果が必ずしも正確ではない可能性があります。
      </p>

      <v-row>
        <v-col
          v-for="(obj, index) in result.members"
          :key="index"
          cols="12"
          :sm="3"
        >
          <v-card flat no-body class="mb-4">
            <nuxt-link
              :to="
                localePath({
                  name: 'entity-id',
                  params: { id: obj.id },
                })
              "
            >
              <div
                class="text-center grey lighten-2 pa-10"
                style="height: 150px; text-decoration: none"
              >
                <v-icon size="75">{{ obj.image }}</v-icon>
              </div>
            </nuxt-link>

            <div class="pa-4">
              <nuxt-link
                :to="
                  localePath({
                    name: 'entity-id',
                    params: { id: obj.id },
                  })
                "
              >
                <h4>{{ obj.label }}</h4>
              </nuxt-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
  baseUrl: any = process.env.BASE_URL

  get title(): any {
    return this.$t('person_place')
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

  result: any = {
    members: [
      {
        id: 'agential',
        label: this.$t('人物'),
        image: 'mdi-account',
      },
      {
        id: 'place',
        label: this.$t('場所'),
        image: 'mdi-map-marker',
      },
    ],
  }

  head() {
    const title = this.title
    return {
      title,
    }
  }
}
</script>
