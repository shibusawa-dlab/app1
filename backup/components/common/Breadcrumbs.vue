<template>
  <v-sheet color="grey lighten-2">
    <v-container fluid class="py-2 px-0 mx-0">
      <v-breadcrumbs class="py-0" :items="items">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ShareButtons extends Vue {
  @Prop({ required: true })
  items!: any[]
}
</script>
