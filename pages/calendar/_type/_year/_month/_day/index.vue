<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <p v-if="false">晴は橙色、曇は灰色、雨は水色で示されます。</p>
      <p>
        『渋沢栄一伝記資料』別巻第1, 第2の日付と時間情報を活用し,
        カレンダー形式で可視化しています。日記は水色、集会日時通知表は灰色で表示されます。
      </p>

      <v-row v-show="mainFlag" class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title class="ml-4">
                {{ title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template #activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ $t(typeToLabel[type]) }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>{{ $t('Day') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>{{ $t('Week') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>{{ $t('Month') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'custom-daily'">
                    <v-list-item-title>{{ $t('Year') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>{{ $t('4 Days') }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <client-only>
              <v-calendar
                ref="calendar"
                v-model="value"
                color="primary"
                :events="events"
                :type="type"
                :locale="lang"
                @click:more="viewDay"
                @click:date="viewDay"
                @click:event="showEvent"
                @change="updateRange"
              ></v-calendar>
            </client-only>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                  <!-- 
                    <v-spacer></v-spacer>
                    <v-toolbar-title>{{ selectedEvent.id }}</v-toolbar-title>
                    -->
                </v-toolbar>
                <v-card-text>
                  <span v-html="$utils.xml2html(selectedEvent.xml, true)" />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="primary"
                    :to="
                      localePath({
                        name: 'item-id',
                        params: { id: selectedEvent.id },
                      })
                    "
                  >
                    {{ $t('本文表示') }}
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    {{ $t('Cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

// NUM=値 LEN=桁数
function zfill(NUM, LEN) {
  NUM = Number(NUM)
  return (Array(LEN).join('0') + NUM).slice(-LEN)
}

function getColor2(data) {
  const color = 'cyan'
  if (data.includes('day')) {
    return 'grey darken-1'
  }
  return color
}

function formatDate(dt) {
  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  return y + '-' + m + '-' + d
}

export default {
  components: {
    Breadcrumbs,
  },
  // async
  asyncData({ /* payload, */ app }) {
    /*
    let docs = {}
    if (payload) {
      docs = payload
    } else {
      const data_ = await import(`~/static/data/docs.json`)
      docs = data_.default
    }
    */

    // 初期値
    let value = '1914-01-02'
    let type = 'custom-daily'

    const routeQuery = app.context

    if (routeQuery.params.year) {
      const params = routeQuery.params
      value =
        params.year + '-' + zfill(params.month, 2) + '-' + zfill(params.day, 2)
      if (params.type !== 'year') {
        type = params.type
      }
    }

    const es = value.split('-')

    const query = es[0] + '-' + es[1]

    return { value, type, query }
  },
  data: () => ({
    baseUrl: process.env.BASE_URL,
    initFlag: true,
    mainFlag: true,

    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
      'custom-daily': 'Year',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
  }),
  computed: {
    url() {
      return this.baseUrl + this.$route.path
    },
    lang() {
      return this.$i18n.locale
    },
    title() {
      let value = '1914-01-02'
      // const type = 'custom-daily'

      const routeQuery = this.$route

      if (routeQuery.params.year) {
        const params = routeQuery.params
        value =
          params.year +
          '-' +
          zfill(params.month, 2) +
          '-' +
          zfill(params.day, 2)
        /*
        if (params.type !== 'year') {
          type = params.type
        }
        */
      }

      const es = value.split('-')

      const monthEnglishList = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ]
      const year = es[0]
      const month = Number(es[1])
      const day = Number(es[2])

      return this.lang === 'ja'
        ? this.$utils.wareki(year + '-' + month + '-' + day).split('月')[0] +
            '月'
        : monthEnglishList[month - 1] + ' ' + year
    },
    bh() {
      return [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('calendar'),
          disabled: false,
          to: this.localePath({ name: 'calendar' }),
          exact: true,
        },
        {
          text: this.title,
        },
      ]
    },
  },
  async created() {
    let response = await axios.get(process.env.BASE_URL + '/data/docs.json')

    response = response.data // docs // docs.data

    const query = this.query
    const type = this.type

    const results = {
      hits: [],
    }

    for (const key in response) {
      const e = response[key]
      if (e.yearAndMonth === query) {
        results.hits.push(e)
      }
    }

    const events = []
    for (let i = 0; i < results.hits.length; i++) {
      const obj = results.hits[i]

      if (type !== 'month' && Object.keys(obj.time).length > 0) {
        for (const time in obj.time) {
          const obj2 = obj.time[time]

          let date2 = `${obj.temporal} ${time}`

          const h = Number(time.split(':')[0])

          // 0時から4時までの場合
          if (h >= 0 && h < 4) {
            const today = new Date(date2)
            const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
            date2 = formatDate(tomorrow) + ' ' + time
          } else if (h >= 24) {
            const today = new Date(`${obj.temporal} 00:00:00`)
            const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
            const times = time.split(':')
            const newH = h - 24
            const newTime =
              ('00' + newH).slice(-2) + ':' + times[1] + ':' + times[2]
            date2 = formatDate(tomorrow) + ' ' + newTime
          }

          const event2 = {
            name: obj2.replace(/<[^>]*>?/gm, ''),
            start: date2,
            end: date2,
            color: getColor2(obj.type), // getColor(obj.label),
            id: obj.objectID,
            xml: obj2,
          }

          events.push(event2)
        }
      } else {
        const date = new Date(`${obj.temporal}T00:00:00`)
        const event = {
          name: obj.label,
          start: date,
          end: date,
          color: getColor2(obj.type), // getColor2(obj.label),
          id: obj.objectID,
          xml: obj.xml,
        }
        events.push(event)
      }
    }

    this.events = events
  },
  methods: {
    viewDay({ date }) {
      this.value = date
      this.type = 'day'
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange() {
      let type = this.type
      if (this.type === 'custom-daily') {
        type = 'year'
      }
      if (!this.initFlag) {
        this.mainFlag = false

        if (type === 'year') {
          this.$router.push(
            this.localePath({
              name: 'calendar',
            })
          )
        } else {
          const es = this.value.split('-')
          this.$router.replace(
            this.localePath({
              name: 'calendar-type-year-month-day',
              params: {
                type,
                year: es[0],
                month: Number(es[1]),
                day: Number(es[2]),
              },
            })
          )
        }
      }
      this.initFlag = false
    },
  },

  head() {
    const title = this.$t('calendar') + ' ' + this.title
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
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
}
</script>
