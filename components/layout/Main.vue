<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="mt-5 mb-10">
      <slot></slot>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
@Component({
  components: {
    Breadcrumbs,
  },
})
export default class ShareButtons extends Vue {
  @Prop()
  bh!: any[]
}
</script>
