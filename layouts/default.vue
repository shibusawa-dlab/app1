<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="drawer" app :temporary="true">
        <v-list>
          <v-list-item link :to="localePath({ name: 'index' })" exact>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            :to="
              localePath({
                name: 'about',
              })
            "
          >
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('about') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            :to="
              localePath({
                name: 'fulltext',
              })
            "
          >
            <v-list-item-action>
              <v-icon>mdi-text</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('fulltext') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          

          <v-list-item
            link
            :to="
              localePath({
                name: 'search',
                //query: { 'dev_MAIN[sortBy]': 'dev_MAIN_temporal_asc' },
              })
            "
          >
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('fulltext_search') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            :to="
              localePath({
                name: 'ad',
                //query: { 'dev_MAIN[sortBy]': 'dev_MAIN_temporal_asc' },
              })
            "
          >
            <v-list-item-action>
              <v-icon>mdi-book-open</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('ad') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            :to="
              localePath({
                name: 'calendar',
              })
            "
          >
            <v-list-item-action>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('calendar') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="localePath({ name: 'entity' })">
            <v-list-item-action>
              <v-icon>mdi-tag</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('person_place') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="localePath({ name: 'network' })">
            <v-list-item-action>
              <v-icon>mdi-account-network</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('network') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="localePath({ name: 'map' })">
            <v-list-item-action>
              <v-icon>mdi-map</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('map') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!--
          <v-list-item
            link
            target="_blank"
            href="https://www.kanzaki.com/works/2016/pub/image-annotator?u=https://shibusawa-dlab.github.io/lab1/iiif/collection/top.json"
          >
            <v-list-item-action>
              <v-icon>mdi-image</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >渋沢栄一日記リスト
                <v-icon>mdi-open-in-new</v-icon></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          -->

          <v-list-item
            link
            target="_blank"
            :href="github + '/tree/master/docs/tei'"
          >
            <v-list-item-action>
              <v-icon>mdi-file</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >TEI/XML <v-icon>mdi-open-in-new</v-icon></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :href="baseUrl + '/snorql'" target="_blank">
            <v-list-item-action>
              <v-icon>mdi-database</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >{{ $t('snorql') }}
                <v-icon>mdi-open-in-new</v-icon></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item
          v-if="false"
            link
            target="_blank"
            href="https://la1l89esu7-dsn.algolia.net/1/indexes/dev_MAIN/?X-Algolia-API-Key=a8dc3bccca1af99f7a77ea55f7dd9f4d&X-Algolia-Application-Id=LA1L89ESU7"
          >
            <v-list-item-action>
              <v-icon>mdi-api</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >Search API <v-icon>mdi-open-in-new</v-icon></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>
          <nuxt-link
            :to="
              localePath({
                name: 'index',
              })
            "
            style="color: inherit; text-decoration: inherit"
          >
            {{ $t(siteName) }}
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template #activator="{ on }">
            <v-btn depressed btn v-on="on">
              <v-icon>mdi-translate</v-icon>
              <template v-if="$vuetify.breakpoint.name != 'xs'">
                <span class="ml-2">{{
                  $i18n.locale == 'ja' ? '日本語' : 'English'
                }}</span>
                <v-icon class="ml-2">mdi-menu-down</v-icon>
              </template>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="switchLocalePath('ja')">
              <v-list-item-title>日本語</v-list-item-title>
            </v-list-item>
            <v-list-item :to="switchLocalePath('en')">
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        
      </v-app-bar>
    </div>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :dark="true" class="mt-5">
      <v-container>
        <v-btn v-if="false" link depressed btn :to="localePath({name : 'about'})">
          <v-icon class="mr-2">mdi-information</v-icon>
          {{
            $t('about')
          }}
        </v-btn>

        <div class="text-center my-5"> <!-- mt-10 -->
          <p>
            <nuxt-link :to="localePath({name : 'index'})" style="color: white;">{{$t(siteName)}}</nuxt-link>
          </p>
        </div>
      </v-container>
    </v-footer>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      large
      color="error"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class search extends Vue {
  fab: boolean = false

  drawer: boolean = false
  baseUrl: string = process.env.BASE_URL || ''
  siteName: string = process.env.siteName || ''
  github: string = process.env.github || ''
  pages: string = process.env.github_pages || ''

  onScroll(e: any): void {
    if (typeof window === 'undefined') return
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 20
  }

  toTop(): void {
    // @ts-ignore
    this.$vuetify.goTo(0)
  }
}
</script>
<style>
.teiDate {
  background-color: #bbdefb;
}
.teiTime {
  background-color: #fff9c4;
}
.teiPersName {
  background-color: #ffccbc;
}
.teiPlaceName {
  background-color: #c8e6c9;
}
a {
  text-decoration: none;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
* {
  text-transform: none;
}
</style>
