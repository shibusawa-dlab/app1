<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5">
      <h1 class="mb-5">{{ $t('calendar') }}</h1>

      <ul>
        <li>
          『渋沢栄一伝記資料』別巻第1,
          第2の日付と時間情報を活用し,カレンダー形式で可視化しています。
        </li>
        <li>年齢は当該年の誕生日における渋沢栄一の満年齢を示します。</li>
      </ul>

      <v-card flat outlined class="my-10">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </v-card>

      <v-simple-table>
        <template #default>
          <tbody>
            <tr v-for="(obj, key) in years" :key="key">
              <th
                class="text-center"
                width="16%"
                style="border: 0.5px solid lightgrey"
                v-html="display(key)"
              ></th>
              <template v-for="value in 12">
                <td
                  :key="key + '-' + value"
                  class="text-center"
                  width="7%"
                  style="border: 0.5px solid lightgrey"
                  :style="
                    count(key, value) > 0 ? 'background-color: #FFF59D;' : ''
                  "
                >
                  <template v-if="count(key, value) > 0">
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'calendar-type-year-month-day',
                          params: {
                            type: 'month',
                            year: key,
                            month: value,
                            day: 1,
                          },
                        })
                      "
                    >
                      {{ getMonth(value) }}
                    </nuxt-link>
                    <br />
                    {{ count(key, value) }}
                  </template>
                  <template v-else> {{ getMonth(value) }} </template>
                </td>
              </template>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

export default {
  components: {
    GChart,
    Breadcrumbs,
  },
  async asyncData({ payload }) {
    if (payload) {
      return { item: payload }
    } else {
      const results_ = await import(`~/static/data/years.json`)
      const results = results_.default
      return { items: results }
    }
  },
  data: () => ({
    chartOptions: {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
    },
  }),
  computed: {
    title() {
      return this.$t('calendar')
    },
    years() {
      const years = {}
      const items = this.items
      let minYear = 2000
      let maxYear = 0
      for (const year in items) {
        if (year > maxYear) {
          maxYear = year
        }
        if (year < minYear) {
          minYear = year
        }
      }
      for (let i = minYear; i < maxYear; i++) {
        years[i] = {}
      }
      return years
    },
    chartData() {
      const years = [['Year', 'Appearances']]
      const items = this.items

      for (const year in this.years) {
        let freq = 0
        if (items[year]) {
          for (const month in items[year]) {
            freq += items[year][month]
          }
        }

        years.push([year + '', freq])
      }

      return years
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
          text: this.title,
        },
      ]
    },
  },
  methods: {
    // NUM=値 LEN=桁数
    zfill(NUM, LEN) {
      NUM = Number(NUM)
      return (Array(LEN).join('0') + NUM).slice(-LEN)
    },
    count(year, month) {
      const items = this.items
      year = Number(year)
      month = Number(month)
      if (!items[year]) {
        return 0
      }
      if (items[year][month]) {
        return items[year][month]
      } else {
        return 0
      }
    },
    transMonth(month) {
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
      return monthEnglishList[month - 1]
    },
    getMonth(month) {
      if (this.$i18n.locale === 'ja') {
        return month + '月'
      } else {
        return this.transMonth(month)
      }
    },
    display(text) {
      if (this.$i18n.locale === 'ja') {
        let wareki = this.$utils.wareki(text).replace('）', '（').split('（')[1]
        if (wareki === '慶応4') {
          wareki = '慶応4/明治元'
        } else if (wareki === '明治45') {
          wareki = '明治45/大正元'
        } else if (wareki === '大正15') {
          wareki = '大正15/昭和元'
        }
        return (
          text +
          '（' +
          wareki.split('/')[0] +
          '）年<br/>〔' +
          (text - 1840) +
          '歳〕'
        )
      } else {
        return text
      }
    },
  },
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
