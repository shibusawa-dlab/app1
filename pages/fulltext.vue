<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="bh">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>
    <v-container class="py-5">
      <h2 class="my-5">{{ $t('fulltext') }}</h2>

      <p v-if="false">以下の形式でも閲覧できます。</p>
      <p>全文テキストデータを閲覧できます。</p>
      <p>研究の一環として様々な利用環境を想定し、実験的に作成したものを含みます。今後、予告なく変更する場合があることをご理解のうえご利用ください。</p>
      
      <p class="mt-10">提供形式</p>
      <p>
        <ul>
          <li>TEI Viewer（独自開発：画像との並列表示機能や人名・地名等へのハイライト表示機能を提供。動作が重たい点にご注意ください。）</li>
          <li>HTML（シンプルなテキスト表示）</li>
          <li>PDF（目次を含むテキスト表示）</li>
          <li>EPUB（目次や文字サイズの変更といった多様な機能を提供。EPUB用のリーダーをご用意の上お使いください。）</li>
        </ul>
      </p>

      <v-simple-table class="my-10">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                
              </th>
              <th class="text-center">
                TEI Viewer
              </th>
              <th class="text-center">
                HTML
              </th>
              <th class="text-center">
                PDF
              </th>
              <th class="text-center">
                EPUB
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, key) in ['DKB01', 'DKB02']"
              :key="key"
            >
              <td>{{ item }}</td>
              <td class="text-center pa-5">
                <nuxt-link :to="
                  localePath({
                    name: 'viewer-id',
                    params: { id: item },
                  })
                ">
                  <img width="40" :src="baseUrl + '/img/icons/tei.png'"/>
                </nuxt-link>
              </td>
              
              <td class="text-center pa-5">
                <a :href="
                  baseUrl + '/fulltext/' + item + '.html'
                ">
                  <img src="https://img.icons8.com/ios/26/000000/html-filetype.png"/>
                </a>
              </td>

              <td class="text-center pa-5">
                <a :href="
                  baseUrl + '/fulltext/' + item + '.pdf'
                ">
                  
                  <img src="https://img.icons8.com/ios/24/000000/pdf.png"/>
                </a>
              </td>

              <td class="text-center pa-5">
                <a :href="
                  baseUrl + '/fulltext/' + item + '.epub'
                ">
                  <img src="https://img.icons8.com/ios/26/000000/epub.png"/>
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <p class="mt-10">クレジット</p>
      <p>
        <ul>
          <li><a href="https://icons8.com/icon/4799/html-filetype">HTML Filetype icon by Icons8</a></li>
          <li><a href="https://icons8.com/icon/299/pdf">PDF icon by Icons8</a></li>
          <li><a href="https://icons8.com/icon/2949/epub">EPUB icon by Icons8</a></li>
        </ul>
      </p>

      <v-row v-if="false">
        <v-col
          v-for="(obj, index) in result.members"
          :key="index"
          cols="12"
          :sm="3"
        >
          <v-card flat outlined no-body class="mb-4">
            <nuxt-link
              :to="
                localePath({
                  name: 'viewer-id',
                  params: { id: obj.viewer_id },
                })
              "
            >
              <div
                class="text-center grey lighten-2 pa-10"
                style="height: 150px; text-decoration: none"
              >
                <v-icon size="75">mdi-text</v-icon>
              </div>
            </nuxt-link>

            <div class="pa-4">
              <nuxt-link
                :to="
                  localePath({
                    name: 'viewer-id',
                    params: { id: obj.viewer_id },
                  })
                "
              >
                <h4>{{ obj.label }}</h4>
              </nuxt-link>

              <p v-if="false" class="mt-2 mb-0">
                {{ obj.description }}
                <img :src="baseUrl + '/img/icons/tei.png'" width="30px" />
                本文をすべて表示（読み込みに時間がかかります。）
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="false">
        <v-col
          v-for="(obj, index) in result.members"
          :key="index"
          cols="12"
          :sm="3"
        >
          <v-card flat outlined no-body class="mb-4">
            <nuxt-link
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: obj.id },
                })
              "
            >
              <div
                class="text-center grey lighten-2 pa-10"
                style="height: 150px; text-decoration: none"
              >
                <v-icon size="75">mdi-text</v-icon>
              </div>
            </nuxt-link>

            <div class="pa-4">
              <nuxt-link
                :to="
                  localePath({
                    name: 'item-id',
                    params: { id: obj.id },
                  })
                "
              >
                <h4>{{ obj.label }}</h4>
              </nuxt-link>

              <p v-if="false" class="mt-2 mb-0">
                {{ obj.description }}
                <img :src="baseUrl + '/img/icons/tei.png'" width="30px" />
                本文をすべて表示（読み込みに時間がかかります。）
              </p>
            </div>
            <v-divider />
            <v-card-actions>
              <v-btn
                class="mr-2"
                text
                :to="
                  localePath({
                    name: 'viewer-id',
                    params: { id: obj.viewer_id },
                  })
                "
              >
                <img :src="baseUrl + '/img/icons/tei.png'" width="30px" />
              </v-btn>
              <small>本文をすべて表示（読み込みに時間がかかります。）</small>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class about extends Vue {
  baseUrl: any = process.env.BASE_URL

  get bh(): any[] {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
        exact: true,
      },
      {
        text: this.$t('fulltext'),
      },
    ]
  }

  result: any = {
    members: [
      {
        id: 'DKB10001m-1',
        viewer_id: 'DKB01',
        label: '渋沢栄一伝記資料. 別巻第1 日記 (慶応4年-大正3年)',
      },
      {
        id: 'DKB20001m-1',
        viewer_id: 'DKB02',
        label:
          '渋沢栄一伝記資料. 別巻第2 日記 (大正4年-昭和5年), 集会日時通知表',
      },
    ],
  }

  head() {
    const title = this.$t('fulltext')
    return {
      titleTemplate: null,
      title,
    }
  }
}
</script>
